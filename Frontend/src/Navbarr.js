import { useState, useEffect } from 'react';
import img1 from "./image/icon.png";
import "./Navbarr.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from "react-router-dom";

function Navbarr() {
    const [userLogin, setUserLogin] = useState('');
    const Navigate = useNavigate();
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('data')) || [];
        userData.forEach((user) => {
            setUserLogin(user.name);
        });
    })
    const handleLogOut = () => {
        localStorage.clear('data');
        Navigate("/home", "_self");
        window.location.reload(true);
    };
    const handleprofile = () => {
        Navigate("/Profile", "_self");
    };
    const handleMovies = () => {
        Navigate("/movie", "_self");
    };
    const handleCommunity = () => {
        Navigate("/Community", "_self");
    };
    const handlelogin = () => {
        Navigate("/login", "_self");
    };
    const handlesignup = () => {
        Navigate("/signup", "_self");
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg p-2 navbar-dark">
                <div className="container">
                    <a className="navbar-brand fa-2xl" href="#home">
                        <img style={{ width: '3rem' }} src={img1} alt="" />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/home#home">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className='nav-link' href="/home#about" >
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className='nav-link' href="/home#category">
                                    Categories
                                </a>
                            </li>
                            <li className="nav-item">
                                <button className='nav-link' onClick={handleMovies}>
                                    Movies
                                </button>
                            </li>
                            {userLogin &&
                                <li className="nav-item">
                                    <button className='nav-link' onClick={handleCommunity}>
                                        Community
                                    </button>
                                </li>
                            }

                        </ul>
                        {/* <span className="fw-bold mx-4" id="login" onClick={handleprofile}>
                            Hi {userLogin}
                        </span>
                        <button className="btn btn-outline-dark btn-sm" id="logOutBtn" onClick={handleLogOut}>
                            LogOut
                        </button> */}
                        {userLogin ? (
                            <>
                                <span className="fw-bold mx-4" id="login" onClick={handleprofile}>
                                    Hi {userLogin}
                                </span>

                                <button className="btn btn-outline-dark btn-sm" id="logOutBtn" onClick={handleLogOut}>
                                    LogOut
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="link" onClick={handlelogin}>
                                    Login
                                </div>
                                <div className="link" onClick={handlesignup}>
                                    Sign Up
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );

}

export default Navbarr;



