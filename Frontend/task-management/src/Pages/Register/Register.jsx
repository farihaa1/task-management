import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import useAxiosPublic from "../../useAxiosPublic";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, loading, setLoading, updateUserProfile, setUser } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const password = form.password.value;
    console.log(email, password, name);

    createUser(email, password).then((res) => {
      console.log(res);
      console.log(name, email);
      updateUserProfile(name, null).then(() => {
        const userInfo = {
          name: name,
          email: email,
          date: new Date(),
        };
        setUser(userInfo)
        console.log('usrInfo', userInfo)
        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          })
          .catch((error) => {
            setLoading(false);
          });
      });
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <div className="border border-gray-400 w-sm mx-auto sm:px-6 md:px-10 py-8">
        <h2 className="text-3xl md:text-5xl text-center font-bold my-4 ">
         Register
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl min-wy
           mx-auto flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Write Your Name"
            />
          </div>
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
        <div className="text-center my-4">
        <small className="capitalize">
            Already Have an account?
            <Link to="/login" className="text-blue-500 ml-1">
              Sign In now
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
