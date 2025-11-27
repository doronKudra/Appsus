import { mailService } from "../services/mail.service.js";
// import { utilService } from "../../../services/util.service.js";

const { useState } = React

export function MailCompose({ onCompose }) {

    const [composeData, setComposeData] = useState(mailService.getMailTemplate())

    function onSend(ev) {
        ev.preventDefault()
        setComposeData(mail => {
            console.log('mail:',mail)
            if (!mail.body || !mail.subject || ! mail.to.name || !mail.to.mail) return alert('missing information')
            mailService.save(mail)
        }) 
        onCompose()
    }

    function handleChange({ target }) {
        const { name, value } = target
        setComposeData(data=>{
            if (name === 'mail') {
                return {...data, to:{...data.to, mail: value}}
            } else {
                return { ...data,[name]: value}
            }
        })
    }

    // mailService.getMailTemplate()
    // const {to, subject, body} = composeData
    return (
        <section className="mail-compose">
            <section className="compose-top">
                <h3>New Message</h3>
                <button onClick={onCompose}>✖</button>
            </section>

            <form className="mail-form" action="">
                <input onChange={handleChange} name="mail" type="email" placeholder="To" />
                <input onChange={handleChange} name="subject" type="text" placeholder="Subject" />
                <textarea onChange={handleChange} name="body" placeholder="Text" />

                <button onChange={handleChange} onClick={onSend}>Send</button>
            </form>
        </section>
    )
}