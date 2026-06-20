import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    const result = await dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
      })
    );

    if (!result.error) {
      toast.success("Login Successful");
    }
  };

  useEffect(() => {
    if (error) {
      if (typeof error === "object") {
        toast.error(
          error.message || "Login failed"
        );
      } else {
        toast.error(error);
      }
    }
  }, [error]);

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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "15px",
        }}
      >
        <div className="text-center mb-4">
          <h1 className="fw-bold">
            Welcome Back
          </h1>
          <p className="text-muted">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control form-control-lg"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control form-control-lg"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 btn-lg"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted">
            Don't have an account?
          </span>
          <br />

          <Link
            to="/register"
            className="text-decoration-none fw-bold"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}