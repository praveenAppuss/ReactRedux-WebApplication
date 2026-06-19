import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers } from "../features/admin/adminThunks";

export default function AdminDashboard() {

  const dispatch = useDispatch();

  const {
    users,
    loading,
    error,
  } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

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
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}