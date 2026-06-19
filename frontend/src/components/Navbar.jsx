import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <div>
        <Link
          to="/home"
          className="navbar-brand me-3"
        >
          Home
        </Link>

        <Link
          to="/profile"
          className="text-white text-decoration-none"
        >
          Profile
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="btn btn-danger"
      >
        Logout
      </button>
    </nav>
  );
}