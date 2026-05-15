import express from 'express'
import pool from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Create link
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { label, url, icon, customFont, customColor } = req.body

    if (!label || !url) {
      return res.status(400).json({ error: 'Label and URL are required' })
    }

    // Get max position
    const posResult = await pool.query(
      'SELECT COALESCE(MAX(position), -1) + 1 as next_pos FROM links WHERE profile_id = $1',
      [req.user.profileId]
    )
    const position = posResult.rows[0].next_pos

    const result = await pool.query(
      `INSERT INTO links (profile_id, label, url, icon, custom_font, custom_color, position)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [req.user.profileId, label, url, icon, customFont, customColor, position]
    )

    res.status(201).json({ message: 'Link created', link: result.rows[0] })
  } catch (error) {
    console.error('Create link error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update link
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { label, url, icon, customFont, customColor, isActive } = req.body

    const result = await pool.query(
      `UPDATE links SET
        label = COALESCE($1, label),
        url = COALESCE($2, url),
        icon = COALESCE($3, icon),
        custom_font = COALESCE($4, custom_font),
        custom_color = COALESCE($5, custom_color),
        is_active = COALESCE($6, is_active)
      WHERE id = $7 AND profile_id = $8
      RETURNING *`,
      [label, url, icon, customFont, customColor, isActive, id, req.user.profileId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' })
    }

    res.json({ message: 'Link updated', link: result.rows[0] })
  } catch (error) {
    console.error('Update link error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete link
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM links WHERE id = $1 AND profile_id = $2 RETURNING id',
      [id, req.user.profileId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' })
    }

    res.json({ message: 'Link deleted' })
  } catch (error) {
    console.error('Delete link error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Reorder links
router.put('/reorder', authenticateToken, async (req, res) => {
  try {
    const { linkIds } = req.body // Array of link IDs in new order

    if (!Array.isArray(linkIds)) {
      return res.status(400).json({ error: 'linkIds must be an array' })
    }

    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      for (let i = 0; i < linkIds.length; i++) {
        await client.query(
          'UPDATE links SET position = $1 WHERE id = $2 AND profile_id = $3',
          [i, linkIds[i], req.user.profileId]
        )
      }

      await client.query('COMMIT')
      res.json({ message: 'Links reordered' })
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Reorder links error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Track link click
router.post('/:id/click', async (req, res) => {
  try {
    const { id } = req.params

    // Get link and profile_id
    const linkResult = await pool.query('SELECT profile_id FROM links WHERE id = $1', [id])
    if (linkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' })
    }

    const profileId = linkResult.rows[0].profile_id

    // Track click
    await pool.query(
      'INSERT INTO analytics (profile_id, link_id, event_type, ip_address, user_agent, referrer) VALUES ($1, $2, $3, $4, $5, $6)',
      [profileId, id, 'link_click', req.ip, req.get('user-agent'), req.get('referer')]
    )

    // Increment counters
    await pool.query('UPDATE links SET click_count = click_count + 1 WHERE id = $1', [id])
    await pool.query('UPDATE profiles SET click_count = click_count + 1 WHERE id = $1', [profileId])

    res.json({ message: 'Click tracked' })
  } catch (error) {
    console.error('Track click error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
