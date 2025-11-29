
export function NoteVideo({note}) {
    const {info} = note
    const {title,txt,videoLink} = info

    return (
        <div style={{ paddingBottom: '16px' }} className="note-content">
            <p className="note-title">{title}</p>
            <p className="note-txt">{txt}</p>
            <iframe src={videoLink} width="240" height="135" frameBorder="0"></iframe>
        </div>
    )
}
