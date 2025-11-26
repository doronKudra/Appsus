const { useState, useRef, useEffect } = React;

export function NoteAdd({ onAddNote }) {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [txt, setTxt] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!isEdit) return;

    function handlePointerDown(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        closeEditor();
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') closeEditor();
    }

    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEdit, title, txt]);

  function openEditor() {
    setIsEdit(true);
  }

  function closeEditor() {
    const isEmpty = !title.trim() && !txt.trim();
    if (!isEmpty && typeof onAddNote === 'function') {
      onAddNote({ type: 'NoteTxt',isPinned: false,info: {title,txt,tags: {}},style: {},createdAt: Date.now() });
    }
    setTitle('');
    setTxt('');
    setIsEdit(false);
  }

  function onSubmit(e) {
    e.preventDefault();
    closeEditor();
  }

  if (!isEdit) {
    return (
      <div className="new-note" onClick={openEditor}>
        <div className="text-box-cosmetic">Write a note...</div>
      </div>
    );
  }

  return (
    <form ref={wrapperRef} className="new-note new-note-open" onSubmit={onSubmit}>
      <input
        autoFocus
        placeholder="Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Write a note..."
        value={txt}
        onChange={(e) => setTxt(e.target.value)}
      />
      {/* hidden submit so Enter will save */}
      <button type="submit" style={{ display: 'none' }}>save</button>
    </form>
  );
}