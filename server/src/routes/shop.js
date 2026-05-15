import express from 'express'
import pool from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Create shop item
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, price, badge, url, imageUrl, bgColor, fgColor } = req.body

    if (!name || !price || !url) {
      return res.status(400).json({ error: 'Name, price, and URL are required' })
    }

    // Get max position
    const posResult = await pool.query(
      'SELECT COALESCE(MAX(position), -1) + 1 as next_pos FROM shop_items WHERE profile_id = $1',
      [req.user.profileId]
    )
    const position = posResult.rows[0].next_pos

    const result = await pool.query(
      `INSERT INTO shop_items (profile_id, name, price, badge, url, image_url, bg_color, fg_color, position)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [req.user.profileId, name, price, badge, url, imageUrl, bgColor, fgColor, position]
    )

    res.status(201).json({ message: 'Shop item created', item: result.rows[0] })
  } catch (error) {
    console.error('Create shop item error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update shop item
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { name, price, badge, url, imageUrl, bgColor, fgColor, isActive } = req.body

    const result = await pool.query(
      `UPDATE shop_items SET
        name = COALESCE($1, name),
        price = COALESCE($2, price),
        badge = COALESCE($3, badge),
        url = COALESCE($4, url),
        image_url = COALESCE($5, image_url),
        bg_color = COALESCE($6, bg_color),
        fg_color = COALESCE($7, fg_color),
        is_active = COALESCE($8, is_active)
      WHERE id = $9 AND profile_id = $10
      RETURNING *`,
      [name, price, badge, url, imageUrl, bgColor, fgColor, isActive, id, req.user.profileId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shop item not found' })
    }

    res.json({ message: 'Shop item updated', item: result.rows[0] })
  } catch (error) {
    console.error('Update shop item error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete shop item
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'DELETE FROM shop_items WHERE id = $1 AND profile_id = $2 RETURNING id',
      [id, req.user.profileId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shop item not found' })
    }

    res.json({ message: 'Shop item deleted' })
  } catch (error) {
    console.error('Delete shop item error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Reorder shop items
router.put('/reorder', authenticateToken, async (req, res) => {
  try {
    const { itemIds } = req.body

    if (!Array.isArray(itemIds)) {
      return res.status(400).json({ error: 'itemIds must be an array' })
    }

    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      for (let i = 0; i < itemIds.length; i++) {
        await client.query(
          'UPDATE shop_items SET position = $1 WHERE id = $2 AND profile_id = $3',
          [i, itemIds[i], req.user.profileId]
        )
      }

      await client.query('COMMIT')
      res.json({ message: 'Shop items reordered' })
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Reorder shop items error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Track shop item click
router.post('/:id/click', async (req, res) => {
  try {
    const { id } = req.params

    const itemResult = await pool.query('SELECT profile_id FROM shop_items WHERE id = $1', [id])
    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Shop item not found' })
    }

    const profileId = itemResult.rows[0].profile_id

    await pool.query(
      'INSERT INTO analytics (profile_id, shop_item_id, event_type, ip_address, user_agent, referrer) VALUES ($1, $2, $3, $4, $5, $6)',
      [profileId, id, 'shop_click', req.ip, req.get('user-agent'), req.get('referer')]
    )

    await pool.query('UPDATE shop_items SET click_count = click_count + 1 WHERE id = $1', [id])
    await pool.query('UPDATE profiles SET click_count = click_count + 1 WHERE id = $1', [profileId])

    res.json({ message: 'Click tracked' })
  } catch (error) {
    console.error('Track click error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
