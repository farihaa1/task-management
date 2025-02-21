import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
 
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to sign out?",
      icon: "warning",
      width: 400,
      padding: 5,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout().then(() =>
          Swal.fire("Logged Out", "You have been logged out", "success")
        );
      }
    });
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-md">
      <h2 className="text-xl font-bold">Task Management</h2>
      <div>
        {user ? (
          <>
            <h4
              className="bg-black text-white px-3 py-1 hover:bg-gray-900 hover:shadow-xl"
              onClick={handleLogout}
            >
              Log out
            </h4>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-black text-white px-3 py-1 hover:bg-gray-900 hover:shadow-xl"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
