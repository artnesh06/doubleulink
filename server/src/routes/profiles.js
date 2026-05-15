import express from 'express'
import pool from '../config/database.js'
import { authenticateToken, optionalAuth } from '../middleware/auth.js'

const router = express.Router()

// Get public profile by username
router.get('/:username', optionalAuth, async (req, res) => {
  try {
    const { username } = req.params

    // Get profile
    const profileResult = await pool.query(
      `SELECT p.*, u.email 
       FROM profiles p 
       JOIN users u ON p.user_id = u.id 
       WHERE p.username = $1`,
      [username.toLowerCase()]
    )

    if (profileResult.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    const profile = profileResult.rows[0]

    // Get links
    const linksResult = await pool.query(
      'SELECT id, label, url, icon, custom_font, custom_color, click_count FROM links WHERE profile_id = $1 AND is_active = true ORDER BY position ASC',
      [profile.id]
    )

    // Get shop items
    const shopResult = await pool.query(
      'SELECT id, name, price, badge, url, image_url, bg_color, fg_color, click_count FROM shop_items WHERE profile_id = $1 AND is_active = true ORDER BY position ASC',
      [profile.id]
    )

    // Track view (only if not the owner)
    const isOwner = req.user && req.user.profileId === profile.id
    if (!isOwner) {
      await pool.query(
        'INSERT INTO analytics (profile_id, event_type, ip_address, user_agent, referrer) VALUES ($1, $2, $3, $4, $5)',
        [profile.id, 'view', req.ip, req.get('user-agent'), req.get('referer')]
      )
      await pool.query('UPDATE profiles SET view_count = view_count + 1 WHERE id = $1', [profile.id])
    }

    // Remove sensitive data
    delete profile.user_id
    if (!isOwner) {
      delete profile.email
    }

    res.json({
      profile,
      links: linksResult.rows,
      shopItems: shopResult.rows,
      isOwner,
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get own profile (authenticated)
router.get('/me/profile', authenticateToken, async (req, res) => {
  try {
    const profileResult = await pool.query('SELECT * FROM profiles WHERE id = $1', [req.user.profileId])
    
    if (profileResult.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    const profile = profileResult.rows[0]

    // Get links
    const linksResult = await pool.query(
      'SELECT * FROM links WHERE profile_id = $1 ORDER BY position ASC',
      [profile.id]
    )

    // Get shop items
    const shopResult = await pool.query(
      'SELECT * FROM shop_items WHERE profile_id = $1 ORDER BY position ASC',
      [profile.id]
    )

    res.json({
      profile,
      links: linksResult.rows,
      shopItems: shopResult.rows,
    })
  } catch (error) {
    console.error('Get own profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update profile
router.put('/me/profile', authenticateToken, async (req, res) => {
  try {
    const {
      displayName,
      bio,
      avatarUrl,
      instagramUrl,
      twitterUrl,
      pinterestUrl,
      themeId,
      wallpaperStyle,
      wallpaperColor,
      wallpaperAnimation,
      cardBgStyle,
      cardBgColor,
      cardBgGradient,
      spacingMode,
      spacingValue,
      spacingTop,
      spacingBottom,
      spacingLeft,
      spacingRight,
      globalFont,
      globalColor,
      titleSize,
      cornerRadius,
    } = req.body

    const result = await pool.query(
      `UPDATE profiles SET
        display_name = COALESCE($1, display_name),
        bio = COALESCE($2, bio),
        avatar_url = COALESCE($3, avatar_url),
        instagram_url = COALESCE($4, instagram_url),
        twitter_url = COALESCE($5, twitter_url),
        pinterest_url = COALESCE($6, pinterest_url),
        theme_id = COALESCE($7, theme_id),
        wallpaper_style = COALESCE($8, wallpaper_style),
        wallpaper_color = COALESCE($9, wallpaper_color),
        wallpaper_animation = COALESCE($10, wallpaper_animation),
        card_bg_style = COALESCE($11, card_bg_style),
        card_bg_color = COALESCE($12, card_bg_color),
        card_bg_gradient = COALESCE($13, card_bg_gradient),
        spacing_mode = COALESCE($14, spacing_mode),
        spacing_value = COALESCE($15, spacing_value),
        spacing_top = COALESCE($16, spacing_top),
        spacing_bottom = COALESCE($17, spacing_bottom),
        spacing_left = COALESCE($18, spacing_left),
        spacing_right = COALESCE($19, spacing_right),
        global_font = COALESCE($20, global_font),
        global_color = COALESCE($21, global_color),
        title_size = COALESCE($22, title_size),
        corner_radius = COALESCE($23, corner_radius)
      WHERE id = $24
      RETURNING *`,
      [
        displayName, bio, avatarUrl, instagramUrl, twitterUrl, pinterestUrl,
        themeId, wallpaperStyle, wallpaperColor, wallpaperAnimation,
        cardBgStyle, cardBgColor, cardBgGradient,
        spacingMode, spacingValue, spacingTop, spacingBottom, spacingLeft, spacingRight,
        globalFont, globalColor, titleSize, cornerRadius,
        req.user.profileId,
      ]
    )

    res.json({ message: 'Profile updated', profile: result.rows[0] })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
