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
            .then(mail => setMail(mail))
    }

    function onBack() {
        navigate('/mail')
    }
    if (!mail) return (
        <section className="mail-details">
            <section className="details-container">
                <div className="mail-loading">Loading...</div>
            </section>
        </section>
    )
    return (
        <section className="mail-details">
            <section className="details-container">
                <h3 className="mail-details-h">Mail Info</h3>
                <section className="from-details">
                    <h2>from: {mail.from.mail === mailService.loggedinUser.mail ? 'Me' : mail.from.name}</h2>
                    <h3>{mail.from.mail}</h3>
                </section>
                <h3 className="to-details">Sent to: {mail.to.mail===mailService.loggedinUser.mail?'Me':mail.to.mail}</h3>
                <h5>{mailService.getSentTime(mail.sentAt)}</h5>
                <p>{mail.body}</p>
                <button onClick={onBack}>back</button>
            </section>
        </section>
    )
}