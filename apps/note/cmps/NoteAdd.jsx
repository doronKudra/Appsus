const { useState, useRef, useEffect } = React

export function NoteAdd({ onAddNote }) {
	const [isEdit, setIsEdit] = useState(false)
	const [title, setTitle] = useState('')
	const [txt, setTxt] = useState('')
	const [imgSrc, setImgSrc] = useState('')
	const [type, setType] = useState('NoteTxt')
	const wrapperRef = useRef(null)
	var note = { type, isPinned: false, info: { title, txt, tags: {} }, style: {}, createdAt: Date.now() }
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
		setImgSrc('')
		setIsEdit(true)
	}

	function compressImage(dataUrl) {
		const img = new Image()
		img.onload = () => {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')

			const maxWidth = 240
			let width = img.width
			let height = img.height

			if (width > height && width > maxWidth) {
				height *= maxWidth / width
				width = maxWidth
			}

			canvas.width = width
			canvas.height = height
			ctx.drawImage(img, 0, 0, width, height)

			note.info.imgSrc = canvas.toDataURL('image/jpeg', 0.8)
			setImgSrc(note.info.imgSrc) // optional: show compressed preview
		}
		img.src = dataUrl
	}

	function closeEditor() {
		const isEmpty = !title.trim() && !txt.trim() && !imgSrc
		if (!isEmpty && typeof onAddNote === 'function') {
			note.type = type
			compressImage(imgSrc)
			onAddNote(note)
		}
		setType('NoteTxt')
		setImgSrc('')
		setTitle('')
		setTxt('')
		setIsEdit(false)
		note.info.imgSrc = ''
	}

	function onSubmit(ev) {
		ev.preventDefault()
		closeEditor()
	}

	function onAddSpecialNote(ev) {
		ev.stopPropagation()
	}

	function getImage(ev) {
		const files = ev.target.files
		if (files && files.length) {
			const reader = new FileReader()
			reader.onload = (e) => {
				setImgSrc(e.target.result) // store string, not Image object
				setIsEdit(true)
				setType('NoteImg')
			}
			reader.readAsDataURL(files[0])
		} else {
			console.error("Please select an image file.")
		}
	}

	if (!isEdit) {
		return (
			<div className="new-note" onClick={openEditor}>
				<div className="text-box-cosmetic">Write a note...</div>
				<div className="note-options">
					<input onChange={getImage} onClick={onAddSpecialNote} type="file" id="imageInput" accept="image/*" />
				</div>
			</div>
		)
	}

	return (
		<form ref={wrapperRef} className="new-note new-note-open" onSubmit={onSubmit}>
			{imgSrc && (
				<div className="note-image-preview">
					<img src={imgSrc} alt="Note preview" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '8px' }} />
				</div>
			)}
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