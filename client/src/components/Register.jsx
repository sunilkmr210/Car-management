import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL;

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const publicRequest = axios.create({
        baseURL: BASE_URL,
    });

    const handleClick = (e) => {
        e.preventDefault();
        const register = async () => {
            try {
                console.log(publicRequest);
                const res = await publicRequest.post('/auth/register', {
                    username, password
                });

                console.log(res.data);

            } catch (err) {
                console.log(err);
            }
        }
        register();
        navigate('/');
    };


    return (
        <div
            style={{
                flex: 4,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <input
                style={{ padding: 10, marginBottom: 20, width: "80%", maxWidth:"500px" }}
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                style={{ padding: 10, marginBottom: 20, width: "80%", maxWidth: "500px" }}
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick} style={{ padding: 10, width: "15%", maxWidth:"100px" }}>
                Register
            </button>
        </div>
    );
};

export default Register;