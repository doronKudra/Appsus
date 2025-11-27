// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


// localStorage.clear()
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MAIL_KEY = 'mails'

// const mail = {
//     id: 'e101',
//     createdAt: 1551133930500,
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt: 1551133930594,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }

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
            _createMail(sender, loggedinUser, "subject1", utilService.makeLorem(10), false),
            _createMail(sender, loggedinUser, "subject2", utilService.makeLorem(15), true),
            _createMail(sender, loggedinUser, "subject3", utilService.makeLorem(20), true),
            _createMail(sender, loggedinUser, "subject4", utilService.makeLorem(25), false),
            _createMail(loggedinUser, sender, "subject4", utilService.makeLorem(25), false),
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
        isRead,
        sentAt: Date.now(),
    }
    mail.id = utilService.makeId()
    return mail
}

function getSentTime(time) { // time = 176416405...
    const sentAt = new Date(time)
    const timeDiff = new Date(sentAt) - time

    if (timeDiff < 86400000) {
        return `${sentAt.getHours()}:${sentAt.getMinutes()}`
    } else {
        return `${mailService.months[sentAt.getMonth()]} ${sentAt.getDate()}`
    }
}

function getMailTemplate(to,subject,body) {
    return {
        from:loggedinUser,
        to:{name:sender.name},
        subject,
        body,
        isRead:true,
        sentAt: Date.now(),
    }
}

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


