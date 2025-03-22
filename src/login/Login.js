import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../logo/Logo';


function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUpClick = () => {
        navigate('/Signup');
    };

    const fetchUserDetails = async (token) => {
        try {
            const response = await fetch(`http://localhost:12345/api/users/${username}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });
            if (response.ok) {
                const userDetails = await response.json();
                localStorage.setItem('username', userDetails.username);
                localStorage.setItem('profilePic', userDetails.profilePic);
                localStorage.setItem('nickname', userDetails.nickname);
                localStorage.setItem('password', userDetails.password);
            } else {
                console.log('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleLoginClick = async (e) => {
        try {
            const response = await fetch('http://localhost:12345/api/tokens', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "*/*",
                },
                body: JSON.stringify({ username: username, password: password }),
            });
            if (response.ok){
                const token = await response.text();
                localStorage.setItem(username, token);
                await fetchUserDetails(token);
                navigate('/feedpage');
            } else {
                alert('Please signup first.');
                return;
            }
        }
        catch {
            alert('Login failed. Please try again');
        }
    };

    return (
        <div className="login-container">
            <div className="container d-flex align-items-center vh-100">
                <div className="row">
                    <div className="col-md">
                        <div>
                            <div className="mb-3">
                                <input
                                    type="username"
                                    className="form-control"
                                    id="email"
                                    placeholder="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    id="loginPassword"
                                    className="form-control"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div id="passwordHelpBlock" className="form-text">
                                    Your password must be 8-20 characters long
                                </div>
                            </div>
                            <div className="d-grid gap-2 col-9">
                                <button type="button" className="btn btn-primary" onClick={handleLoginClick}>
                                    Log In
                                </button>
                                <br />
                                <button type="button" className="btn btn-success" onClick={handleSignUpClick}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <Logo />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Login