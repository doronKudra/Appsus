
import {NoteTxt} from './NoteTxt.jsx'

export function NotePreview({ note }) {

    const { type, isPinned, info, style, createdAt } = note
    
    if (type === 'NoteTxt') {
        return (<NoteTxt note={note} />)
    }
    return
}