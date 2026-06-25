export default function UserTable({
  users,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  return (
    <table className="table table-hover align-middle">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Status</th>
          <th width="300">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>

            <td>{user.username}</td>

            <td>{user.email}</td>

            <td>
              <span
                className={`badge ${
                  user.is_active
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {user.is_active
                  ? "Active"
                  : "Blocked"}
              </span>
            </td>

            <td>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onEdit(user)}
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
                  onToggleStatus(user)
                }
              >
                {user.is_active
                  ? "Block"
                  : "Unblock"}
              </button>

              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => onDelete(user)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}