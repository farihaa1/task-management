import { useContext } from "react";
import Login from "../Login/Login";
import { AuthContext } from "../../Providers/AuthProvider";
import TaskPage from "../TaskPage/TaskPage";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return <div className="">{user ? <TaskPage /> : <Login></Login>}</div>;
};

export default Home;
