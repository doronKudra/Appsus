import { mailService } from "../services/mail.service.js"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"

const { useEffect, useState } = React


export function MailIndex() {

    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails() 
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => setMails(mails))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get mails!')
            })
    }

    if (!mails) {
        return <div>Loading...</div>
    }
    return (
        <main className="mails-page">
            <MailHeader />
            <MailList mails={mails} />
        </main>
    )
}

