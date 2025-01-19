
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate();

    return (
        <section id="signupPage">
            <div className="container min-vh-100 d-flex justify-content-center align-items-center">
                <img src="assets/images/logging.png" height="448" width="474" alt="Signup" />
                <div style={{ width: "15%" }}></div>
                <form>
                    <h2 className="text-left mb-5">Signup</h2>

                    <div className="mb-3">
                        <label htmlFor="InputSignupEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" />
                        <div className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="InputSignupPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" />
                    </div>

                    <div style={{ height: "20px" }}></div>

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary" onClick={() => navigate('/dashboard')}>Signup</button>
                        <button type="button" className="btn btn-secondary float-end" onClick={() => navigate('/login')}>Back</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SignupPage;