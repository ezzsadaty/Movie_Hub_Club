import { useState, useEffect } from 'react';
import img1 from "./image/USerpro.jpg";
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbarr from './Navbarr';
import Foter from './Foter';
import React from 'react';
import './Profile.css';
import axios from 'axios';
import $ from 'jquery';


function Profile() {

    const [userLogin, setUserLogin] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [user, setUser] = useState('');
    // useEffect(() => {
    //     const userData = JSON.parse(localStorage.getItem('data')) || [];
    //     userData.forEach((user) => {
    //         setUserLogin(user.name);
    //         setUserEmail(user.email);
    //     });
    // });
    useEffect(() => {
        // const userData = JSON.parse(localStorage.getItem('data')) || [];
        // userData.forEach((user) => {
        //             setUserLogin(user.name);
        //             setUserEmail(user.email);
        //         });
        // axios.get('http://127.0.0.1:8000/api/users/1')
        //     .then((response) => setUser(response.data))
        //     .catch((error) => console.error(error));
        // axios.get('http://localhost:8000/api/users/2')
        //     .then((response) => {
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }, []);
   
    return (
        <div>
            <Navbarr />
            <div className='Overlay p-5'>
                <div className='cover'></div>
                <div className='m-1 bg-light Rod bg-gradient position-relative ' style={{ height: "300px" }}>
                    <div className='profilephoto d-flex  align-items-end position-absolute bottom-0 start-0 '>
                        <img src={img1} alt='profile'></img>
                        <div className='m-5 h3  ' >
                            <div className='text-start'>Profile</div>
                            <div className='text-muted h6' > You Can Change your Personal details</div>
                            {/* <div className='h3 text-start'>Name:    {userLogin}</div>
                            <div className='h5 text-start'> Email:      {userEmail}</div> */}
                        </div>
                    </div>
                </div>
                <div className='bg-secondary Rod2 d-flex algin-items-center flex-column h5 m-1 pt-2 ' style={{ height: "auto" }}>
                    <div style={{ height: "60px" }}></div>
                    <div className=' d-flex justify-content-between m-5 w-25 text-light '>
                        <div>Name :</div>
                        {/* <div className='text-start w-50'>{user.First_name}</div> */}
                    </div>
                    <div className=' d-flex justify-content-between m-5 w-25 text-light '>
                        <div>Email :</div>
                        {/* <div className='text-start w-50' >{user.email}</div> */}
                    </div>
                </div>
            </div>
            
            <Foter />
        </div>
    )
}
export default Profile;