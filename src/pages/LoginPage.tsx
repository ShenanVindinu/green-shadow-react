
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <section id="loginPage">
            <div className="container min-vh-100 d-flex justify-content-center align-items-center">
                <img src="assets/images/logging.png" height="448" width="474" alt="Login" />
                <div style={{ width: "15%" }}></div>
                <form>
                    <h2 className="text-left mb-5">Welcome!</h2>

                    <div className="mb-3">
                        <label htmlFor="InputEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" />
                        <div className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="InputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" />
                    </div>

                    <div style={{ height: "20px" }}></div>

                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-primary" onClick={() => navigate('/dashboard')}>Login</button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/signup')}>Signup</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LoginPage;