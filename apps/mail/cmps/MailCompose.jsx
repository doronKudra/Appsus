import { mailService } from "../services/mail.service.js";
import { storageService } from "../../../services/async-storage.service.js";

const { useState, useEffect } = React

export function MailCompose({ onCompose, setAllMails, setMails, draft }) {

    const [composeData, setComposeData] = useState(mailService.getMailTemplate())

    useEffect(() => {
        if (draft) setComposeData(draft)
    }, [draft])

    function onSend(ev) {
        ev.preventDefault()
        if (!composeData.body || !composeData.subject || !composeData.to.name || !composeData.to.mail) return alert('missing information')
        const draftMail = { ...composeData, sentAt: Date.now() }
        setAllMails(prevMails => [...prevMails, draftMail])
        setMails(prevMails => [...prevMails, draftMail])
        storageService.post(mailService.MAIL_KEY, draftMail).then(() => onCompose())
    }

    function onExit() {
        if (!composeData.body && !composeData.subject && !composeData.to.mail) return onCompose()
        const draftMail = {
            ...composeData,
            sentAt: Date.now(),
            isDraft: true,
            isRead: true,
            body: composeData.body || '(No Content)',
            subject: composeData.subject || '(No subject)',
        }
        setAllMails(prevMails => [...prevMails, draftMail])
        setMails(prevMails => [...prevMails, draftMail])
        storageService.post(mailService.MAIL_KEY, draftMail).then(() => onCompose())
    }



    function handleChange({ target }) {
        const { name, value } = target
        setComposeData(data => {
            if (name === 'mail') {
                return { ...data, to: { ...data.to, mail: value } }
            } else {
                return { ...data, [name]: value }
            }
        })
    }

    return (
        <section className="mail-compose">
            <section className="compose-top">
                <h3>New Message</h3>
                <button onClick={onExit}>✖</button>
            </section>

            <form className="mail-form" action="">
                <input onChange={handleChange} name="mail" type="email" placeholder="To" autoFocus/>
                <input value={composeData.subject || ''} onChange={handleChange} name="subject" type="text" placeholder="Subject" />
                <textarea value={composeData.body || ''} onChange={handleChange} name="body" placeholder="Text" />

                <button onChange={handleChange} onClick={onSend}>Send</button>
            </form>
        </section>
    )
}