



export function MailHeader() {
    

    return(
        <header className="Mail-Header">
            <button>Menu</button>
            <div>Logo</div>
            <input id="searchMail" type="text" />
            <button onClick={()=>localStorage.clear()}>Delete local storage</button>
        </header>
    )
}