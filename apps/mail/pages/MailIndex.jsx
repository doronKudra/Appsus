import { mailService } from "../services/mail.service.js"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"

const { useEffect, useState } = React
const { useNavigate } = ReactRouterDOM


export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isCompose, setIsCompose] = useState(false)
    const navigate = useNavigate()
    console.log('mails:',mails)

    useEffect(() => {
        loadMails() 
    }, [isCompose])

    function loadMails() {
        mailService.query()
            .then(mails => setMails(mails))
            .catch(err => {
                console.log('err:', err)
                alert('Cannot get mails!')
            })
    }

    function onRead(mailId) { //no need to render?
        navigate(`/mail/${mailId}`)
    }

    function onDelete(ev, mailId) {
        ev.stopPropagation()
        mailService.remove(mailId)
        setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
        console.log('deleted',mailId)
    }

    function onCompose() {
        setIsCompose(isCompose => !isCompose)
    }

    if (!mails) {
        return <div>Loading...</div>
    }
    return (
        <main className="mail-index">
            <MailHeader />
            <MailList mails={mails} onRead={onRead} onDelete={onDelete}/>
            <button onClick={onCompose}>Compose</button>
            {isCompose && <MailCompose onCompose={onCompose}/>}
        </main>
    )
}

