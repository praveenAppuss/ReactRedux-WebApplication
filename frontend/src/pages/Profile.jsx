import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import Navbar from "../components/Navbar";
import userImage from "../assets/user.png";
import { fetchProfile } from "../features/auth/authThunks";
import AxiosInstance from "../api/AxiosInstance";
import "./Profile.css";

export default function Profile() {
  const dispatch = useDispatch();

  const { profile, loading, error } = useSelector(
    (state) => state.auth
  );

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      await AxiosInstance.patch(
        "users/profile/",
        formData
      );

      dispatch(fetchProfile());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <>
      <Navbar />

      {profile && (
        <div className="profile-container">
          <div className="profile-card">
            <h2>User Profile</h2>

            <div className="profile-image-wrapper">
              <img
                src={profile.profile_image || userImage}
                alt="Profile"
                className="profile-image"
              />

              <label
                htmlFor="profile-upload"
                className="upload-icon"
              >
                <FaCamera />
              </label>

              <input
                id="profile-upload"
                type="file"
                className="hidden-input"
                onChange={handleImageChange}
              />
            </div>

            <div className="profile-info">
              <div className="profile-row">
                <span className="profile-label">
                  Username
                </span>

                <span className="profile-value">
                  {profile.username}
                </span>
              </div>

              <div className="profile-row">
                <span className="profile-label">
                  Email
                </span>

                <span className="profile-value">
                  {profile.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}