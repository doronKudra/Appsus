
import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'

export function NotePreview({ note , onRemoveNote , onPinNote , onDuplicateNote}) {
    return (
        <div className="note-preview">
            <DynamicCmp note={note} />
            <button onClick={() => onRemoveNote(note.id)}>
                Remove
            </button>
            <button onClick={() => onPinNote(note)}>
                {note.isPinned && 'Unpin'}
                {!note.isPinned && 'Pin'}
            </button>
            <button onClick={() => onDuplicateNote(note)}>
                Duplicate
            </button>
        </div>
    )
}

function DynamicCmp({ note }) {
    switch (note.type) {
        case 'NoteTxt':
            return (<NoteTxt note={note} />)
        case 'NoteImg':
            return (<NoteImg note={note}/>)
    }
}