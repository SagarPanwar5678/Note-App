const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const verifyToken = require("../middleware/auth"); // middleware to check JWT


// ---------------- GET ALL NOTES FOR LOGGED-IN USER ----------------
router.get("/fetch", verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// ---------------- CREATE NOTE ----------------
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const note = new Note({
      title,
      content,
      user: req.user.id // from JWT middleware
    });

    await note.save();
    res.json({ message: "Note created successfully", note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- DELETE NOTE ----------------
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const noteId = req.params.id;

    const note = await Note.findOne({ _id: noteId, user: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });

    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
