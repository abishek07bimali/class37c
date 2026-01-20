import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../services/api";
import { getToken } from "../../protected/Auth";

const Headers = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await getMe();
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem("token-37c");
        setUser(null);
      }
    };
    if (getToken()) {
      fetchMe();
    }
  }, []);

  const handleLogout = () => {
    const confirmDelete = window.confirm("Are you sure you want to logout this user?");
    if (!confirmDelete) return;
    localStorage.removeItem("token-37c");

    setUser(null);
    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      <Link className="p-2 bg-red-400 m-2 rounded-lg text-white" to="/">
        home
      </Link>

      <Link className="p-2 bg-red-400 m-2 rounded-lg text-white" to="/about">
        about
      </Link>

      {!user ? (
        <>
          <Link
            to="/login"
            className="p-2 bg-red-400 m-2 rounded-lg text-white hover:bg-red-600"
          >
            login
          </Link>

          <Link
            to="/register"
            className="p-2 bg-red-400 m-2 rounded-lg text-white hover:bg-red-600"
          >
            register
          </Link>
        </>
      ) : (
        <>
          <span className="p-2 bg-green-500 m-2 rounded-lg text-white">
            {user.username}
          </span>

          <button
            onClick={handleLogout}
            className="p-2 bg-gray-700 m-2 rounded-lg text-white hover:bg-gray-900"
          >
            logout
          </button>
        </>
      )}
    </div>
  );
};

export default Headers;
