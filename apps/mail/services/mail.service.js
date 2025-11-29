// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


// localStorage.clear()
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MAIL_KEY = 'mails'

/*
filterBy = {
    text,

}

*/
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
    months,
    // getEmptyMail,
    // getDefaultFilter,
    // getFilterFromSearchParams
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.from) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.vendor))
            }
            if (filterBy.subject) {
                mails = mails.filter(mail => mail.speed >= filterBy.minSpeed)
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
    // .then(_setNextPrevMailId)
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
            _createMail(sender, loggedinUser, "subject1", utilService.makeLorem(10)),
            _createMail(sender, loggedinUser, "subject2", utilService.makeLorem(15)),
            _createMail(sender, loggedinUser, "subject3", utilService.makeLorem(20)),
            _createMail(sender, loggedinUser, "subject4", utilService.makeLorem(25)),
            _createMail(loggedinUser, sender, "subject4", utilService.makeLorem(25)),
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(from, to, subject, body, isRead) {
    const mail = {
        from,
        to,
        subject,
        body,
        sentAt: Date.now(),
        isRead: false,
        isStarred: false,
        isDraft: false,
        id: utilService.makeId(),
        isDeleted: false,
    }
    // mail.id = utilService.makeId()
    return mail
}

function getSentTime(time) { // time = 176416405...
    const sentAt = new Date(time)
    const timeDiff = new Date(sentAt) - time

    if (timeDiff < 86400000) {
        const hour = sentAt.getHours()
        const AMPM = hour >= 12 ? 'PM' : 'AM'
        return `${hour}:${sentAt.getMinutes()} ${AMPM}`
    } else {
        return `${mailService.months[sentAt.getMonth()]} ${sentAt.getDate()}`
    }
}

function getMailTemplate(subject, body) {
    return {
        from: loggedinUser,
        to: { name: sender.name, mail: '' },
        subject,
        body,
        isRead: false,
        isStarred: false,
        isDraft: false,
        isDeleted: false,
        sentAt: Date.now(),//TODO - move it to compose
    }
}

function getUnreadMails(mails) {
    const unread = mails ? mails.filter(mail => !mail.isRead) : 0
    return unread.length
}

function getFilterByFolder(mode, mails) {
    console.log('mode,mails:', mode, mails)
    const inboxFilter = { from: loggedinUser, isDraft: false, isDeleted: false }
    const sentFilter = { from: loggedinUser, isDeleted: false }
    const starredFliter = { isStarred: true, isDeleted: false }
    const trashFilter = { isDeleted: true }
    const draftsFilter = { isDraft: true }
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
    }

}

// function getInboxMails(mails) {
// const inboxMails = mails.filter(mail => mail.to === )
// }
// function getDefaultFilter() {
//     return { txt: '', minSpeed: '' }
// }

// function getFilterFromSearchParams(searchParams) {
//     const txt = searchParams.get('txt') || ''
//     const minSpeed = searchParams.get('minSpeed') || ''
//     return {
//         txt,
//         minSpeed
//     }
// }

// function _setNextPrevMailId(mail) {
//     return query().then((mails) => {
//         const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
//         const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
//         const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
//         mail.nextMailId = nextMail.id
//         mail.prevMailId = prevMail.id
//         return mail
//     })
// }


