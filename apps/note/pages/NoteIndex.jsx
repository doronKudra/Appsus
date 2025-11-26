
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { useSearchParamsFilter } from "../customHooks/useSearchParamsFilter.js"

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
            .catch(err => { console.log('err:', err) })
    }

    function onRemoveNote(noteId) {
        setIsLoading(true)
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note (${noteId}) removed successfully!`)
            })
            .catch(err => { console.log('Problem removing note:', err) })
            .finally(() => setIsLoading(false))
    }

    if (!notes) return <div className="loader">Loading...</div>
    console.log('notes:', notes)
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className="note-index">
            {/* noteFilter */}
            <section style={{ marginTop: '10px' }} className="container">
                <form id="myForm" action="">
                    <input type="text" name="content" />
                    <button type="submit">Add Note</button>
                </form>
            </section>
            <NoteList loadingClass={loadingClass} onRemoveNote={onRemoveNote} notes={notes} />
        </section>
    )
}