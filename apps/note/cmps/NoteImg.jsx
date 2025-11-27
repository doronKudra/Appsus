
export function NoteImg({note}) {
    const {info} = note
    const {imgSrc,title,txt} = info
    return (
        <div className="note-content">
            <img src={imgSrc}></img>
            {title && <p className="note-title">{title}</p>}
            {txt && <p className="note-txt">{txt}</p>}
        </div>
    )
}
