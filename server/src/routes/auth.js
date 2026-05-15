import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import pool from '../config/database.js'

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body

    // Validation
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, password, and username are required' })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' })
    }

    if (!/^[a-zA-Z0-9_-]{3,50}$/.test(username)) {
      return res.status(400).json({ error: 'Username must be 3-50 characters (letters, numbers, _, -)' })
    }

    // Check if email exists
    const emailCheck = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()])
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' })
    }

    // Check if username exists
    const usernameCheck = await pool.query('SELECT id FROM profiles WHERE username = $1', [username.toLowerCase()])
    if (usernameCheck.rows.length > 0) {
      return res.status(409).json({ error: 'Username already taken' })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const userResult = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
      [email.toLowerCase(), passwordHash]
    )
    const user = userResult.rows[0]

    // Create profile
    const profileResult = await pool.query(
      'INSERT INTO profiles (user_id, username, display_name) VALUES ($1, $2, $3) RETURNING id, username, display_name',
      [user.id, username.toLowerCase(), username]
    )
    const profile = profileResult.rows[0]

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, profileId: profile.id, username: profile.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        profile: {
          id: profile.id,
          username: profile.username,
          displayName: profile.display_name,
        },
      },
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Find user
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()])
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const user = userResult.rows[0]

    // Check password
    const validPassword = await bcrypt.compare(password, user.password_hash)
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Get profile
    const profileResult = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [user.id])
    const profile = profileResult.rows[0]

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, profileId: profile.id, username: profile.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        profile: {
          id: profile.id,
          username: profile.username,
          displayName: profile.display_name,
        },
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Check username availability
router.get('/check-username/:username', async (req, res) => {
  try {
    const { username } = req.params

    if (!/^[a-zA-Z0-9_-]{3,50}$/.test(username)) {
      return res.json({ available: false, error: 'Invalid username format' })
    }

    const result = await pool.query('SELECT id FROM profiles WHERE username = $1', [username.toLowerCase()])
    res.json({ available: result.rows.length === 0 })
  } catch (error) {
    console.error('Check username error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
