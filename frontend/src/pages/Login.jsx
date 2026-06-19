import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
      })
    );
  };

  useEffect(() => {
  if (isLoggedIn) {
    const isAdmin = JSON.parse(
      localStorage.getItem("is_admin")
    );

    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  }
}, [isLoggedIn, navigate]);

  return (
    <div className="container mt-5">
      <div
        className="card p-4 mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="mb-4 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="text-danger mt-3">
            {JSON.stringify(error)}
          </p>
        )}

        <div className="mt-3 text-center">
          <Link to="/register">
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}