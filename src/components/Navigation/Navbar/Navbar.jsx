import { Link } from "react-router-dom";
import react from "../../../assets/react.svg";
import { useContext } from "react";
import { AuthContext } from "../../../helpers/AuthContext";

const Navbar = () => {
  const { authState } = useContext(AuthContext)
  return (
    <nav className="flex mt-2 z-10 fixed items-center p-3 border-2 rounded-2xl border-blue-200 w-9/12 justify-between bg-[rgba(0,0,0,0.6)] backdrop-blur-sm text-white">
      <Link to={'/'} className="font-semibold text-lg">Dashboard</Link>
      <div className="flex">
        {authState.status && (
          <div className="flex items-center">
            <Link to={'/createPost'} className='border px-2 py-1 border-cyan-100 rounded-md mr-2 grid items-center md:px-[15px] md:h-9 font-bold text-white hover:bg-gray-900'>
              Create Post
            </Link>
            {/* <img src={user} alt="" className='h-full absolute rounded-full m-1 p-2' /> */}
            <img src={react} alt="profile-pic" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
