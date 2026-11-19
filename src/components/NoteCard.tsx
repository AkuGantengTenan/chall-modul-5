import type { Note } from "../types/Note";

interface NoteCardProps {
  note: Note;
  onDeleteNote: (id: number) => void;
}

export default function NoteCard({ note, onDeleteNote }: NoteCardProps) {
  return (
    <div className="note-card">
      <div className="note-card-header">
        <span className="note-badge">{note.category}</span>
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDeleteNote(note.id)}
        >
          Hapus
        </button>
      </div>
      <h3 className="note-title">{note.title}</h3>
      {note.content && <p className="note-content">{note.content}</p>}
    </div>
  );
}
