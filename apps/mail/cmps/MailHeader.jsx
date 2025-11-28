import { mailService } from "../services/mail.service.js"



export function MailHeader({unreadCount}) {
    return (
        <header className="mail-header">
            <nav>
                <button className="clear-storage" onClick={() => localStorage.clear()}>Delete local storage</button>
            </nav>
            <input id="searchMail" type="text" />
            <h3>{unreadCount?unreadCount + ' Unread' : '0 Unread'}</h3>
        </header>
    )
}