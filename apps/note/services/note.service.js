import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes() //

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.title) || regExp.test(note.info.txt))
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type = 'NoteTxt',isPinned = false,info = {tags: {}},style = {},createdAt = Date.now()) {
    return { type,isPinned,info,style,createdAt}
}

function getDefaultFilter() {
    return { txt: '', type: '' , tag: '', color: ''}
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            _createNote('NoteTxt',true,{title:'Somewhere',txt:'Over the rainbow',tags:'music'},{},Date.now() - 10*1000*60),
            _createNote('NoteImg',false,{title:'Capybara',tags:'funny', imgSrc: 'assets/img/Capybara.jpg'},{},Date.now() - 20*1000*60),
            _createNote('NoteTxt',false,{title:'Hi 123',txt:'Bla bla bla',tags:'fashion'},{},Date.now() - 5*1000*60),
            _createNote('NoteImg',false,{title:'What?',tags:'funny', imgSrc: 'assets/img/Capybara2.jpg'},{},Date.now() - 30*1000*60),
            _createNote('NoteVideo',false,{title:'Funny Video', tags:'funny', videoLink:'https://www.youtube.com/embed/J9E0DLwDSSs'},{},Date.now() - 50*1000*60),
            _createNote('NoteTodos',false,{title:'What?',tags:'funny', items: [{txt:'Fix bugs',isMarked:true},{txt:'Add Capybara',isMarked:true},{txt:'Edit Notes',isMarked:false}]},{},Date.now() - 30*1000*60),
            _createNote('NoteTxt',true,{title:'Somewhere',txt:'Something',tags:'music'},{},Date.now() - 10*1000*60),
            _createNote('NoteImg',false,{title:'Capybara',tags:'funny', imgSrc: 'assets/img/Capybara.jpg'},{},Date.now() - 20*1000*60),
            _createNote('NoteTxt',false,{title:'Hello There',txt:'Somebody',tags:'fashion'},{},Date.now() - 5*1000*60),
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(type,isPinned,info,style,createdAt) {
    const note = getEmptyNote(type,isPinned,info,style,createdAt)
    note.id = utilService.makeId()
    return note
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const type = searchParams.get('type') || ''
    return {
        txt,
        type,
    }
}
