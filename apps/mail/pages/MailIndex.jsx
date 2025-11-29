import { mailService } from "../services/mail.service.js"
import { MailHeader } from "../cmps/MailHeader.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"


const { useEffect, useState, useRef } = React
const { useNavigate } = ReactRouterDOM


export function MailIndex() {

    const [allMails, setAllMails] = useState(null)
    const [mails, setMails] = useState(null)
    const [isCompose, setIsCompose] = useState(false)
    const [draft, setDraft] = useState(null)

    const [folderName, setFolderName] = useState('inbox')
    const [filterByText, setFilterByText] = useState('')
    const [sortBy, setSortBy] = useState('')

    const [unreadCount, setUnreadCount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        loadAllMails()
    }, [])

    useEffect(() => {
        if (!allMails) return
        let filteredMails = mailService.getFilterByFolder(folderName, allMails)
        if (filterByText && filterByText.length) {
            filteredMails = mailService.filterByText(filterByText, filteredMails)
        }
        if (sortBy && sortBy.length) {
            filteredMails = mailService.sortBy(sortBy, filteredMails)
        }

        setMails(filteredMails)
    }, [folderName, allMails, filterByText, sortBy])


    useEffect(() => {
        if (!allMails) return
        setUnreadCount(unreadCount => unreadCount = allMails.filter(mail => !mail.isRead && !mail.isDeleted).length)
    }, [allMails])

    function loadAllMails() {
        mailService.query().then(mails => {
            setAllMails(mails)
        })
    }

    function onRead(mail) {
        if (mail.isDraft) {
            setDraft(mail)
            setIsCompose(isCompose => isCompose = true)
            mailService.remove(mail.id).then(() => {
                setAllMails(prev => prev.filter(prevMail => prevMail.id !== mail.id))
                setMails(prev => prev.filter(prevMail => prevMail.id !== mail.id))
                mailService.remove(mail.id)
                    .then(console.log('removed'))
            })
        } else {
            const updated = { ...mail, isRead: true }
            setAllMails(mails => [...mails, updated])
            setMails(mails => [...mails, updated])
            mailService.save(updated)
            
            navigate(`/mail/${mail.id}`)
        }
    }

    function onReadUnread(ev, mail) {
        ev.stopPropagation()
        const updatedMail = { ...mail, isRead: !mail.isRead }

        setMails(prevMails =>
            prevMails.map(prevMail =>
                prevMail.id === mail.id ? updatedMail : prevMail
            ))
        setAllMails(prevMails =>
            prevMails.map(prevMail =>
                prevMail.id === mail.id ? updatedMail : prevMail
            ))

        mailService.save(updatedMail)
    }

    function onDelete(ev, mail) {
        ev.stopPropagation()
        if (!mail.isDeleted) {
            const updatedMail = { ...mail, isDeleted: true }
            setAllMails(mails => mails.map(prevMail => prevMail.id === mail.id ? updatedMail : prevMail))
            setMails(mails => mails.map(prevMail => prevMail.id === mail.id ? updatedMail : prevMail))
            mailService.save(updatedMail)
        } else {
            console.log('removing...:')
            setAllMails(prev => prev.filter(prevMail => prevMail.id !== mail.id))
            setMails(prev => prev.filter(prevMail => prevMail.id !== mail.id))
            mailService.remove(mail.id)
                .then(console.log('removed'))
        }
    }

    function onStarred(ev, mail) {
        ev.stopPropagation()
        const updatedMail = { ...mail, isStarred: !mail.isStarred }

        setMails(prevMails =>
            prevMails.map(prevMail => prevMail.id === mail.id ? updatedMail : prevMail)
        )
        setAllMails(prevMails =>
            prevMails.map(prevMail => prevMail.id === mail.id ? updatedMail : prevMail)
        )

        mailService.save(updatedMail)
    }

    function onCompose() {
        setIsCompose(isCompose => !isCompose)
    }

    return (
        <main className="mail-index">
            <MailHeader unreadCount={unreadCount} filterByText={filterByText} setFilterByText={setFilterByText} setSortBy={setSortBy} />
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
            {isCompose && <MailCompose onCompose={onCompose} setAllMails={setAllMails} setMails={setMails} draft={draft} setDraft={setDraft} />}
        </main>
    )
}

