import express from 'express'
import pool from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get analytics summary
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const { days = 30 } = req.query

    // Total views
    const viewsResult = await pool.query(
      `SELECT COUNT(*) as total_views
       FROM analytics
       WHERE profile_id = $1 AND event_type = 'view'
       AND created_at >= NOW() - INTERVAL '${parseInt(days)} days'`,
      [req.user.profileId]
    )

    // Total clicks
    const clicksResult = await pool.query(
      `SELECT COUNT(*) as total_clicks
       FROM analytics
       WHERE profile_id = $1 AND event_type IN ('link_click', 'shop_click')
       AND created_at >= NOW() - INTERVAL '${parseInt(days)} days'`,
      [req.user.profileId]
    )

    // Click-through rate
    const totalViews = parseInt(viewsResult.rows[0].total_views)
    const totalClicks = parseInt(clicksResult.rows[0].total_clicks)
    const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : 0

    // Top links
    const topLinksResult = await pool.query(
      `SELECT l.id, l.label, l.url, COUNT(a.id) as clicks
       FROM links l
       LEFT JOIN analytics a ON a.link_id = l.id AND a.created_at >= NOW() - INTERVAL '${parseInt(days)} days'
       WHERE l.profile_id = $1
       GROUP BY l.id, l.label, l.url
       ORDER BY clicks DESC
       LIMIT 5`,
      [req.user.profileId]
    )

    // Daily views (last 7 days)
    const dailyViewsResult = await pool.query(
      `SELECT DATE(created_at) as date, COUNT(*) as views
       FROM analytics
       WHERE profile_id = $1 AND event_type = 'view'
       AND created_at >= NOW() - INTERVAL '7 days'
       GROUP BY DATE(created_at)
       ORDER BY date DESC`,
      [req.user.profileId]
    )

    res.json({
      summary: {
        totalViews,
        totalClicks,
        clickThroughRate: parseFloat(ctr),
      },
      topLinks: topLinksResult.rows,
      dailyViews: dailyViewsResult.rows,
    })
  } catch (error) {
    console.error('Get analytics error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get detailed analytics
router.get('/detailed', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate, limit = 100 } = req.query

    let query = `
      SELECT 
        a.id,
        a.event_type,
        a.created_at,
        a.referrer,
        l.label as link_label,
        s.name as shop_item_name
      FROM analytics a
      LEFT JOIN links l ON a.link_id = l.id
      LEFT JOIN shop_items s ON a.shop_item_id = s.id
      WHERE a.profile_id = $1
    `

    const params = [req.user.profileId]

    if (startDate) {
      params.push(startDate)
      query += ` AND a.created_at >= $${params.length}`
    }

    if (endDate) {
      params.push(endDate)
      query += ` AND a.created_at <= $${params.length}`
    }

    query += ` ORDER BY a.created_at DESC LIMIT $${params.length + 1}`
    params.push(parseInt(limit))

    const result = await pool.query(query, params)

    res.json({ analytics: result.rows })
  } catch (error) {
    console.error('Get detailed analytics error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
