import { useEffect, useState } from "react";
import PostChart from "../components/charts/PostChart"
import UserChart from "../components/charts/UserChart"
import axios from 'axios'

const Analytics = () => {

    const [blogs, setBlogs] = useState('');
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);

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
            setBlogs(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchComments = async () => {
        try {
            const response = await axios.get("http://localhost:3001/comments");
            setComments(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchLikes = async () => {
        try {
            const response = await axios.get("http://localhost:3001/likes/listOfLikes");
            setLikes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBlogs();
        fetchUsers();
        fetchComments();
        fetchLikes();
    }, [])


    const stats = [
        { Name: "Users", number: users.length },
        { Name: "Post", number: blogs.length },
        { Name: "Likes", number: likes.length },
        { Name: "Views", number: "97" },
        { Name: "Comments", number: comments.length },
    ];

    return (
        <div className="pl-5 grid place-items-center">
            <div className="grid mt-24 grid-cols-12 px-3 gap-3 md:gap-12 md:px-12 text-black place-items-center">
                {stats.map((val, key) => {
                    return (
                        <div
                            key={key}
                            className="bg-white col-span-2 w-full cursor-pointer rounded-lg h-20 grid place-items-center md:shadow-neon shadow-green"
                        >
                            <span className="font-bold">{val.Name}</span>
                            <span>{val.number}</span>
                        </div>
                    );
                })}
            </div>
            <div className="mt-20 h-[450px] w-[1000px] px-14 pb-20 border-2 rounded-md border-cyan-200">
                <h1 className="text-white text-xl">Users</h1>
                <UserChart className="w-full h-full" />
            </div>
            <div className="mt-20 h-[450px] w-[1000px] px-14  border-2 rounded-md border-cyan-200">
                <h1 className="text-white text-xl">Posts</h1>
                <PostChart />
            </div>
        </div>
    )
}

export default Analytics
