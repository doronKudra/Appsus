import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate } = ReactRouterDOM
const { useState, useEffect } = React



export function MailDetails() {

    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => {
                if (!mail.isRead) {
                    mail.isRead = true
                    mailService.save(mail).then(() => setMail(mail))
                } else {
                    setMail(mail)
                }
            })
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return (
        <section className="mail-details">
            <div className="mail-loading">Loading...</div>
        </section>
    )
    return (
        <section className="mail-details">
            <section className="details-container">
                <h3>Mail Details:</h3>
                <h2>{mail.from.name}</h2>
                <h3>{mail.from.mail}</h3>
                <h5>{mailService.getSentTime(mail.sentAt)}</h5>
                <p>{mail.body}</p>
                <button onClick={onBack}>back</button>
            </section>
        </section>
    )
}