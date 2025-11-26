import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

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
                notes = notes.filter(note => regExp.test(note.title) || regExp.test(note.text))
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }
            if (filterBy.tag){
                notes = notes.filter(note => filterBy.tag in note.tags)
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

function getEmptyNote(type = 'NoteTxt',isPinned = 'false',info = {tags: {}},style = {},createdAt = Date.now()) {
    return { type,isPinned,info,style,createdAt}
}

function getDefaultFilter() {
    return { txt: '', type: '' , tag: '', color: ''}
}



function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            _createNote('NoteTxt','false',{title:'Hello There',txt:'Somebody',tags:'fashion'},{},Date.now() - 5*1000*60),
            _createNote('NoteTxt','false',{title:'Somewhere',txt:'Over the rainbow',tags:'music'},{},Date.now() - 10*1000*60),
            _createNote('NoteTxt','false',{title:'Very Good',txt:'Very Nice',tags:'funny'},{},Date.now() - 15*1000*60)
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
    const tag = searchParams.get('tag') || ''
    const color = searchParams.get('color') || ''
    return {
        txt,
        type,
        tag,
        color,
    }
}
