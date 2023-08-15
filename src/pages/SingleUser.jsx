import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { useState } from "react";
import moment from "moment";

const SingleUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState([])
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/userById/${id}`).then((response) => {
            setUser(response.data);
        });
    }, [id]);

    const removeUser = (id) => {
        axios
            .delete(`http://localhost:3001/auth/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                navigate("/users");
            });
    };

    const formatCreatedAt = (timestamp) => {
        return moment(timestamp).format("MMMM Do YYYY, h:mm:ss a");
    };
    return (
        <div className="w-full grid place-items-center pt-20">
            <div className="text-white w-[80%]">
                <div className="capitalize">
                    {user.username}
                </div>
                <div>
                    {user.email}
                </div>
                <div>
                    {formatCreatedAt(user.createdAt)}
                </div>
                {authState.email === `shreeshalember@gmail.com` ? (
                    <span className="text-red-700 text-xl cursor-pointer" onClick={() => removeUser(user.id)}>
                        <MdDelete />
                    </span>)
                    : ''}
            </div>
        </div>
    )
}

export default SingleUser
