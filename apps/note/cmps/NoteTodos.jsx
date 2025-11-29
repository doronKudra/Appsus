
export function NoteTodos({ note ,  onMarkNote}) {
    const { info } = note
    const { title, items } = info
    return (
        <div className="note-content">
            <p className="note-title">{title}</p>
            <ul className="note-todos-container">
                {items.map((item,idx) => (
                    <li className="note-todos" key={"task-"+idx}>
                        <input onChange={() => onMarkNote(note,idx)} type="checkbox" name={"task-"+idx} value={"task-"+idx} checked={item.isMarked} />
                        <label htmlFor={"[name=task-"+idx+"]"}>{item.txt}</label>
                    </li>
                ))}
            </ul>
        </div>
    )
}
