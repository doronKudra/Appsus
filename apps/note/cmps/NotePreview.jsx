
import {NoteTxt} from './NoteTxt.jsx'

export function NotePreview({ note }) {
    return (<DynamicCmp note={note} />)
}

function DynamicCmp({note}) {
    switch (note.type) {
        case 'NoteTxt':
            return (<NoteTxt note={note} />)
    }
}