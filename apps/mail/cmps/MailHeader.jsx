import { mailService } from "../services/mail.service.js"



export function MailHeader({ unreadCount, filterByText, setFilterByText, setSortBy }) {

    function onText({ target }) {
        setFilterByText(filter => filter = target.value)
    }

    function onSort({ target }) {
        setSortBy(target.value)
    }

    function onClearTxt() {
        setFilterByText('')
    }

    return (
        <header className="mail-header">
            <h3>{unreadCount ? unreadCount + ' Unread' : '0 Unread'}</h3>
            <select onChange={(ev) => onSort(ev)} name="sort-mail" id="sort-mail">
                <option value="">Sort By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="title-a">title A to Z</option>
                <option value="title-z">title Z to A</option>
            </select>
            <div className="mail-search-container">
                <div className="search-symbol"><img src="./assets/img/search_46dp_434343_FILL0_wght400_GRAD0_opsz48.png"></img> </div>
                <input value={filterByText} onChange={(ev) => onText(ev)} id="searchMail" type="text" />
                <button onClick={onClearTxt} className="clear-txt-btn"><img src="./assets/img/close_46dp_434343_FILL0_wght400_GRAD0_opsz48.png"></img> </button>
            </div>
        </header>
    )
}