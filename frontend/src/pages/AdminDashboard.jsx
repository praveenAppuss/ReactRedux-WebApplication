import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers,toggleUserStatus } from "../features/admin/adminThunks";


export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const {
    users,
    loading,
    error,
  } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAdminUsers(search));
  }, [dispatch, search]);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <hr />

      <table className="table table-striped table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>

              <td>
                {user.is_active
                  ? "Active"
                  : "Blocked"}
              </td>


              <td>
                <button className="btn btn-sm btn-primary">
                  Edit
                </button>
                <button
                  className={
                    user.is_active
                      ? "btn btn-danger btn-sm ms-2"
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}