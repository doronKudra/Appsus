const { Link } = ReactRouterDOM

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
                <li className={loadingClass} key={note.id}>
                    <NotePreview note={note} />
                    <section>
                        <button onClick={() => onRemoveNote(note.id)}>
                            Remove
                        </button>
                        <button >
                            <Link to={`/note/${note.id}`}>Details</Link>
                        </button>
                        <button >
                            <Link to={`/note/edit/${note.id}`}>Edit</Link>
                        </button>
                    </section>
                </li>
            ))}
        </ul>
    )

}