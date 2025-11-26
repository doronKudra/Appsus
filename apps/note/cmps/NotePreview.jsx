
export function NotePreview({ note }) {

    const { type,isPinned,info,style,createdAt } = note
    return (
        <article className="car-preview">
            <h2>type: {type}</h2>
            <h4>isPinned: {isPinned}</h4>
            <span>Created At: {createdAt}</span>
        </article>
    )
}