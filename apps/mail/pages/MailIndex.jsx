import { mailService } from "../services/mail.service.js"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"


const { useEffect, useState, useRef } = React
const { useNavigate } = ReactRouterDOM


export function MailIndex() {

    // const [allMails, setAllMails] = useState(null)
    const [mails, setMails] = useState(null)
    const [isCompose, setIsCompose] = useState(false)
    const [folderName, setFolderName] = useState('inbox')

    const [unreadCount, setUnreadCount] = useState(0)
    const navigate = useNavigate()

    // useEffect(()=>{

    // })

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

    // function loadAllMails() {
    //     mailService.query().then(mails=>{
    //         setAllMails(mails)
    //     })
    // }

    function loadMails() {
        mailService.query()
            .then(mails => {
                const fillteredMails = mailService.getFilterByFolder(folderName, mails)
                setMails(fillteredMails || [])
            })
            .catch(err => alert(`from loadMails ${err}`))
    }



    function onRead(mailId) {
        navigate(`/mail/${mailId}`)
    }

    function onReadUnread(ev, mail) {
        ev.stopPropagation()

        const updatedMail = { ...mail, isRead: !mail.isRead }
        mailService.save(updatedMail).then(() => {
            setMails(prevMails =>
                prevMails.map(prevMail =>
                    prevMail.id === mail.id ? updatedMail : prevMail
                )
            )
        })

    }

    function onDelete(ev, mail) {
        ev.stopPropagation()
        if (!mail.isDeleted) {
            const updatedMail = { ...mail, isDeleted: true }
            mailService.save(updatedMail).then(() => { loadMails() })
            // setMails(prevMails =>
            //     prevMails.map(prevMail =>
            //         prevMail.id === mail.id ? updatedMail : prevMail
            //     )
            // )
            // }).then(()=>loadMails())
        } else {
            console.log('removing...:')
            mailService.remove(mail.id).then(()=>loadMails())
        }
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

    return (
        <main className="mail-index">
            <MailHeader unreadCount={unreadCount} />
            <MailFolderList onCompose={onCompose} setFolderName={setFolderName} unreadCount={unreadCount} />
            {mails ?
                <MailList
                    mails={mails}
                    onRead={onRead}
                    onDelete={onDelete}
                    onReadUnread={onReadUnread}
                    onStarred={onStarred} />
                :
                <div className="mail-loading">Loading...</div>}
            {isCompose && <MailCompose onCompose={onCompose} />}
        </main>
    )
}

