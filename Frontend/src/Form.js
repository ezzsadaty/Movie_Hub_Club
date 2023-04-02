import React, { useState } from "react";
import './Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import img1 from "./image/icon.png";
import swal from "sweetalert";

function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            body: JSON.stringify({ name, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (validationName() && validationEmail() && validationPassword()) {                    
                if (data.success) {
                    const userData = {
                        name,
                        email,
                        id: data.user_id,
                    };
                    let users = JSON.parse(localStorage.getItem("data")) || [];
                    users.push(userData);
                    localStorage.setItem("data", JSON.stringify(users));
                    setError("");
                    // Login successful, redirect to home page
                    window.location.href = "/home";
                } else {
                    // Login failed, show error message here
                    console.log(data)
                    setError("Failed to login. Please check your username and password.");
                }
            }
        })
        .catch(error => {
            // Handle any errors here
            setError("An error occurred while trying to login.");
        });
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (validationName() && validationEmail() && validationPassword()) {
    //         const userData = {
    //             name,
    //             email,
    //             password,
    //         };
    //         let users = JSON.parse(localStorage.getItem("data")) || [];
    //         users.push(userData);
    //         console.log(users);
    //         localStorage.setItem("data", JSON.stringify(users));
    //         window.open("/home", "_self");
    //         setError("");
    //     }
    // };
    // fetch('/login/', {
    //     method: 'POST',
    //     body: JSON.stringify({ name: 'name', password: 'password' }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.success) {
    //         // Login successful, do something here
    //     } else {
    //         // Login failed, show error message here
    //     }
    // })
    // .catch(error => {
    //     // Handle any errors here
    // });

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
    
    const handleAlertClick = () => {
        swal({
            title: "مــــعــــلــــــش هه",
            timer: 4000,
        });
    };
    // const [user, setUser] = useState(null);
    // const userId = props.match.params.id;
    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/users/${userId}`)
    //         .then(res => setUser(res.data))
    //         .catch(err => console.log(err));
    // }, [userId]);

    // if (!user) {
    //     return <div>Loading user...</div>;
    // }

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
                            <div className="confirm d-flex justify-content-between align-items-center">
                                <button className="btn btn-danger" type="submit">
                                    Login
                                </button>
                                <a href="#" className="aaa" onClick={handleAlertClick}>
                                    عارف انك اكيد نسيت كلمه السر ؟
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form;