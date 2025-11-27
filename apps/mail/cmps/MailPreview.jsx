import { mailService } from "../services/mail.service.js"



export function MailPreview({mail, onCheckBox, onDelete}) {

    
    return(
        <React.Fragment>
            <input id={mail.id} type="checkbox" onClick={onCheckBox} />
            <button onClick={onDelete}>Delete</button>
            <h5 className="mail-from">{mail.from.name}</h5>
            <h4 className="mail-subject">{mail.subject}-</h4>
            <p className="mail-body">{mail.body}</p>
            <h3 className="mail-date"> {mailService.getSentTime(mail.sentAt)}</h3>
        </React.Fragment>
    )
}