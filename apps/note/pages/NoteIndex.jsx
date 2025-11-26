
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { useSearchParamsFilter } from "../customHooks/useSearchParamsFilter.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteAdd } from "../cmps/NoteAdd.jsx"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const setExistingSearchPrms = useSearchParamsFilter(setFilterBy)

    useEffect(() => {
        loadNotes()
        setExistingSearchPrms(filterBy)
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
            .catch(
                err => { 
                    console.log('Problem Loading Notes:', err) 
                    showErrorMsg(`Unable To Load Notes`)
                })
    }

    function onAddNote(note) {
        noteService.save(note)
            .then(() => loadNotes())
    }

    function onRemoveNote(noteId) {
        setIsLoading(true)
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problem removing note:', err) 
                showErrorMsg(`Unable To Remove Note`)
            })
            .finally(() => setIsLoading(false))
    }

    if (!notes) return <div className="loader">Loading...</div>
    console.log('notes:', notes)
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className="note-index">
            <NoteAdd onAddNote={onAddNote} />
            <NoteList loadingClass={loadingClass} onRemoveNote={onRemoveNote} notes={notes} />
        </section>
    )
}