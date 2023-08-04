import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import SkeletonLoader from "../components/UI/SkeletonLoader";

const Posts = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [latestFirst, setLatestFirst] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await axios.get("http://localhost:3001/posts");
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const formatCreatedAt = (timestamp) => {
    return moment(timestamp).format("MMMM Do YYYY");
  };

  const handleSortClick = () => {
    // Toggle the latestFirst state to reverse the sorting order
    setLatestFirst((prevLatestFirst) => !prevLatestFirst);
  };

  // Sort the posts based on the id property
  const sortedPosts = [...blogs].sort((a, b) => {
    // Use the latestFirst state to determine the sorting order
    return latestFirst ? b.id - a.id : a.id - b.id;
  });
  return (
    <div className="py-20 px-24">
      <div className="w-full flex justify-between">
        <div className=" w-[400px]">
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md font-mono bg-black px-4 py-2 mt-3 text-white border-2 border-cyan-200 focus:outline-none"
            placeholder="Search across your blog.."
          />
        </div>
        <div className='hover:brightness-75 cursor-pointer font-semibold py-2 px-3 text-white grid place-items-center text-xl' onClick={handleSortClick}>
          {latestFirst ? 'Latest' : 'Oldest'}
        </div>
      </div>
      {!loading ? (

        <div className="grid mt-4">
          {sortedPosts
            .filter((val) => {
              return (
                search.toLowerCase() === "" ||
                val.title.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((val, i) => {
              return (
                <div key={i}>
                  <div className="w-full overflow-clip grid grid-cols-6 mb-6 text-white border-2 border-cyan-200 rounded-md">
                    <Link to={`/postById/${val.id}`}
                      className="h-full w-full col-span-2 rounded-md bg-cyan-200 cursor-pointer"
                      style={{
                        backgroundImage: `url('http://localhost:3001/${val.image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="px-3 py-3 col-start-3 col-span-4">
                      <div className="mb-1">
                        <h2 className="mb-4 font-bold text-xl">{val.title}</h2>
                        <span className="font-mono text-sm text-slate-300">{formatCreatedAt(val.createdAt)}</span>
                      </div>
                      <Link to={`/postById/${val.id}`}>
                        <div
                          className="mb-4 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: val.description }}
                        />
                      </Link>
                      <div className="flex text-cyan-400 underline cursor-pointer capitalize">
                        <strong><em>{val.username}</em></strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      )}
    </div>
  );
};

export default Posts;
