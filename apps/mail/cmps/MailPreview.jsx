


export function MailPreview({mail}) {

    function getSentTime(time) { // 176416405...
        const currTime = Date.now()
        const timeDiff = Date.now()-time
        
        return timeDiff
    }
    
    console.log('mail:',mail.sentAt)
    return(
        <React.Fragment>
            <h5 className="mail-from">{mail.from}</h5>
            <h4 className="mail-subject">{mail.subject}-</h4>
            <p className="mail-body">{mail.body}</p>
            <h3 className="mail-date"> {getSentTime(mail.sentAt)}</h3>
        </React.Fragment>
    )
}