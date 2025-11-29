const { useState, useRef, useEffect } = React

export function NoteFilter({ onSetFilter }) {

    const [txt, setTxt] = useState('')

    function onSubmit(ev) {
		ev.preventDefault()
    }

    return (
        <div>
            <div className="filter-bar-notes">
                <div id='notes-nav' className="chosen-filter" style={{ display: 'grid', width: '48px', height: '48px', borderRadius: '50%' }}>
                    <div style={{ placeSelf: 'center' }} className="fa-regular fa-lightbulb "></div>
                </div>
                <label className="note-item-label" htmlFor='notes-nav' style={{ paddingLeft: '5px', paddingBlock: '16px', width: '100%', height: '48px' }}>Notes</label>
            </div>
            <div className="filter-search-notes">
                <form className="filter-search-notes-form" onSubmit={onSubmit}>
                    <button name="search-btn-notes" className="fa-solid fa-magnifying-glass fa-lg"></button>
                    <input onChange={(ev) => {
                        setTxt(ev.target.value)
                        onSetFilter({txt})
                        
                    }} name="search-input-notes" className="search-txt-box-notes" type='text' placeholder='Search Notes'></input>
                </form>
            </div>
        </div>)
}