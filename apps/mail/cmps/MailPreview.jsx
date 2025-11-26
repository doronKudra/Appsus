import { mailService } from "../services/mail.service.js"



export function MailPreview({mail, onCheckBox, onDelete}) {

    function getSentTime(time) { // time = 176416405...
        const sentAt = new Date(time)
        const timeDiff = new Date(sentAt)-time
        
        if (timeDiff<86400000){
            return `${sentAt.getHours()}:${sentAt.getMinutes()}`
        } else {
            return `${mailService.months[sentAt.getMonth()]} ${sentAt.getDate()}`
        }
    }
    
    return(
        <React.Fragment>
            <input id={mail.id} type="checkbox" onClick={onCheckBox} />
            <button onClick={onDelete}>Delete</button>
            <h5 className="mail-from">{mail.sender.name}</h5>
            <h4 className="mail-subject">{mail.subject}-</h4>
            <p className="mail-body">{mail.body}</p>
            <h3 className="mail-date"> {getSentTime(mail.sentAt)}</h3>
        </React.Fragment>
    )
}