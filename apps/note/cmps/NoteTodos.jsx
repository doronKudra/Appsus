
export function NoteTodos({ note }) {
    const { info } = note
    const { title, items } = info
    return (
        <div className="note-content">
            <p className="note-title">{title}</p>
            <ul className="note-todos-container">
                {items.map((item,idx) => (
                    <li className="note-todos">
                        <input type="checkbox" name={"task "+idx} value={"task "+idx} />
                        <label for={"[name=task "+idx+"]"}>{item}</label>
                    </li>
                ))}
            </ul>
        </div>
    )
}
