

import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ loadingClass, notes: notes, onRemoveNote, onPinNote ,onDuplicateNote, onMarkNote}) {

    if (!notes.length) return <div>No notes To Show...</div>

    const attrs = {
        className: 'note-list container'
    }
    return (
        <div>
            <ul className='pinned note-layout' {...attrs}>
                {notes.map(note => (
                    note.isPinned && <NotePreview key={note.id} className={loadingClass}
                     note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} 
                     onDuplicateNote={onDuplicateNote} onMarkNote={onMarkNote}/>
                ))}
            </ul>
            <ul className='unpinned note-layout' {...attrs}>
                {notes.map(note => (
                    !note.isPinned && <NotePreview key={note.id} className={loadingClass}
                     note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} 
                     onDuplicateNote={onDuplicateNote} onMarkNote={onMarkNote}/>
                ))}
            </ul>
        </div>
    )
}