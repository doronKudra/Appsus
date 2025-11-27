
import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'

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

function DynamicCmp(props) {
    const {note} = props
    switch (note.type) {
        case 'NoteTxt':
            return (<NoteTxt note={note} />)
        case 'NoteImg':
            return (<NoteImg note={note}/>)
        case 'NoteTodos':
            return (<NoteTodos note={note}/>)
    }
}