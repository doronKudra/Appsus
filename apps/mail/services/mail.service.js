// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'



const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MAIL_KEY = 'mails'


const loggedinUser = {
    mail: 'user@appsus.com',
    name: 'Mahatma Appsus'
}


const sender = { name: 'Momo', mail: 'momo@momo.com' }


_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getSentTime,
    getMailTemplate,
    getUnreadMails,
    getFilterByFolder,
    filterByText,
    sortBy,
    loggedinUser,
    months,
    MAIL_KEY,
    // getEmptyMail,
    // getDefaultFilter,
    // getFilterFromSearchParams
}

function query() {
    return storageService.query(MAIL_KEY)
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    console.log('saving...')
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail(sender, loggedinUser, utilService.makeLorem(3), utilService.makeLorem(30)),
            _createMail(sender, loggedinUser, utilService.makeLorem(3), utilService.makeLorem(40)),
            _createMail(sender, loggedinUser, utilService.makeLorem(3), utilService.makeLorem(60)),
            _createMail(sender, loggedinUser, utilService.makeLorem(3), utilService.makeLorem(50)),
            _createMail(loggedinUser, sender, utilService.makeLorem(3), utilService.makeLorem(20)),
            _createMail(loggedinUser, sender, utilService.makeLorem(3), utilService.makeLorem(10)),
            _createMail(loggedinUser, sender, utilService.makeLorem(3), utilService.makeLorem(30)),
            _createMail(sender, loggedinUser, utilService.makeLorem(3), utilService.makeLorem(25)),
            _createMail(sender, loggedinUser, utilService.makeLorem(3), utilService.makeLorem(25)),
            _createMail(sender, loggedinUser, utilService.makeLorem(3), utilService.makeLorem(25)),
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(from, to, subject, body) {
    const mail = {
        from,
        to,
        subject,
        body,
        sentAt: Date.now(),
        isRead: from===loggedinUser? true:false,
        isStarred: false,
        isDraft: false,
        id: utilService.makeId(),
        isDeleted: false,
    }
    return mail
}

function getSentTime(time) { // time = 176416405...
    const sentAt = new Date(time)
    const timeDiff = new Date(sentAt) - time

    if (timeDiff < 86400000) {
        const hour = sentAt.getHours()
        const AMPM = hour >= 12 ? 'PM' : 'AM'
        return `${hour}:${sentAt.getMinutes().toString().padStart(2,0)} ${AMPM}`
    } else {
        return `${mailService.months[sentAt.getMonth()]} ${sentAt.getDate()}`
    }
}

function sortBy(option,mails) {
    console.log('option:',option)
    let sorted
    if (option === 'oldest') {
        sorted = mails.sort((a,b)=> b.sentAt - a.sentAt)
    } else if (option === 'newest') {
        sorted = mails.sort((a,b)=> a.sentAt - b.sentAt)
    } else if (option === 'title-a') {
        sorted = mails.sort((a,b)=> a.subject.localeCompare(b.subject))
    }else if (option === 'title-z') {
        sorted = mails.sort((a,b)=> b.subject.localeCompare(a.subject))
    }

    return sorted
}

function filterByText(txt, mails) {
    console.log('mails,txt:',mails,txt)
    let filtered
    const regExp = new RegExp(txt, 'i')
    filtered = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body)||regExp.test(mail.from.mail)||regExp.test(mail.from.name))
    return filtered
}

function getMailTemplate(subject, body) {
    return {
        from: loggedinUser,
        to: { name: sender.name, mail: '' },
        subject,
        body,
        isRead: true,
        isStarred: false,
        isDraft: false,
        isDeleted: false,
        id: utilService.makeId(),
    }
}

function getUnreadMails(mails) {
    const unread = mails ? mails.filter(mail => !mail.isRead) : 0
    return unread.length
}

function getFilterByFolder(mode, mails) {
    console.log('mails:',mails)
    const inboxFilter = { from: loggedinUser, isDraft: false, isDeleted: false }
    const sentFilter = { from: loggedinUser, isDeleted: false }
    const starredFliter = { isStarred: true, isDeleted: false }
    const trashFilter = { isDeleted: true }
    const draftsFilter = { isDraft: true,isDeleted: false }
    if (mode === 'inbox') {
        return mails.filter(mail => {
            return (
                inboxFilter.from.mail !== mail.from.mail &&
                inboxFilter.isDeleted === mail.isDeleted &&
                inboxFilter.isDraft === mail.isDraft
            )
        })
    } else if (mode === 'starred') {
        return mails.filter(mail => {
            return (
                starredFliter.isStarred === mail.isStarred &&
                starredFliter.isDeleted === mail.isDeleted
            )
        })
    } else if (mode === 'sent') {
        return mails.filter(mail => {
            return (
                sentFilter.from.mail === mail.from.mail &&
                sentFilter.isDeleted === mail.isDeleted
            )
        })
    } else if (mode === 'trash') {
        return mails.filter(mail => {
            return (
                trashFilter.isDeleted === mail.isDeleted
            )
        })
    } else if (mode === 'drafts') {
        return mails.filter(mail =>{
            return(
                draftsFilter.isDraft === mail.isDraft &&
                draftsFilter.isDeleted == mail.isDeleted
            )
        })
    } else return mails

}



