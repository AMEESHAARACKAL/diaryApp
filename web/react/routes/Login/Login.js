import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delay } from "../../utils/Util";


function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	async function handleLogin(event) {
		event.preventDefault();
		const response = await fetch("http://localhost:8080/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email:email,
				password:password,
			}),
		});
		const data = await response.json();
		if (data.authToken) {
			localStorage.setItem("token", data.user);
			toast.success("Successfully Logged In");
			await delay(3000);
			window.location.href = "/";
		} else {
			toast.error("Invalid Email or Password");
		}
	}
	return (
		<>
			<div className="login-container">
				<div className="loginHeader">
					<FontAwesomeIcon icon={solid("book")} size="3x"className="headerIcon" />
					<h2>Welcome Back</h2>
					<p>Login with your credentials</p>
				</div>
				<div className="input-container">
					<FontAwesomeIcon icon={solid("envelope")} className="icon" />
					<input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
				</div>
				<div className="input-container">
					<FontAwesomeIcon icon={solid("lock")} className="icon" />
					<input type="password" placeholder="Password"onChange={(e)=>setPassword(e.target.value)} />
				</div>
				<button className="login-button" onClick={(event)=>{handleLogin(event);}}><FontAwesomeIcon icon={solid("arrow-right-to-bracket")} /> &nbsp; Login</button>
			</div>
			<ToastContainer />
		</>
	);
}
export default Login;