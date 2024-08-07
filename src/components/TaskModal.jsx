const TaskModal = ( { isOpen, onClose, isEdit } ) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-content">
          <h1>ASDAD</h1>
        </div>
      </div>
    </>
  )
}

export default TaskModal