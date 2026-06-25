import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../components/admin/UserTable";
import EditUserModal from "../components/admin/EditUserModal";
import { toast } from "react-toastify";
import DeleteConfirmModal from "../components/admin/DeleteConfirmModal";
import CreateUserModal from "../components/admin/CreateUserModal";
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
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [userToDelete, setUserToDelete] =
    useState(null);
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
    dispatch(fetchAdminUsers(""));
  }, [dispatch]);


  useEffect(() => {
    window.history.pushState(
      null,
      "",
      window.location.href
    );

    const handleBack = () => {
      window.history.pushState(
        null,
        "",
        window.location.href
      );
    };

    window.addEventListener(
      "popstate",
      handleBack
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handleBack
      );
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("is_admin");

    dispatch(logout());
    toast.success("Logged out successfully");

    navigate("/", {
      replace: true,
    });
  };

  const handleSave = async () => {
    const result = await dispatch(
      updateAdminUser({
        id: selectedUser.id,
        userData: editForm,
      })
    );

    if (!result.error) {
      toast.success(
        "User updated successfully"
      );

      setSelectedUser(null);

      dispatch(fetchAdminUsers(search));
    }
  };


  const handleCreateUser = async () => {
    const result = await dispatch(
      createAdminUser(newUser)
    );

    if (!result.error) {
      toast.success(
        "User created successfully"
      );

      setNewUser({
        username: "",
        email: "",
        password: "",
      });

      setShowCreateForm(false);

      dispatch(fetchAdminUsers(search));
    }
  };

  const handleSearch = () => {
    dispatch(fetchAdminUsers(search));
  };

  const handleClearSearch = () => {
    setSearch("");
    dispatch(fetchAdminUsers(""));
  };

  const handleDelete = async (id) => {
    const result = await dispatch(
      deleteAdminUser(id)
    );

    if (!result.error) {
      toast.success(
        "User deleted successfully"
      );

      setShowDeleteModal(false);
      setUserToDelete(null);
    } else {
      toast.error(
        "Failed to delete user"
      );
    }
  };

  if (loading) return <h2>Loading...</h2>;


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
      <div className="row mb-3 align-items-center">

        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>

        <div className="col-md-3 mb-2">
          <button
            className="btn btn-primary me-2"
            onClick={handleSearch}
          >
            Search
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={handleClearSearch}
          >
            Clear
          </button>
        </div>

        <div className="col-md-3 text-md-end">
          <button
            className="btn btn-success"
            onClick={() =>
              setShowCreateForm(true)
            }
          >
            + Add User
          </button>
        </div>

      </div>

      <CreateUserModal
        show={showCreateForm}
        newUser={newUser}
        setNewUser={setNewUser}
        handleCreateUser={handleCreateUser}
        handleClose={() => {
          setNewUser({
            username: "",
            email: "",
            password: "",
          });
          setShowCreateForm(false)

        }}
      />

      {/* User Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body">

          <UserTable
            users={users}
            onEdit={(user) => {
              setSelectedUser(user);

              setEditForm({
                username: user.username,
                email: user.email,
                is_active: user.is_active,
              });
            }}
            onToggleStatus={(user) =>
              dispatch(
                toggleUserStatus({
                  id: user.id,
                  is_active: user.is_active,
                })
              )
            }
            onDelete={(user) => {
              setUserToDelete(user);
              setShowDeleteModal(true);
            }}
          />

        </div>
      </div>

      <EditUserModal
        selectedUser={selectedUser}
        editForm={editForm}
        setEditForm={setEditForm}
        handleSave={handleSave}
        handleClose={() =>
          setSelectedUser(null)

        }
      />
      <DeleteConfirmModal
        show={showDeleteModal}
        user={userToDelete}
        handleDelete={handleDelete}
        handleClose={() => {
          setShowDeleteModal(false);
          setUserToDelete(null);
        }}
      />
    </div>
  );
}