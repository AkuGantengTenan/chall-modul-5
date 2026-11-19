import { useState } from "react";
import "./App.css";
import { NOTE_CATEGORIES, type Note } from "./types/Note";
import { useLocalStorage } from "./hooks/useLocalStorage";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";

export default function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>("papan-catatan-notes", []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const handleAddNote = (newNoteData: Omit<Note, "id">) => {
    const newNote: Note = {
      id: Date.now(),
      ...newNoteData,
    };
    setNotes([newNote, ...notes]);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = notes.filter((note) => {
    const matchTitle = note.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategory === "Semua" || note.category === selectedCategory;
    return matchTitle && matchCategory;
  });

  return (
    <div className="container">
      <header className="header">
        <h1>Papan Catatan Lokal</h1>
        <p>Kelola catatan harian dengan penyimpanan otomatis di browser.</p>
      </header>

      <section className="section-box">
        <h2>Buat Catatan Baru</h2>
        <NoteForm onAddNote={handleAddNote} />
      </section>

      <section className="section-box">
        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari catatan berdasarkan judul..."
          />
          <div className="category-tabs">
            {["Semua", ...NOTE_CATEGORIES].map((cat) => (
              <button
                key={cat}
                type="button"
                className={
                  selectedCategory === cat ? "tab-btn active" : "tab-btn"
                }
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="note-counter">
          Menampilkan {filteredNotes.length} dari {notes.length} catatan
        </p>

        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            {notes.length === 0
              ? "Belum ada catatan yang tersimpan. Silakan tambah catatan baru."
              : "Tidak ada catatan yang cocok dengan pencarian."}
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDeleteNote={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
