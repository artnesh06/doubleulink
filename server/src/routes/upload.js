import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import { authenticateToken } from '../middleware/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'))
    }
  },
})

// Upload avatar
router.post('/avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../../uploads/avatars')
    await fs.mkdir(uploadDir, { recursive: true })

    const filename = `avatar-${req.user.userId}-${Date.now()}.webp`
    const filepath = path.join(uploadDir, filename)

    // Resize and optimize image
    await sharp(req.file.buffer)
      .resize(400, 400, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(filepath)

    // Return URL (adjust based on your domain)
    const url = `/uploads/avatars/${filename}`

    res.json({
      message: 'Avatar uploaded successfully',
      url,
    })
  } catch (error) {
    console.error('Upload avatar error:', error)
    res.status(500).json({ error: 'Failed to upload avatar' })
  }
})

// Upload shop item image
router.post('/shop-image', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../../uploads/shop')
    await fs.mkdir(uploadDir, { recursive: true })

    const filename = `shop-${req.user.userId}-${Date.now()}.webp`
    const filepath = path.join(uploadDir, filename)

    // Resize and optimize image
    await sharp(req.file.buffer)
      .resize(800, 800, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(filepath)

    const url = `/uploads/shop/${filename}`

    res.json({
      message: 'Image uploaded successfully',
      url,
    })
  } catch (error) {
    console.error('Upload shop image error:', error)
    res.status(500).json({ error: 'Failed to upload image' })
  }
})

export default router
