// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


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

// const loggedinUser = {
//     email: 'user@appsus.com',
//     fullname: 'Mahatma Appsus'
// }


_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
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
            console.log(' mails:', mails)
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
            _createMail('momo@momo.com', "subject1", 'text'),
            _createMail('momo@momo.com', "subject2", 'text'),
            _createMail('momo@momo.com', "subject3", 'text'),
            _createMail('momo@momo.com', "subject4", 'text')
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(from, subject, body) {
    const mail = getEmptyMail(from, subject, body)
    mail.id = utilService.makeId()
    return mail
}

function getEmptyMail(from = '', subject = '', body = '') {
    return {
        from,
        subject,
        body,
        sentAt: Date.now()
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

function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}


