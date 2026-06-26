import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
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

  const [editData, setEditData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setEditData({
        username: profile.username,
        email: profile.email,
      });
    }
  }, [profile]);

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

      toast.success("Profile image updated");

      dispatch(fetchProfile());

    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const handleDeleteImage = async () => {
    try {
      await AxiosInstance.delete(
        "users/profile/"
      );

      toast.success("Profile image removed");

      dispatch(fetchProfile());

    } catch (error) {
      toast.error("Unable to remove image");
    }
  };

  const handleSaveProfile = async () => {
    try {
      await AxiosInstance.patch(
        "users/profile/",
        {
          username: editData.username,
          email: editData.email,
        }
      );

      toast.success("Profile updated successfully");

      dispatch(fetchProfile());

    } catch (error) {

      if (error.response?.data?.username) {
        toast.error(error.response.data.username[0]);
      }
      else if (error.response?.data?.email) {
        toast.error(error.response.data.email[0]);
      }
      else {
        toast.error("Unable to update profile");
      }

    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{JSON.stringify(error)}</h2>;

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

              {profile.profile_image && (
                <button
                  type="button"
                  className="delete-image-btn"
                  onClick={handleDeleteImage}
                >
                  <FaTrash />
                </button>
              )}

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

                <input
                  type="text"
                  className="form-control profile-input"
                  value={editData.username}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      username: e.target.value,
                    })
                  }
                />
              </div>

              <div className="profile-row">
                <span className="profile-label">
                  Email
                </span>

                <input
                  type="email"
                  className="form-control profile-input"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <button
                className="btn btn-primary mt-4 w-100"
                onClick={handleSaveProfile}
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}