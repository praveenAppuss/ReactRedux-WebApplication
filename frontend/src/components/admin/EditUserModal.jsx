import { useSelector, useDispatch } from "react-redux";
import { clearAdminError } from "../../features/admin/adminSlice";


export default function EditUserModal({
    selectedUser,
    editForm,
    setEditForm,
    handleSave,
    handleClose,
}) {
    const dispatch = useDispatch();
    const { error } = useSelector(
        (state) => state.admin
    );

    if (!selectedUser) return null;

    return (
        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor:
                    "rgba(0,0,0,0.5)",
            }}
        >
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            Edit User
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleClose}
                        ></button>
                    </div>

                    <div className="modal-body">

                        <div className="mb-3">
                            <label className="form-label">
                                Username
                            </label>

                            <input
                                className="form-control"
                                value={editForm.username}
                                onChange={(e) => {
                                    dispatch(clearAdminError());
                                    setEditForm({
                                        ...editForm,
                                        username:
                                            e.target.value,
                                    })
                                }}
                            />
                            {
                                error?.username && (
                                    <div className="text-danger mt-1">
                                        {error.username[0]}
                                    </div>
                                )
                            }
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Email
                            </label>

                            <input
                                className="form-control"
                                value={editForm.email}
                                onChange={(e) => {
                                    dispatch(clearAdminError());
                                    setEditForm({
                                        ...editForm,
                                        email:
                                            e.target.value,
                                    })
                                }}
                            />
                            {
                                error?.email && (
                                    <div className="text-danger mt-1">
                                        {error.email[0]}
                                    </div>
                                )
                            }
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={
                                    editForm.is_active
                                }
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        is_active:
                                            e.target.checked,
                                    })
                                }
                            />

                            <label className="form-check-label">
                                Active User
                            </label>
                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-success"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}