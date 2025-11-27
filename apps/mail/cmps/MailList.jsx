import { MailPreview } from "./MailPreview.jsx"

// const { Link } = ReactRouterDOM
const { useEffect, useState } = React


export function MailList({ mails ,onRead, onDelete}) {

    
    function onCheckBox(ev,mailId) {
        ev.stopPropagation()
        const value = ev.target.checked
        console.log('i do nothing for now:','value:',value, mailId)
    }

    

    if (!mails.length) return <div>No Mails To Show...</div>
    return (
        <React.Fragment>
            <ul className="mail-list">
                {mails.map(mail => 
                    <li onClick={()=>onRead(mail.id)} className={`mail-container ${mail.isRead?'mail-read':''}`} key={mail.id}>
                        <MailPreview mail={mail} onCheckBox={(ev)=> onCheckBox(ev, mail.id)} onDelete={(ev)=> onDelete(ev,mail.id)}/>
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
}
