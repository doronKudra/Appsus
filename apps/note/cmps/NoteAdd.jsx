const { useState, useRef, useEffect } = React

export function NoteAdd({ onAddNote }) {
	const [isEdit, setIsEdit] = useState(false)
	const [title, setTitle] = useState('')
	const [txt, setTxt] = useState('')
	const wrapperRef = useRef(null)

	useEffect(() => {
		if (!isEdit) return

		function handlePointerDown(ev) {
			if (wrapperRef.current && !wrapperRef.current.contains(ev.target)) {
				closeEditor()
			}
		}
		function handleKeyDown(ev) {
			if (ev.key === 'Escape') closeEditor()
		}

		document.addEventListener('pointerdown', handlePointerDown, true)
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown, true)
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isEdit, title, txt])

	function openEditor() {
		setIsEdit(true)
	}

	function closeEditor() {
		const isEmpty = !title.trim() && !txt.trim()
		if (!isEmpty && typeof onAddNote === 'function') {
			onAddNote({ type: 'NoteTxt', isPinned: false, info: { title, txt, tags: {} }, style: {}, createdAt: Date.now() })
		}
		setTitle('')
		setTxt('')
		setIsEdit(false)
	}

	function onSubmit(ev) {
		ev.preventDefault()
		closeEditor()
	}

	if (!isEdit) {
		return (
			<div className="new-note" onClick={openEditor}>
				<div className="text-box-cosmetic">Write a note...</div>
			</div>
		)
	}

	return (
		<form ref={wrapperRef} className="new-note new-note-open" onSubmit={onSubmit}>
			<input
				className="note-name-edit"
				placeholder="Name"
				value={title}
				onChange={(ev) => setTitle(ev.target.value)}
			/>
			<input
				className="note-text-edit"
				autoFocus
				placeholder="Write a note..."
				value={txt}
				onChange={(ev) => setTxt(ev.target.value)}
			/>
			<button type="submit" style={{ display: 'none' }}>save</button>
		</form>
	)
}