
const { useState } = React

export function MailFolderList({ onCompose, setFolderName, unreadCount }) {

    const [clkdFldr, setClickedFolder] = useState('inbox')

    function onFolder(name) {
        setClickedFolder(prevFolder => prevFolder = name)
        setFolderName(prevName => prevName = name)
    }

    return (
        <section className="mail-folder-list">
            <button className="compose" onClick={onCompose}><i className="fa-solid fa-pencil"></i></button>
            <nav className="folder-nav">
                <div onClick={() => onFolder('inbox')} className={`btn-container ${clkdFldr === 'inbox' ? 'inbox selected-folder' : 'inbox'}`}>
                    <button><i className="fa-solid fa-inbox"></i></button>
                    <span className="folder-txt">Inbox </span><span className="folder-txt unread-nav">{unreadCount}</span>
                </div>
                <div onClick={() => onFolder('starred')} className={`btn-container ${clkdFldr === 'starred' ? 'starred selected-folder' : 'starred'}`}>
                    <button><i className="fa-regular fa-star"></i></button>
                    <div className="folder-txt">Starred</div>
                </div>
                <div onClick={() => onFolder('sent')} className={`btn-container ${clkdFldr === 'sent' ? 'sent selected-folder' : 'sent'}`}>
                    <button><i className="fa-regular fa-paper-plane"></i></button>
                    <div className="folder-txt">Sent</div>
                </div >
                <div onClick={() => onFolder('drafts')} className={`btn-container ${clkdFldr === 'drafts' ? 'drafts selected-folder' : 'drafts'}`}>
                    <button><i className="fa-regular fa-file"></i></button>
                    <div className="folder-txt">Drafts</div>
                </div>
                <div onClick={() => onFolder('trash')} className={`btn-container ${clkdFldr === 'trash' ? 'trash selected-folder' : 'trash'}`}>
                    <button><i className="fa-regular fa-trash-can"></i></button>
                    <div className="folder-txt">Trash</div>
                </div>
            </nav>
        </section>
    )

}