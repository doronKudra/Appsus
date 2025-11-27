const { Link, NavLink } = ReactRouterDOM




export function MailHeader() {


    return (
        <header className="mail-header">
            {/* <input id="searchMail" type="text" /> */}
            <nav>
                <button className="clear-storage" onClick={() => localStorage.clear()}>Delete local storage</button>
            </nav>
        </header>
    )
}