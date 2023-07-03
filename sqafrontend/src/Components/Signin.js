import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Signin=()=>{
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("Current user logged in: ",auth?.currentUser?.email);
    }, []);


    const signin = async (e) => {
        e.preventDefault();
        try{
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredentials) => {
                console.log("User credentials: ",userCredentials);
                cookies.set("auth-token", userCredentials.user.refreshToken);
                navigate("/homelayout/quiz");
            }) .catch((err) => {
                console.log(err);
            });
            
        } catch(err){
            console.error(err);
        }
    };

    return(
        <div className="SigninPage">
            <h1><div>Flash</div>Quiz App</h1>
            <p>Quiz App using Flash Cards</p>

            <form onSubmit={signin}>
                <label>
                    Email: <input type='email' id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                </label>
                <label>
                    Password: <input type='password' id="pass" name="pass" value={pass} onChange={(e)=>{setPass(e.target.value)}} ></input>
                </label>
                <div className="btn_container">
                    <button type='submit' className="sign_btn">Sign in</button>
                    <NavLink to="signup" className="sign_btn">Sign-up</NavLink>
                </div>
            </form>
        </div>
    );
}

export default Signin; 
