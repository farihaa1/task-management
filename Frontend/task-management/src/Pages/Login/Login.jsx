import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../useAxiosPublic";
import googleIcon from "../../assets/google.webp";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, handleGoogleLogin, user, setUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const handleGoogleSignIn = () => {
    handleGoogleLogin().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      setUser(userInfo);
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res);
        navigate("/");
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const pattern = /(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/;

    if (!pattern.test(password)) {
      return Swal.fire({
        title:
          "Password must contain at least one lowercase letter, one number, and one special character.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }

    if (!email || !password) {
      return Swal.fire({
        title: "Please Enter Your Email and Password",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }

    signIn(email, password).then((result) => {
      const user = result.user;
      Swal.fire({
        title: "User signed in Successfully.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate("/");
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <div className="border border-gray-400 w-sm mx-auto sm:px-8 md:px-10 py-8">
        <h2 className="text-3xl md:text-5xl text-center font-bold my-4 ">
          Login
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl min-wy
         mx-auto flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="email"> Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Write Your Email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password"> Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Enter Your Password"
            />
          </div>
          <div className="flex justify-center items-center">
            <input
              type="submit"
              className="bg-black text-white px-4 py-2 font-semibold"
              placeholder="Write Your Email"
            />
          </div>
        </form>
        <p className="px-6 flex items-center justify-center pt-3">
          <small>
            New Here?
            <Link className="text-blue-500 ml-2" to="/register">
              Create an account
            </Link>
          </small>
        </p>
        <div className="flex justify-center mt-4 cursor-pointer">
          <button
            onClick={handleGoogleSignIn}
            className="bg-gray-300 cursor-pointer px-4 py-2 flex justify-center items-center"
          >
            <img className="w-8 h-8 object-cover" src={googleIcon} alt="" />
            <h3>Google</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
