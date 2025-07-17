const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const Document = require('../models/Document');
const fs = require('fs');
const path = require('path');

router.post('/', auth, upload.single('file'), async (req, res) => {
  const doc = await Document.create({
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    user: req.user._id,
  });
  res.status(201).json(doc);
});

router.get('/', auth, async (req, res) => {
  const docs = await Document.find({ user: req.user._id });
  res.json(docs);
});

router.get('/:id', auth, async (req, res) => {
  const doc = await Document.findOne({ _id: req.params.id, user: req.user._id });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  const filePath = path.join(__dirname, '../uploads', doc.filename);
  res.download(filePath, doc.originalName);
});

router.put('/:id', auth, upload.single('file'), async (req, res) => {
  const doc = await Document.findOne({ _id: req.params.id, user: req.user._id });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  fs.unlinkSync(path.join(__dirname, '../uploads', doc.filename));
  doc.filename = req.file.filename;
  doc.originalName = req.file.originalname;
  doc.mimetype = req.file.mimetype;
  await doc.save();
  res.json(doc);
});

router.delete('/:id', auth, async (req, res) => {
  const doc = await Document.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  fs.unlinkSync(path.join(__dirname, '../uploads', doc.filename));
  res.json({ message: 'Deleted' });
});

module.exports = router;