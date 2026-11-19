import { useState } from "react";
import { NOTE_CATEGORIES, type Note } from "../types/Note";

interface NoteFormProps {
  onAddNote: (newNote: Omit<Note, "id">) => void;
}

export default function NoteForm({ onAddNote }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(NOTE_CATEGORIES[0]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddNote({
      title: title.trim(),
      content: content.trim(),
      category,
    });

    setTitle("");
    setContent("");
    setCategory(NOTE_CATEGORIES[0]);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="title">Judul Catatan</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul catatan..."
            required
          />
        </div>
        <div className="form-field category-field">
          <label htmlFor="category">Kategori</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {NOTE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="content">Isi Catatan</label>
        <textarea
          id="content"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis detail catatan di sini..."
        />
      </div>

      <button type="submit" className="btn-add">
        Tambah Catatan
      </button>
    </form>
  );
}
