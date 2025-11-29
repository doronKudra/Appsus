import { MailPreview } from "./MailPreview.jsx"

// const { Link } = ReactRouterDOM
const { useEffect, useState } = React


export function MailList({ mails ,onRead, onDelete, onReadUnread, onStarred}) {

    if (!mails.length) return <div className="mail-loading">No Mails To Show...</div>
    return (
        <React.Fragment>
            <ul className="mail-list">
                {mails.map(mail => 
                    <li onClick={()=>onRead(mail)} className={`mail-container ${mail.isRead?'mail-read':''}`} key={mail.id}>
                        <MailPreview 
                        mail={mail} 
                        onDelete={(ev)=> onDelete(ev,mail)} 
                        onReadUnread={(ev)=> onReadUnread(ev,mail)} 
                        isRead={mail.isRead}
                        onStarred={(ev)=>onStarred(ev,mail)}/>
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
}
