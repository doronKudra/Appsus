import { mailService } from "../services/mail.service.js"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"


const { useEffect, useState } = React
const { useNavigate } = ReactRouterDOM


export function MailIndex() {

    const [mails, setMails] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        loadMails() 
    }, [])

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

    if (!mails) {
        return <div>Loading...</div>
    }
    return (
        <main className="mails-page">
            <MailHeader />
            <MailList mails={mails} onRead={onRead} onDelete={onDelete}/>
        </main>
    )
}

