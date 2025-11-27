

export function MailFolderList({ onCompose, setFolderName }) {

    function onFolder(name) {
        setFolderName(prevName=> prevName = name)
    }

    return (
        <section className="mail-folder-list">
            <button onClick={onCompose}>Compose</button>
            <button onClick={()=>onFolder('inbox')}>Inbox</button>
            <button onClick={()=>onFolder('starred')}>Starred</button>
            <button onClick={()=>onFolder('sent')}>Sent</button>
            <button onClick={()=>onFolder('drafts')}>Drafts</button>
            <button onClick={()=>onFolder('trash')}>Trash</button>
        </section>
    )

}