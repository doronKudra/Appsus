import { mailService } from "../services/mail.service.js"



export function MailPreview({ mail, onDelete, onReadUnread, isRead,onStarred}) {


    return (
        <React.Fragment>
            <section>
                <h5 onClick={onStarred}>{mail.isStarred?<i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>:<i className="fa-regular fa-star"></i>}</h5>
                <h5 className="mail-from">{mail.from.name}</h5>
            </section>
            <section>
                <h4 className="mail-subject">{mail.subject}-</h4>
                <p className="mail-body">{mail.body}</p>
            </section>
            <h3 className="mail-date"> {mailService.getSentTime(mail.sentAt)}</h3>
            <section className="edit-mail-btns">
                <button className="delete-btn" onClick={onDelete}><i className="fa-regular fa-trash-can"></i></button>
                <button className="read-unread-btn" onClick={onReadUnread}>{isRead ? <i className="fa-regular fa-envelope-open"></i>:<i className="fa-regular fa-envelope"></i> }</button>
            </section>
        </React.Fragment>
    )
}
