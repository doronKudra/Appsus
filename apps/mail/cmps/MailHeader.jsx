import { mailService } from "../services/mail.service.js"



export function MailHeader({unreadCount}) {
    return (
        <header className="mail-header">
            <h3>{unreadCount?unreadCount + ' Unread' : '0 Unread'}</h3>
            <select name="sort-mail" id="sort-mail">
                <option value="">Sort By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title-a">title A to Z</option>
                <option value="title-z">title Z to A</option>
            </select>
            <input id="searchMail" type="text" />
            <nav>
                <button className="clear-storage" onClick={() => localStorage.clear()}>Delete local storage</button>
            </nav>
        </header>
    )
}