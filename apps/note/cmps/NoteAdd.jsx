const { useState, useRef, useEffect } = React

export function NoteAdd({ onAddNote }) {
	const [isEdit, setIsEdit] = useState(false)
	const [title, setTitle] = useState('')
	const [txt, setTxt] = useState('')
	const [imgSrc, setImgSrc] = useState('')
	const [type, setType] = useState('NoteTxt')
	const [items, setItems] = useState([])
	const [videoLink, setVideoLink] = useState('')
	const wrapperRef = useRef(null)
	var note = { type, isPinned: false, info: { videoLink, items, title, txt, tags: {} }, style: {}, createdAt: Date.now() }
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

	function openEditor(type = 'NoteTxt') {
		setType(type)
		note.info.items = []
		setVideoLink('')
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
		console.log(note)
		const isEmpty = !title.trim() && !txt.trim() && !imgSrc && !note.info.items.length
		if (!isEmpty && typeof onAddNote === 'function') {
			note.type = type
			if (note.info.items.length) {
				note.info.items.push({ txt, isMarked: false })
				setItems(note.info.items)
			}
			compressImage(imgSrc)

			onAddNote(note)

		}
		setItems([])
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
				setImgSrc(e.target.result)
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
			<div className="new-note" onClick={(ev) => openEditor('NoteTxt')}>
				<div className="text-box-cosmetic">Write a note...</div>
				<div className="note-options">
					<div className="yt-note-btn fa-brands fa-youtube" onClick={(ev) => {
						onAddSpecialNote(ev)
						openEditor('NoteVideo')
					}}></div>
					<label onClick={onAddSpecialNote} className="upload-img-note fa-solid fa-image upload-img-note-label" htmlFor="imageInput">
						<input onChange={getImage} onClick={onAddSpecialNote} type="file" id="imageInput" accept="image/*" />
					</label>
					<div className="todo-note-btn fa-solid fa-list" onClick={(ev) => {
						onAddSpecialNote(ev)
						openEditor('NoteTodos')
					}}></div>

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
				onChange={(ev) => setTitle(ev.target.value)} />
			{(type === 'NoteTodos')
				&& (!!items.length)
				&& (items.map((item, idx) => (<input
					className={"note-text-edit edit-list-item-" + idx}
					key={"edit-list-item-" + idx}
					placeholder="To do..."
					value={item.txt}
					onChange={(ev) => {
						note.info.items[idx].txt = ev.target.value
						setItems([...note.info.items])
					}}
				/>)))}
			{(<input
				className="note-text-edit"
				autoFocus
				name="main-txt"
				placeholder={type === 'NoteTodos' ? 'To do...' : 'Write a note...'}
				value={txt}
				onChange={(ev) => setTxt(ev.target.value)}
			/>)}
			{(type === 'NoteVideo') && (<input
				autoFocus
				className="note-video-link-edit"
				placeholder="Youtube Link"
				value={videoLink}
				onChange={(ev) => setVideoLink(ev.target.value.replace('watch?v=', 'embed/'))} />)}
			{videoLink && (
				<iframe src={videoLink} width="600" height="338" frameBorder="0"></iframe>
			)}
			{(type === 'NoteTodos') &&
				(<button type="button" onClick={(ev) => {
					onAddSpecialNote(ev)
					setItems([...items, { txt, isMarked: false }])
					setTxt('')
				}}>Add Line</button>)}
			<button type="submit" style={{ display: 'none' }}>save</button>
		</form>
	)
}