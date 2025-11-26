

import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ loadingClass, notes: notes, onRemoveNote }) {

    if (!notes.length) return <div>No notes To Show...</div>

    const attrs = {
        title: 'Hello List',
        className: 'note-list container'
    }
    return (
        <ul {...attrs}>
            {notes.map(note => (
                <div className={loadingClass} key={note.id}>
                    <section className="note-layout">
                        <NotePreview note={note} />
                        <button onClick={() => onRemoveNote(note.id)}>
                            Remove
                        </button>
                    </section>
                </div>
            ))}
        </ul>
    )
}