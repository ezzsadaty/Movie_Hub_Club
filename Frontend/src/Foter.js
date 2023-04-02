
import "./Foter.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Foter() {
    return(
        <div>
            <footer className=" bg-dark text-center py-5">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-3">
                            <div className="footer text-white">
                                <div className="footer-social d-flex justify-content-evenly align-items-baseline py-2">
                                    <a href="https://www.facebook.com/ezz.sadaty.1/" className="fs-4 fa-brands fa-facebook"></a>
                                    <a href="https://www.linkedin.com/in/ezz-elsadaty-4041a4196/"
                                        className="fs-4 fa-brands fa-linkedin"></a>
                                    <a href="https://github.com/ezzsadaty" className="fs-4 fa-brands fa-github"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
export default Foter;
