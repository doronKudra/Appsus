import { MailPreview } from "./MailPreview.jsx"

// const { Link } = ReactRouterDOM


export function MailList({ mails }) {
    
    function onCheckBox({ target },mailId) {
        const value = target.checked
        console.log('i do nothing for now:','value:',value, mailId)
    }

    function onDelete(mailId) {
        console.log('mailId:',mailId)
    }

    if (!mails.length) return <div>No Mails To Show...</div>
    return (
        <React.Fragment>
            <div>Mail list</div>
            <ul className="mail-list">
                {mails.map(mail => 
                    <li className={`mail-container ${mail.isRead?'read':''}`} key={mail.id}>
                        <MailPreview
                         mail={mail} 
                         onCheckBox={(ev)=> onCheckBox(ev, mail.id)} 
                         onDelete={()=> onDelete(mail.id)}/>
                    </li>
                )}
            </ul>
        </React.Fragment>
    )
}
