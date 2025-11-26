import { mailService } from "../services/mail.service.js"


const { useParams, useNavigate} = ReactRouterDOM
const { useState, useEffect } = React



export function MailDetails() {
    
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadMail()
    }, [params.bookId])

    function loadMail() {
        mailService.get(params.mailId)
        .then(mail => {
            if (!mail.isRead) {
                console.log('1:',1)
                mail.isRead = true
                mailService.save(mail)
            }
            setMail(mail)
        })
    }

    function onBack() {
        navigate('/mail')
    }
    if (!mail) return <div>Loading</div>
    return (
        <section className="mail-details">
            <h3>Mail Details:</h3>
            <h2>{mail.sender.name}</h2>
            <h3>{mail.sender.mail}</h3>
            <h5>{mailService.getSentTime(mail.sentAt)}</h5>
            <p>{mail.body}</p>
            <button onClick={onBack}>back</button>
        </section>
    )
}