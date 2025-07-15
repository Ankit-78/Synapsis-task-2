import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch("http://localhost:5000/api/notes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNotes(data);
  };

  const addNote = async () => {
    await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
  const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    setNotes(prev => prev.filter(note => note._id !== id));
  } else {
    console.error("Delete failed:", res.status);
  }
};


  return (
    <div className="notes-container">
      <h2>Your Notes</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={addNote}>Add Note</button>
      {notes.map(n => (
        <div key={n._id} className="note-card">
          <h3>{n.title}</h3>
          <p>{n.content}</p>
          <button onClick={() => deleteNote(n._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
