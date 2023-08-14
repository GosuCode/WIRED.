import user from '../assets/user.jpg'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../helpers/AuthContext"
import { MdDeleteForever } from 'react-icons/md'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { AiFillEdit } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import axios from "axios"
import moment from 'moment'

const SinglePage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const commentRef = useRef(null);         //for scrolling down to the comment section

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/postById/${id}`).then((response) => {
            setBlog(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, [id]);

    const addComment = () => {
        axios.post("http://localhost:3001/comments", { commentBody: newComment, PostId: id, },
            {
                headers: { accessToken: localStorage.getItem("accessToken"), },
            }
        )
            .then((response) => {
                if (response.data.error) {
                    toast.warn('User not logged In!')
                } else {
                    const commentToAdd = { commentBody: newComment, username: response.data.username, };
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
            });
    };

    const deleteComment = (id) => {
        axios
            .delete(`http://localhost:3001/comments/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                setComments(
                    comments.filter((val) => {
                        return val.id !== id;
                    })
                );
            });
    };

    const deletePost = (id) => {
        axios
            .delete(`http://localhost:3001/posts/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                navigate("/posts");
            });
    };

    const formatCreatedAt = (timestamp) => {
        return moment(timestamp).format("MMMM Do YYYY, h:mm:ss a");
    };

    return (
        <div className='w-full grid place-items-center'>
            <div className="w-3/4 mt-16 md:mt-24 bg-white shadow-sm shadow-slate-400">
                <div>
                    <img src={`http://localhost:3001/${blog.image}`} alt="cover-image" className='w-full h-40 md:h-[340px]' />
                </div>
                <div className='flex mt-4'>
                    <div className='grid items-center'>
                        <img src={user} alt="" className='h-14 rounded-full m-1 p-1' />
                    </div>
                    <div className='grid items-center py-3'>
                        <div className='text-sm font-semibold capitalize'>{blog.username}</div>
                        <span className='text-xs'> {formatCreatedAt(blog.createdAt)}</span>
                    </div>
                </div>
                {authState.username === blog.username && (
                    <div className='flex justify-between px-20 items-center'>
                        <button className='text-red-500 md:text-2xl grid items-center'
                            onClick={() => {
                                deletePost(blog.id);
                            }}
                        >
                            <RiDeleteBin5Fill />
                        </button>
                        <Link to={`/updatePost/${blog.id}`} state={blog}>
                            <AiFillEdit className='text-purple-600 md:text-2xl' />
                        </Link>
                    </div>
                )}
                <div className='mt-8'>
                    <div className='pl-10'>
                        <h1 className='font-extrabold text-xl md:text-4xl font-sans'>
                            {blog.title}
                        </h1>
                    </div>
                </div>
                <div className="px-3 md:px-16 md:p-0 py-8 font-serif mt-10 text-xl leading-10">
                    <p dangerouslySetInnerHTML={{ __html: blog.description }} />
                </div>
                <hr />

                {/* comment section */}

                <div className="md:px-16 py-8 mb-6" ref={commentRef}>
                    <section className="mb-4 font-bold text-lg">
                        <h2>Top comments </h2>
                    </section>
                    <>
                        <div className="">
                            <div className='flex mb-4'>
                                <span className=' capitalize bg-purple-700 text-xl text-white rounded-full h-10 w-10 grid place-items-center m-1 p-1' >
                                    {authState.username.charAt(0)}
                                </span>
                                <div className="mb-3">
                                    <input name="" id="" cols="80" rows="2"
                                        className='focus:outline-none border-2 focus:border-blue-500 rounded-lg text-lg md:w-[400px] w-[75%] md:p-1'
                                        placeholder='Add a comment'
                                        autoComplete="off"
                                        value={newComment}
                                        onChange={(event) => {
                                            setNewComment(event.target.value);
                                        }} />
                                    <button onClick={addComment} className='shadow-sm hover:shadow-slate-400 border border-blue-500 font-bold py-1 ml-6 px-4 rounded-md'> Add Comment</button>
                                </div>
                            </div>
                            {comments.map((val, key) => {
                                return (
                                    <div className='grid grid-cols-12 items-center' key={key}>
                                        <span className='col-start-1 col-span-2 md:col-span-1 capitalize bg-purple-700 text-xl text-white rounded-full h-10 w-10 grid place-items-center'>
                                            {val.username.charAt(0)}
                                        </span>
                                        <div className='col-start-3 md:col-start-2 col-span-full p-4'>
                                            <div>
                                                <button className='text-sm font-semibold capitalize'>{val.username}</button>
                                            </div>
                                            <div className='px-3 mb-4 text-sm flex justify-between'>
                                                <p>
                                                    {val.commentBody}
                                                </p>
                                                {authState.username === val.username && (
                                                    <>
                                                        <button
                                                            onClick={() => {
                                                                deleteComment(val.id);
                                                            }}
                                                            className='text-xl'
                                                        >
                                                            <MdDeleteForever className="text-red-400" />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                            <hr />
                                        </div>
                                        <ToastContainer />
                                    </div>
                                )
                            })}
                        </div>

                    </>
                </div>
            </div>
        </div>
    )
}

export default SinglePage
