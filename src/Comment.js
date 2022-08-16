
function Comment({ activeComent, onUpdateComent }) {

    const onEditField = (key, value) => {
        onUpdateComent({
            ...activeComent,
            [key]: value,
            lastModified: Date.now()
        })
    }

    if (!activeComent) return <div className="no-active-comment"> No Comment Selected</div>

    return (
        <div className='comments'>
            <div className='comment-edit'>
                <span>Write Coments:</span>
                <input type="text" id="user" value={activeComent.title} autoFocus onChange={(e) => onEditField("title", e.target.value)} />
                <textarea id="body" placeholder='Write your comment here...' value={activeComent.body} onChange={(e) => onEditField("body", e.target.value)} />
            </div>

        </div>
    )
}

export default Comment