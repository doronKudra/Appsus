
export function NoteImg({note}) {
    console.log(note)
    const {info} = note
    const {title,txt} = info
    return (
        <div className="note-content">
            {/* <img src={imgSrc}></img> */}
            {title && <p className="note-title">{title}</p>}
            {txt && <p className="note-txt">{txt}</p>}
        </div>
    )
}
