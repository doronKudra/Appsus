
export function NoteTxt({note}) {
    const {info} = note
    const {title,txt} = info
    return (
        <div className="note-preview">
            <p className="note-title">{title}</p>
            <p className="note-txt">{txt}</p>
        </div>
    )
}
