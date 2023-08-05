import { useEffect, useState } from "react";
import UserChart from "../components/charts/UserChart";
import axios from "axios";

const Dashboard = () => {

  const stats = [
    { Name: "Users", number: `12` },
    { Name: "Post", number: "123" },
    { Name: "Likes", number: "200" },
    { Name: "Views", number: "245" },
  ];

  const [blog, setBlog] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        setBlog(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
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
        <div className="mt-20 h-[400px] ">
          <UserChart />
          <div className="text-white">
            <h2>Latest Posts</h2>
            <div className="text-white bg-cyan-200 text-xl h-[500px] w-[500px]">
              <div className="h-[400px]">
                <img src={`http://localhost:3001/${blog.length > 0 && blog[blog.length - 1].image}`} alt="image" className="w-full h-full" />
              </div>
              <div>
                {blog.length > 0 && blog[blog.length - 1].title}
              </div>
              <div>
                {blog.length > 0 && blog[blog.length - 1].user}
              </div>
              <div className="line-clamp-2">
                {blog.length > 0 && blog[blog.length - 1].description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
