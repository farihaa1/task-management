import { useContext, useState } from "react";
import useAxiosPublic from "../../useAxiosPublic";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const AddTask = ({ onClose }) => {
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  console.log(user);

  const handleAddTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;

    if (title.length < 5) {
      setError("Title must be more than 5 characters");
      return;
    }
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    const tasks = {
      title: title,
      description: description,
      category: category,
      date: formattedDate,
      email: user.email,
    };

    axiosPublic
      .post("/tasks", tasks)
      .then((res) => {
        onClose();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successesfully added a task",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        setError("Something went wrong! Please try again.");
      });
  };

  return (
    <div>
      <form onSubmit={handleAddTask} className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            required
            className="input"
            placeholder="Learn 10 New Topics On JavaScript"
          />
          {error && <p className="text-red-400">{error}</p>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="input"
            rows={5}
            placeholder="Detailed description of the task"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="category">Category</label>
          <select className="input" name="category" required>
            <option>Select</option>
            <option value="doing">Doing</option>
            <option value="progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2  cursor-pointer"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
