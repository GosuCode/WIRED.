import { Link } from "react-router-dom";
import react from "../../../assets/react.svg";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { BsPostcard } from "react-icons/bs";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiTodoLine } from "react-icons/ri";
import { BiLogOut } from 'react-icons/bi'
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../helpers/AuthContext";
import axios from 'axios'

const Sidebar = () => {

  const { authState, setAuthState } = useContext(AuthContext)

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    setTimeout(() => {
      window.location = "/landingPage"
    }, 1000)
  }

  useEffect(() => {
    axios.get("http://localhost:3001/auth/user", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const sideBarData = [
    { name: "Dashboard", path: "/", icon: <LuLayoutDashboard /> },
    { name: "Posts", path: "/posts", icon: <BsPostcard /> },
    { name: "Users", path: "/users", icon: <LuUsers /> },
    { name: "Analytics", path: "/analytics", icon: <TbBrandGoogleAnalytics /> },
    { name: "ToDo", path: "/todoList", icon: <RiTodoLine /> },
  ];
  return (
    <div className="flex-col text-white w-1/6 h-[100%] fixed">
      <div className="w-full grid place-items-center mt-4">
        <img src={react} alt="" />
      </div>
      <div className="mt-8 text-2xl font-mono grid place-items-center w-11/12 h-10 capitalize cursor-pointer">
        {authState.username}
      </div>
      {sideBarData.map((val, key) => {
        return (
          <div key={key} className="mt-8">
            <Link
              to={val.path}
              className="group flex mt-5 lg:w-11/12 h-10 border-2 md:hover:border-cyan-100 rounded-md active:bg-gray-800"
            >
              <div
                className={`grid items-center px-2 text-2xl rounded-md shadow-md shadow-cyan-200
                        transition ease-in-out delay-75 group-hover:-translate-y-1 group-hover:scale-100 duration-300`}
              >
                {val.icon}
              </div>
              <div className="lg:grid hidden md:grid items-center ml-4 lg:text-lg">
                {val.name}
              </div>
            </Link>
          </div>
        );
      })}
      <div className="group md:mt-32 flex lg:w-11/12 h-10 cursor-pointer border-2 md:hover:border-cyan-100 rounded-md active:bg-gray-800">
        <div
          className={`grid items-center px-2 text-2xl rounded-md shadow-md shadow-cyan-200
                        transition ease-in-out delay-75 group-hover:-translate-y-1 group-hover:scale-100 duration-300`}>
          <BiLogOut />
        </div>
        <div onClick={logout} className="lg:grid hidden md:grid items-center ml-4 lg:text-lg">
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
