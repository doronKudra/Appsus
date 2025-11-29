const { useState, useRef, useEffect } = React

export function NoteFilter({ onSetFilter }) {

    const [typeFilter,setTypeFilter] = useState('')

    function onSwitchFilter(type){
        onSetFilter({type})
        switch(type){
            case '':
                setTypeFilter('')
                break
            case 'NoteTxt':
                setTypeFilter('NoteTxt')
                break
            case 'NoteVideo':
                setTypeFilter('NoteVideo')
                break
            case 'NoteImg':
                setTypeFilter('NoteImg')
                break
            case 'NoteTodos':
                setTypeFilter('NoteTodos')
                break
            default:
                break
        }
        
    }

    function onSubmit(ev) {
		ev.preventDefault()
    }
    

    return (
        <div>
            <div className="filter-bar-notes">
                <div id='notes-nav-main' onClick={(ev) => {onSwitchFilter('')}} className={"note-item-nav "+((typeFilter === '') ? "chosen-filter" : "")} style={{ display: 'grid', width: '48px', height: '48px', borderRadius: '50%' }}>
                    <div style={{ placeSelf: 'center' }} className="fa-regular fa-lightbulb "></div>
                </div>
                <label  className={"note-item-label "+((typeFilter === '') ? "chosen-filter" : "")} onClick={(ev) => {onSwitchFilter('')}} htmlFor='notes-nav-main' style={{ paddingLeft: '5px', paddingBlock: '16px', width: '100%', height: '48px' }}>Notes</label>
                
                <div id='notes-nav-text' onClick={(ev) => {onSwitchFilter('NoteTxt')}} className={"note-item-nav "+((typeFilter === 'NoteTxt') ? "chosen-filter" : "")} style={{ display: 'grid', width: '48px', height: '48px', borderRadius: '50%' }}>
                    <div style={{ placeSelf: 'center' }} className="fa-regular fa-note-sticky "></div>
                </div>
                <label className={"note-item-label "+((typeFilter === 'NoteTxt') ? "chosen-filter" : "")} onClick={(ev) => {onSwitchFilter('NoteTxt')}} htmlFor='notes-nav-text' style={{ paddingLeft: '5px', paddingBlock: '16px', width: '100%', height: '48px' }}>Text</label>
                
                <div id='notes-nav-video' onClick={(ev) => {onSwitchFilter('NoteVideo')}} className={"note-item-nav "+((typeFilter === 'NoteVideo') ? "chosen-filter" : "")}  style={{ display: 'grid', width: '48px', height: '48px', borderRadius: '50%' }}>
                    <div style={{ placeSelf: 'center' }} className="fa-brands fa-youtube "></div>
                </div>
                <label className={"note-item-label "+((typeFilter === 'NoteVideo') ? "chosen-filter" : "")} onClick={(ev) => {onSwitchFilter('NoteVideo')}} htmlFor='notes-nav-video' style={{ paddingLeft: '5px', paddingBlock: '16px', width: '100%', height: '48px' }}>Video</label>
                
                <div id='notes-nav-image' onClick={(ev) => {onSwitchFilter('NoteImg')}} className={"note-item-nav "+((typeFilter === 'NoteImg') ? "chosen-filter" : "")} style={{ display: 'grid', width: '48px', height: '48px', borderRadius: '50%' }}>
                    <div style={{ placeSelf: 'center' }} className="fa-solid fa-image "></div>
                </div>
                <label className={"note-item-label "+((typeFilter === 'NoteImg') ? "chosen-filter" : "")} onClick={(ev) => {onSwitchFilter('NoteImg')}} htmlFor='notes-nav-image' style={{ paddingLeft: '5px', paddingBlock: '16px', width: '100%', height: '48px' }}>Image</label>
                
                <div id='notes-nav-list' onClick={(ev) => {onSwitchFilter('NoteTodos')}} className={"note-item-nav "+ (( typeFilter === 'NoteTodos') ? "chosen-filter" : "")} style={{ display: 'grid', width: '48px', height: '48px', borderRadius: '50%' }}>
                    <div style={{ placeSelf: 'center' }} className="fa-solid fa-list "></div>
                </div>
                <label className={"note-item-label "+((typeFilter === 'NoteTodos') ? "chosen-filter" : "")} onClick={(ev) => {onSwitchFilter('NoteTodos')}} htmlFor='notes-nav-list' style={{ paddingLeft: '5px', paddingBlock: '16px', width: '100%', height: '48px' }}>List</label>
            </div>
            
            <div className="filter-search-notes">
                <form className="filter-search-notes-form" onSubmit={onSubmit}>
                    <button name="search-btn-notes" className="fa-solid fa-magnifying-glass fa-lg"></button>
                    <input onChange={(ev) => {
                        onSetFilter({txt:ev.target.value})
                    }} name="search-input-notes" className="search-txt-box-notes" type='text' placeholder='Search Notes'></input>
                </form>
            </div>
        </div>)
}