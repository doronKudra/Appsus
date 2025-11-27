import { mailService } from "../services/mail.service.js"



export function MailHeader({unreadCount}) {
    return (
        <header className="mail-header">
            <nav>
                <button className="clear-storage" onClick={() => localStorage.clear()}>Delete local storage</button>
            </nav>
            <h3>{unreadCount?unreadCount + 'Unread Mails' : '0 Unread Mails'}</h3>
            <input id="searchMail" type="text" />
        </header>
    )
}