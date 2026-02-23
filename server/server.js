require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directories exist
const uploadsDir = path.join(__dirname, 'uploads', 'logos');
const skillLogosDir = path.join(__dirname, 'uploads', 'skill-logos');
const certImagesDir = path.join(__dirname, 'uploads', 'cert-images');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(skillLogosDir)) {
  fs.mkdirSync(skillLogosDir, { recursive: true });
}
if (!fs.existsSync(certImagesDir)) {
  fs.mkdirSync(certImagesDir, { recursive: true });
}

// Multer config for general logos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `logo-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Multer config for skill logos
const skillLogoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, skillLogosDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `skill-${Date.now()}${ext}`);
  },
});
const skillLogoUpload = multer({ storage: skillLogoStorage, limits: { fileSize: 5 * 1024 * 1024 } });

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

// File upload endpoint (general logos)
app.post('/api/upload', authMiddleware, upload.single('logo'), (req, res) => {
  if (!req.file) {
      console.error('Upload failed: No file received');
      return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/logos/${req.file.filename}`;
  console.log('File uploaded:', fileUrl);
  res.json({ url: `http://localhost:${PORT}${fileUrl}` });
});

// Skill logo upload endpoint
app.post('/api/upload-skill-logo', authMiddleware, skillLogoUpload.single('logo'), (req, res) => {
  if (!req.file) {
      console.error('Skill logo upload failed: No file received');
      return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/skill-logos/${req.file.filename}`;
  console.log('Skill logo uploaded:', fileUrl);
  res.json({ url: `http://localhost:${PORT}${fileUrl}` });
});

// Multer config for certification images
const certImageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, certImagesDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `cert-${Date.now()}-${Math.round(Math.random() * 1000)}${ext}`);
  },
});
const certImageUpload = multer({ storage: certImageStorage, limits: { fileSize: 5 * 1024 * 1024 } });

// Certification images upload endpoint (multiple files)
app.post('/api/upload-cert-images', authMiddleware, certImageUpload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
  }
  const urls = req.files.map(f => `http://localhost:${PORT}/uploads/cert-images/${f.filename}`);
  console.log('Cert images uploaded:', urls);
  res.json({ urls });
});

app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
