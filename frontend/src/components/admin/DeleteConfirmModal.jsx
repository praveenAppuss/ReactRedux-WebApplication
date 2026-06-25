export default function DeleteConfirmModal({
  show,
  user,
  handleDelete,
  handleClose,
}) {
  if (!show || !user) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title text-danger">
              Delete User
            </h5>

            <button
              className="btn-close"
              onClick={handleClose}
            />
          </div>

          <div className="modal-body">
            <p>
              Are you sure you want to delete
              <strong> {user.username} </strong>?
            </p>

            <p className="text-muted mb-0">
              This action cannot be undone.
            </p>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={() =>
                handleDelete(user.id)
              }
            >
              Delete User
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}