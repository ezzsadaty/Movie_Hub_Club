import React, { useState } from 'react';
import Navbarr from "./Navbarr";
import Foter from "./Foter";
import img1 from "./image/icon.png";
import axios from 'axios';


function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setbio] = useState('');
    const [error, setError] = useState("");
        const handleSubmit = (e) => {
            e.preventDefault();
            axios.post('http://127.0.0.1:8000/api/users/create/', {
                    name:name,
                    email: email,
                    password: password,
                    bio: bio,
                })
                    .then(response => {
                    console.log(response.data);
                    // show a success message to the user
                    })
                    .catch(error => {
                    console.log(error);
                    // show an error message to the user
                    });
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const response = await fetch('http://127.0.0.1:8000//api/signup/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ name, email, password ,bio}),
    //     });
    //     if (response.ok) {
    //         // Signup successful, redirect to login page or home page
    //     } else {
    //         // Signup failed, handle error
    //     }
        
        const validationName = () => {
            const regx = /^(\s)*[A-Za-z]+((\s)?((\'|\-|\.|\_)?([A-Za-z])+))*(\s)*$/;
            if (regx.test(name)) {
                return true;
            } else {
                setError("Name Invalid...!");
                return false;
            }
        };
    
        const validationEmail = () => {
            const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (regx.test(email)) {
                return true;
            } else {
                setError("Email Invalid...!");
                return false;
            }
        };
    
        const validationPassword = () => {
            const regx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (regx.test(password)) {
                return true;
            } else {
                setError("Password Invalid...!");
                return false;
            }
        };
        if (validationName() && validationEmail() && validationPassword()) {
            const userData = {
                name,
                email,
                password,
            };
            let users = JSON.parse(localStorage.getItem("data")) || [];
            users.push(userData);
            console.log(users);
            localStorage.setItem("data", JSON.stringify(users));
            window.open("/home", "_self");
            setError("");
        }
    };

    return (
        <div className="overlay">
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="form w-50 m-auto  p-2 rounded shadow">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="form-caption text-center py-2">
                            <img style={{ width: "3rem" }} src={img1} alt="" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter Your Name ..."
                                className=" form-control my-4"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email ..."
                                className=" form-control my-4"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Your password ..."
                                className=" form-control my-4"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="text"
                                name="bio"
                                id="bio"
                                placeholder="Enter Your bio ..."
                                className=" form-control my-4"
                                value={bio}
                                onChange={(e) => setbio(e.target.value)}
                            />
                            <div className="confirm d-flex justify-content-between align-items-center">
                                <button className="btn btn-danger" type="submit">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
