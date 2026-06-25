import {
  useDispatch,
  useSelector,
} from "react-redux";

import { clearAdminError } from "../../features/admin/adminSlice";

export default function CreateUserModal({
  show,
  newUser,
  setNewUser,
  handleCreateUser,
  handleClose,
}) {
  const dispatch = useDispatch();

  const { error } = useSelector(
    (state) => state.admin
  );

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              Create User
            </h5>

            <button
              className="btn-close"
              onClick={handleClose}
            />
          </div>

          <div className="modal-body">

            {/* Username */}

            <div className="mb-3">
              <label className="form-label">
                Username
              </label>

              <input
                type="text"
                className="form-control"
                value={newUser.username}
                onChange={(e) => {
                  dispatch(clearAdminError());

                  setNewUser({
                    ...newUser,
                    username: e.target.value,
                  });
                }}
              />

              {error?.username && (
                <div className="text-danger mt-1">
                  {error.username[0]}
                </div>
              )}
            </div>

            {/* Email */}

            <div className="mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                value={newUser.email}
                onChange={(e) => {
                  dispatch(clearAdminError());

                  setNewUser({
                    ...newUser,
                    email: e.target.value,
                  });
                }}
              />

              {error?.email && (
                <div className="text-danger mt-1">
                  {error.email[0]}
                </div>
              )}
            </div>

            {/* Password */}

            <div className="mb-3">
              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                value={newUser.password}
                onChange={(e) => {
                  dispatch(clearAdminError());

                  setNewUser({
                    ...newUser,
                    password: e.target.value,
                  });
                }}
              />

              {error?.password && (
                <div className="text-danger mt-1">
                  {error.password[0]}
                </div>
              )}
            </div>

            {/* Generic Error */}

            {error &&
              typeof error === "string" && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

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
              onClick={handleCreateUser}
            >
              Create User
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}