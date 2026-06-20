import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminUsers,
  toggleUserStatus,
  updateAdminUser,
  createAdminUser,
  deleteAdminUser,
} from "../features/admin/adminThunks";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export default function AdminDashboard() {
  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [editForm, setEditForm] = useState({
    email: "",
    is_active: true,
  });

  const {
    users,
    loading,
    error,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminUsers(search));
  }, [dispatch, search]);

  const handleLogout = () => {
    localStorage.clear();

    dispatch(logout());

    navigate("/");
  };

  const handleSave = async () => {
    await dispatch(
      updateAdminUser({
        id: selectedUser.id,
        userData: editForm,
      })
    );


    setSelectedUser(null);

    dispatch(fetchAdminUsers(search));
  };
  const handleCreateUser = async () => {
    const result = await dispatch(
      createAdminUser(newUser)
    );

    if (!result.error) {
      setNewUser({
        username: "",
        email: "",
        password: "",
      });

      setShowCreateForm(false);

      dispatch(fetchAdminUsers(search));
    }
  };
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      dispatch(deleteAdminUser(id));
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (error) {
    return (
      <h2>
        {typeof error === "string"
          ? error
          : JSON.stringify(error)}
      </h2>
    );
  }

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            User Management Dashboard
          </h2>
          <p className="text-muted mb-0">
            Manage users and permissions
          </p>
        </div>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6>Total Users</h6>
              <h2>{users.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6>Active Users</h6>
              <h2>
                {
                  users.filter(
                    (user) => user.is_active
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h6>Blocked Users</h6>
              <h2>
                {
                  users.filter(
                    (user) => !user.is_active
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Add User */}
      <div className="row mb-3">
        <div className="col-md-8 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by username or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="col-md-4 text-md-end">
          <button
            className="btn btn-success"
            onClick={() =>
              setShowCreateForm(!showCreateForm)
            }
          >
            + Add User
          </button>
        </div>
      </div>

      {/* Create User Form */}
      {showCreateForm && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h4>Create User</h4>

            <input
              className="form-control mb-2"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  username: e.target.value,
                })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  password: e.target.value,
                })
              }
            />

            <button
              className="btn btn-primary"
              onClick={handleCreateUser}
            >
              Create User
            </button>
          </div>
        </div>
      )}

      {/* User Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">

          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th width="200">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>

                  <td>{user.username}</td>

                  <td>{user.email}</td>

                  <td>
                    {user.is_active ? (
                      <span className="badge bg-success">
                        Active
                      </span>
                    ) : (
                      <span className="badge bg-danger">
                        Blocked
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setSelectedUser(user);

                        setEditForm({
                          email: user.email,
                          is_active: user.is_active,
                        });
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className={
                        user.is_active
                          ? "btn btn-warning btn-sm ms-2"
                          : "btn btn-success btn-sm ms-2"
                      }
                      onClick={() =>
                        dispatch(
                          toggleUserStatus({
                            id: user.id,
                            is_active: user.is_active,
                          })
                        )
                      }
                    >
                      {user.is_active
                        ? "Block"
                        : "Unblock"}
                    </button>

                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() =>
                        handleDelete(user.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

      {/* Edit User */}
      {selectedUser && (
        <div className="card mt-4 shadow border-0">
          <div className="card-body">

            <h4>Edit User</h4>

            <div className="mb-3">
              <label className="form-label">
                Username
              </label>

              <input
                className="form-control"
                value={selectedUser.username}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                className="form-control"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={editForm.is_active}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    is_active: e.target.checked,
                  })
                }
              />

              <label className="form-check-label">
                Active User
              </label>
            </div>

            <button
              className="btn btn-success me-2"
              onClick={handleSave}
            >
              Save Changes
            </button>

            <button
              className="btn btn-secondary"
              onClick={() =>
                setSelectedUser(null)
              }
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </div>
  );
}