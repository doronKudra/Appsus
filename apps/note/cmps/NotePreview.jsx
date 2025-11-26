
export function NotePreview({ note }) {

    const { type, isPinned, info, style, createdAt } = note
    const date = new Date(createdAt)
    if (type === 'NoteTxt') {
        return (
            <article className="note-preview">
                <p className="note-title">{info.title}</p>
                <p className="note-txt">{info.txt}</p>
            </article>
        )
    }
}