const { Link, NavLink } = ReactRouterDOM




export function MailHeader() {


    return (
        <header className="mail-header">
            {/* <button className="round-btns">☰</button> */}
            <div>
                <Link to="/">
                    <img className="logo" src="../assets/img/Appsus.png" />
                </Link>
                <input id="searchMail" type="text" />
            </div>
            <nav>
                <button className="clear-storage" onClick={() => localStorage.clear()}>Delete local storage</button>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
            </nav>
        </header>
    )
}