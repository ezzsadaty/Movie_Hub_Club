import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbarr from "./Navbarr";
import Foter from "./Foter";
import "./Community.css";
import PostForm from "./Postcreation";
import CommentForm from "./Commentform";

function Community() {
    const [posts, setPosts] = useState([]);
    const [userid, setUserid] = useState("");
    const [showCommentForm, setShowCommentForm] = useState(false);
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("data")) || [];
        userData.forEach((user) => {
            setUserid(user.id);
        });
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/posts/");
                const promises = response.data.map((post) =>
                    axios.get(`http://127.0.0.1:8000/api/posts/${post.id}/comments/`)
                );
                const commentResponses = await Promise.all(promises);
                const postsWithComments = response.data.map((post, index) => ({
                    ...post,
                    comments: commentResponses[index].data,
                }));
                setPosts(postsWithComments);
                console.log(postsWithComments)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const handleCommentCreated = (postId, comment) => {
        const updatedPosts = posts.map((post) => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, comment],
                };
            } else {
                return post;
            }
        });
        setPosts(updatedPosts);
        // window.location.reload(true);

    };

    // const handlePostCreated = (newPost) => {
    //     setPosts((prevPosts) => [...prevPosts, {
    //         ...newPost
    //     }]);
    // };
    const handlePostCreated = (post) => {
        // setPosts((prevPosts) => [...prevPosts, post]);
        window.location.reload(true);
    };
    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/user/${userid}/post/${postId}/delete/`);
            console.log("Post deleted successfully");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="ALLBODY">
            <Navbarr />
            <div className="flo"></div>
            <PostForm onSubmit={handlePostCreated} />
            <div className="contain">
                {posts.map((post) => (
                    <div className="post-section" key={post.id}>
                        <div className="post-bar">
                            <div className="post_topbar">
                                <div className="usy-dt">
                                    <div className="usy-name">

                                        <h2 className="gree">Author: {post.user?.name}</h2>
                                        <span>Created at: {post.created_at}</span>
                                        <h4>Title: {post.title}</h4>

                                    </div>
                                </div>
                                { post.user.id == userid &&   <div className="deleting">
                                        <button className="delete-buttom" onClick={() => handleDelete(post.id)}>
                                            Delete
                                        </button>
                                    </div>}
                            </div>
                            <div className="Contentdiv">
                                <h2> Content: </h2>
                            </div>
                            <div className="job_descp">
                                <h5>{post.content}</h5>
                            </div>
                            <div className="separator"></div>
                            <div className="job-status-bar">
                                <ul className="com">
                                    <li>
                                        <button
                                            onClick={() => setShowCommentForm(post.id)}
                                            className="com"
                                        >
                                            <i className="fas fa-comment-alt comment"></i> Add Comment
                                        </button>
                                    </li>
                                    {post.comments?.map((comment) => (
                                        <div key={comment.id}>
                                            {comment.user && <h5> Commenter: {comment.user?.name}</h5>}
                                            <li>{comment.content}</li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                            {showCommentForm === post.id && (
                                <CommentForm
                                    postId={post.id}
                                    onSubmit={(comment) =>
                                        handleCommentCreated(post.id, comment)
                                    }
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Foter />
        </div>
    );
}
export default Community;
