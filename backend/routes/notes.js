const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({ user: req.user.id, title, content });
    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    let note = await Note.findById(req.params.id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Note not found' });
    }
    note.title = title;
    note.content = content;
    note.updatedAt = Date.now();
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ msg: "Note not found" });
    }

    res.json({ msg: "Note removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


module.exports = router;
