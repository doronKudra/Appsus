import { mailService } from "../services/mail.service.js"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"


const { useEffect, useState, useRef } = React
const { useNavigate } = ReactRouterDOM


export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isCompose, setIsCompose] = useState(false)
    const [folderName, setFolderName] = useState('inbox')
    console.log('folderName:', folderName)
    const [unreadCount, setUnreadCount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        loadMails()
    }, [isCompose])
    
    useEffect(() => {
        loadMails()
    }, [folderName])

    useEffect(() => {
        if (!mails) return
        setUnreadCount(unreadCount => unreadCount = mails.filter(mail => !mail.isRead).length)
    }, [mails])

    function loadMails() {
        mailService.query()
            .then(mails => {
                console.log('mails:',mails)
                const fillteredMails = mailService.getFilterByFolder(folderName, mails)
                setMails(fillteredMails||[])
            })
            .catch(err => alert(`from loadMails ${err}`))
    }



    function onRead(mailId) {
        navigate(`/mail/${mailId}`)
    }

    function onReadUnread(ev, mail) {
        ev.stopPropagation()

        const updatedMail = { ...mail, isRead: !mail.isRead }
        mailService.save(updatedMail)

        setMails(prevMails =>
            prevMails.map(prevMail =>
                prevMail.id === mail.id ? updatedMail : prevMail
            )
        )
    }

    function onDelete(ev, mailId) {
        ev.stopPropagation()
        mailService.remove(mailId)
        setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
    }

    function onStarred(ev, mail) {
        ev.stopPropagation()
        const updatedMail = { ...mail, isStarred: !mail.isStarred }
        mailService.save(updatedMail)

        setMails(prevMails =>
            prevMails.map(prevMail => prevMail.id === mail.id ? updatedMail : prevMail)
        )
    }

    function onCompose() {
        setIsCompose(isCompose => !isCompose)
    }

    if (!mails) {
        return <div>Loading...</div>
    }

    return (
        <main className="mail-index">
            <MailHeader unreadCount={unreadCount} />
            <MailFolderList onCompose={onCompose} setFolderName={setFolderName} />
            <MailList
                mails={mails}
                onRead={onRead}
                onDelete={onDelete}
                onReadUnread={onReadUnread}
                onStarred={onStarred} />
            {isCompose && <MailCompose onCompose={onCompose} />}
        </main>
    )
}

