import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.password !== formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    dispatch(
      signupUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="container mt-5">
      <div
        className="card p-4 mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="mb-4 text-center">
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

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

          <input
            className="form-control mb-3"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>

        {error && (
          <p className="text-danger mt-3">
            {JSON.stringify(error)}
          </p>
        )}

        <div className="mt-3 text-center">
          <Link to="/">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}