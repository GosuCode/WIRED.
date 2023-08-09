import { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment'

const Dashboard = () => {
  const [blog, setBlog] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/auth/listOfUsers");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/posts");
      setBlog(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchUsers();
  }, [])

  const formatCreatedAt = (timestamp) => {
    return moment(timestamp).format("MMMM Do YYYY");
  };


  const stats = [
    { Name: "Users", number: users.length },
    { Name: "Post", number: blog.length },
    { Name: "Likes", number: blog.length },
    { Name: "Views", number: "245" },
  ];

  return (
    <div className="w-full grid place-items-center">
      <div className="w-[90%] mt-24">
        <div className="grid grid-cols-12 px-3 gap-3 md:gap-12 md:px-12 text-black place-items-center">
          {stats.map((val, key) => {
            return (
              <div
                key={key}
                className="bg-white col-span-3 w-full cursor-pointer rounded-lg h-20 grid place-items-center md:shadow-neon shadow-green"
              >
                <span className="font-bold">{val.Name}</span>
                <span>{val.number}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-20 grid grid-cols-2 gap-10">

          <div className="text-white border-2 h-[580px] border-cyan-200 rounded-md" >
            <h2 className="text-2xl text-center p-2">Latest Posts</h2>
            <div className="text-white h-full w-full px-6 py-4">
              <div className="h-2/4 w-full">
                <img src={`http://localhost:3001/${blog.length > 0 && blog[blog.length - 1].image}`} alt="image" className="w-full h-full" />
              </div>
              <div className="text-3xl font-semibold mt-4">
                {blog.length > 0 && blog[blog.length - 1].title}
              </div>
              <div className="text-sm text-slate-300 font-mono mt-2 capitalize flex justify-between">
                <span>
                  by {blog.length > 0 && blog[blog.length - 1].username}
                </span>
                <span>
                  {blog.length > 0 && formatCreatedAt(blog[blog.length - 1].createdAt)}
                </span>
              </div>
              <div className="line-clamp-4 font-mono mt-5">
                {blog.length > 0 && blog[blog.length - 1].description}
              </div>
            </div>
          </div>

          <div className="h-[580px] w-full px-14 pb-20 border-2 rounded-md border-cyan-200 p-2 overflow-y-scroll scrollbar">
            <h1 className="text-white text-xl p-4 text-center">List of Users</h1>
            <div className="text-white">
              <div className="flex justify-between text-lg">
                <span>User Name</span>
                <span>Joined At</span>
              </div>
              {
                users.map((val, i) => {
                  return (
                    <div key={i}>
                      <div className="flex justify-between py-2">
                        <div className="flex">
                          <span className="grid place-items-center text-2xl text-white font-semibold h-10 w-10 rounded-full m-1 p-1 capitalize bg-purple-600">
                            {val.username.charAt(0)}
                          </span>
                          <div className="capitalize text-xl pt-2">{val.username}</div>
                        </div>
                        <span className='pt-2'>{formatCreatedAt(val.createdAt)}</span>
                      </div>
                      <hr />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
