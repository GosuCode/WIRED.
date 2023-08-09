import { useState, useEffect } from "react";
// import { MdDeleteForever } from 'react-icons/md'
import moment from 'moment'
import axios from 'axios'
import UserSkeleton from "../components/UI/UserSkeleton";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await axios.get("http://localhost:3001/auth/listOfUsers");
      setUsers(response.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const formatCreatedAt = (timestamp) => {
    return moment(timestamp).format("MMMM Do YYYY");
  };
  return (
    <>
      <div className="pt-20 grid px-24 fixed w-4/5 place-items-center">
        <div className="w-full flex justify-between">
          <h1 className="text-white text-2xl font-semibold font-mono p-4 text-center">List of Users</h1>
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            className="w-[50%] rounded-md font-mono bg-black h-10 px-4 py-2 mt-3 text-white border-2 border-cyan-200 focus:outline-none"
            placeholder="Search users.."
          />
        </div>
        <div className="h-[600px] w-full place-items-center px-14 pb-20 border-2 rounded-md border-cyan-200 p-2 overflow-y-scroll scrollbar">
          <div className="text-white">
            <div className="flex w-[60%] px-10 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm rounded-xl py-2 justify-between text-lg fixed">
              <span>User Name</span>
              <span>Email</span>
              <span>Joined At</span>
            </div>
            {
              !loading ? (
                <div className="pt-10">
                  {users
                    .filter((val) => {
                      return (
                        search.toLowerCase() === "" ||
                        val.username.toLowerCase().includes(search.toLowerCase())
                      );
                    })
                    .map((val, i) => {
                      return (
                        <div key={i}>
                          <div className="flex justify-between pt-4">
                            <div className="flex">
                              <span className="grid place-items-center text-2xl text-white font-semibold h-10 w-10 rounded-full m-1 p-1 capitalize bg-purple-600">
                                {val.username.charAt(0)}
                              </span>
                              <div className="capitalize text-xl pt-2">{val.username}</div>
                            </div>
                            <div className="grid place-items-center">
                              <span>
                                {val.email}
                              </span>
                            </div>
                            <span className='pt-2'>{formatCreatedAt(val.createdAt)}</span>
                          </div>
                          <hr />
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div>
                  <UserSkeleton />
                  <UserSkeleton />
                  <UserSkeleton />
                  <UserSkeleton />
                  <UserSkeleton />
                  <UserSkeleton />
                  <UserSkeleton />
                  <UserSkeleton />
                </div>
              )
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default Users
