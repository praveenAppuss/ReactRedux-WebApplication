import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { fetchProfile } from "../features/auth/authThunks";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h1>Welcome Home</h1>
      </div>
    </>
  );
}