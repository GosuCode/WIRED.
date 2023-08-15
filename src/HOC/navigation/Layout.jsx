import { useEffect, useState } from "react";
import Navbar from "../../components/Navigation/Navbar/Navbar";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "../../helpers/AuthContext";


const Layout = ({ children }) => {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    email: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/user", {
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
            email: response.data.email,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);
  return (
    <AuthContext.Provider
      value={{ authState, setAuthState }}
    >
      <div className="flex px-10">
        <div className={`w-1/6 ${!authState.status && 'hidden'}`}>
          <Sidebar />
        </div>
        <div className="w-5/6">
          <div className={`flex justify-center ${!authState.status && 'hidden'}`}>
            <Navbar />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
