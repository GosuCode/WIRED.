import { Link } from "react-router-dom";
import react from "../../../assets/react.svg";

const Navbar = () => {
  return (
    <nav className="flex mt-2 fixed items-center p-3 border-2 rounded-2xl border-blue-200 w-9/12 justify-between bg-[rgba(0,0,0,0.6)] backdrop-blur-sm text-white">
      <div className="font-bold">Dashboard</div>
      <div className="flex">

        <Link
          to={"/createPost"}
          className="border px-2 py-1 border-cyan-200 rounded-md mr-2 grid items-center md:px-[15px] md:h-8 font-bold text-cyan-100 hover:bg-gray-800 hover:text-white"
        >
          Log In
        </Link>
        <Link
          to={"/createPost"}
          className="border px-2 py-1 border-cyan-200 rounded-md mr-2 grid items-center md:px-[15px] md:h-8 font-bold text-cyan-100 hover:bg-gray-800 hover:text-white"
        >
          Create Post
        </Link>
        <img src={react} alt="profile-pic" />
      </div>
    </nav>
  );
};

export default Navbar;
