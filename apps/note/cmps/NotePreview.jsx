
import { NoteTxt } from './NoteTxt.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'

export function NotePreview({ note, onRemoveNote, onPinNote, onDuplicateNote }) {
    return (
        <div className="note-preview">
            <DynamicCmp note={note} />
            <div className="note-actions-bar">
                <div onClick={() => onRemoveNote(note.id)} className="icon-notes fa-solid fa-trash"></div>
                {note.isPinned && (<div onClick={() => onPinNote(note)} className={"icon-notes fa-solid fa-thumbtack-slash"}></div>)}
                {!note.isPinned && (<div onClick={() => onPinNote(note)} className={"icon-notes fa-solid fa-thumbtack"}></div>)}
                <div onClick={() => onDuplicateNote(note)} className="icon-notes fa-solid fa-copy"></div>
            </div>
        </div>
    )
}

function DynamicCmp(props) {
    const { note } = props
    switch (note.type) {
        case 'NoteTxt':
            return (<NoteTxt note={note} />)
        case 'NoteImg':
            return (<NoteImg note={note} />)
        case 'NoteTodos':
            return (<NoteTodos note={note} />)
    }
}