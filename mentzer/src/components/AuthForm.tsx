import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, GYM_RAT_ID, REFRESH_TOKEN } from "../constants/authConstants";

interface AuthFormProps {
    route: string;
    method: string;
}

const AuthForm = (props: AuthFormProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const name = (props.method === "login") ? "Login" : "Register";

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(props.route, { username, password });
            if (props.method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                localStorage.setItem(GYM_RAT_ID, res.data.id);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>{name}</h1>
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />

            <button type="submit">{name}</button>
        </form>
    )
}

export default AuthForm;