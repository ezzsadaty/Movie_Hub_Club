import { useState, useEffect } from 'react';
import $ from 'jquery';
import img1 from "./image/icon.png";
import img2 from "./image/1.jpg";
import img3 from "./image/3.jpg";
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbarr from './Navbarr';
import Foter from './Foter';



function Home() {
    const [isLoading, setIsLoading] = useState("");

    useEffect(() => {
        
        const handleScroll = () => {
            const windowScroll = window.scrollY;
            const navbar = $('.navbar');
            const toUp = $('.to-up');

            if (windowScroll > 100) {
                navbar.animate({ top: '0px', width: '100%' });
                toUp.css('display', 'flex');
            } else if (windowScroll < 100) {
                navbar.animate({ top: '50px', width: '70%' });
                toUp.css('display', 'none');
            }
        };
        return () => {
            window.addEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const random = document.querySelectorAll('#review-random');

        const randomReviews = () => {
            for (let i = 0; i < random.length; i++) {
                random[i].innerHTML = Math.round(Math.random() * 5000) + `K`;
            }
        };
        const intervalId = setInterval(randomReviews, 2000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const isLoadingTimeout = setTimeout(() => {
            $('#isLoading img').fadeOut(2000, () => {
                $('#isLoading').slideUp(2000, () => {
                    $('#isLoading').remove();
                    $('body').css('overflow', 'auto');
                    setIsLoading(false);
                });
            });
        }, 2000);
        return () => {
            clearTimeout(isLoadingTimeout);
        };
    }, []);

    return (
        <div className='Home overlay' >
            {isLoading && (
                <div id="isLoading">
                    <img style={{ width: '3rem' }} src={img1} alt="" className="fa-spin" />
                </div>
            )}

            <div className="to-up position-fixed end-0 bottom-0 m-5 fa-2x" onClick={() => window.scrollTo(0, 0)}>
                <i className="fas fa-arrow-alt-circle-up"></i>
            </div>
            < Navbarr />
            <section className="home" id="home">
                <div className="overlay">
                    <div className="container">
                        <div className="row g-5 align-items-center justify-content-center vh-100">
                            <div className="col-md-8">
                                <div className="msg text-center py-5 text-white">
                                    <h1 className=" fa-4x">Welcome To <span>Movies</span> Hub</h1>
                                    <p className="lead">Experience the magic of movies from the 
                                    comfort of your own screen with Movie Hub Club your one-stop destination for all things movies.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about py-5" id="about">
                <div className="container">
                    <div className="about-caption py-5 text-center ">
                        <p className="text-muted">Movies are a diverse art 
                        form that can be enjoyed by audiences around the world. 
                        They come in many different types or genres, ranging from
                        action, drama, romance, and comedy, to horror, sci-fi, documentary,
                        and animation. Each genre has its own unique characteristics and 
                        styles that appeal to different viewers. </p>
                    </div>
                    <div className="row g-5">
                        <div className="col-md-4">
                            <div className="about-item shadow rounded py-5 px-3 text-center">
                                <h4>Action</h4>
                                <p>Action movies are a thrilling blend of fast-paced physical 
                                    feats.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="about-item shadow rounded py-5 px-3 text-center">
                                <h4>Stories</h4>
                                <p>Movies that tell compelling stories have the power to transport us to different worlds.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="about-item shadow rounded py-5 px-3 text-center">
                                <h4>Tv</h4>
                                <p>TV series offer a unique and immersive form of storytelling.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="category py-5" id="category">
                <div className="container">
                    <div className="category-caption d-flex justify-content-center align-items-center py-5">
                        <h3 className=" text-uppercase">Categories</h3>
                    </div>
                    <div className="row align-items-center g-5">
                        <div className="col-md-6">
                            <div className="image rounded shadow overflow-hidden">
                                <img className="w-100" src={img2} alt=""></img>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="image rounded shadow overflow-hidden">
                                <img className="w-100" src={img3} alt=""></img>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="review">
                <div className="overlay py-5">
                    <div className="container">
                        <div className="row justify-content-center g-5">
                            <div className="col-md-4 text-center">
                                <div className="review-item  text-center">
                                    <span className=" fs-2" id="review-random"></span>
                                    <h5 className=" text-white">Reviews</h5>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="review-item  text-center">
                                    <span className=" fs-2" id="review-random"></span>
                                    <h5 className=" text-white">Watching</h5>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="review-item  text-center">
                                    <span className=" fs-2" id="review-random"></span>
                                    <h5 className=" text-white">Subscribe</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Foter />

        </div>
    );
}

export default Home;
