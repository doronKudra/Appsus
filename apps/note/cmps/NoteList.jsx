

import { NotePreview } from "./NotePreview.jsx";

export function NoteList({ loadingClass, notes: notes, onRemoveNote, onPinNote ,onDuplicateNote, onMarkNote}) {

    if (!notes.length) return <div>No notes To Show...</div>
    const pinnedNotes = (notes.filter((note) => note.isPinned).length)
    const isShowPinned = !!pinnedNotes
    const isShowUnpinned = (notes.length === pinnedNotes) ? false : true
    console.log(pinnedNotes)

    return (
        <div>
            {isShowPinned && (<p className='pinned-notes-label'>Pinned</p>)}
            <ul className='pinned note-list'>
                {notes.map(note => (
                    note.isPinned && <NotePreview key={note.id} className={loadingClass}
                     note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} 
                     onDuplicateNote={onDuplicateNote} onMarkNote={onMarkNote}/>
                ))}
            </ul>
            {isShowUnpinned && isShowPinned && (<p className='pinned-notes-label'>Other</p>)}
            <ul className='unpinned note-list'>
                {notes.map(note => (
                    !note.isPinned && <NotePreview key={note.id} className={loadingClass}
                     note={note} onRemoveNote={onRemoveNote} onPinNote={onPinNote} 
                     onDuplicateNote={onDuplicateNote} onMarkNote={onMarkNote}/>
                ))}
            </ul>
        </div>
    )
}