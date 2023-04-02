import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Postcreation.css";



function PostForm({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userid, setUserid] = useState("");
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("data")) || [];
        userData.forEach((user) => {
            setUserid(user.id);
        });
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `http://127.0.0.1:8000/api/posts/create/${userid}`;
        const data = { title, content };
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        };
        try {
            const response = await axios.post(url, data, { headers });
            console.log(response.data);
            onSubmit(response.data); // notify parent component of new post
            setTitle(""); // clear the title input
            setContent(""); // clear the content input
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="all">
            <section className="createpost">
                <form onSubmit={handleSubmit} className="Form">
                    <h3>New Post</h3>
                    <div className="input">
                        <label htmlFor="title">Title: </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="content">Content: </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit">Create post</button>
                </form>
            </section>
        </div>
    );
}
export default PostForm;
