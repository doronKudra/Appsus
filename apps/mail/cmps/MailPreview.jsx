import { mailService } from "../services/mail.service.js"



export function MailPreview({ mail, onDelete, onReadUnread, isRead,onStarred}) {


    return (
        <React.Fragment>
            <section className="prev-sec-1">
                <button onClick={onStarred}>{mail.isStarred?<i className="fa-solid fa-star" style={{color: "#FFD43B"}}></i>:<i className="fa-regular fa-star"></i>}</button>
                <p className="mail-from">{mail.from.name}</p>
            </section>
            <section className="prev-sec-2">
                <p className="mail-subject">{mail.subject}-</p>
                <p className="mail-body">{mail.body}</p>
            </section>
            <p className="mail-date"> {mailService.getSentTime(mail.sentAt)}</p>
            <section className="edit-mail-btns">
                <button className="delete-btn" onClick={onDelete}><i className="fa-regular fa-trash-can"></i></button>
                <button className="read-unread-btn" onClick={onReadUnread}>{isRead ? <i className="fa-regular fa-envelope-open"></i>:<i className="fa-regular fa-envelope"></i> }</button>
            </section>
        </React.Fragment>
    )
}
