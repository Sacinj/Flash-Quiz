import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cfmpass, setCfmPass] = useState('');
    const navigate = useNavigate();
    const [passPlaceholder, setPassPlaceholder] = useState('********');
    const [isPassLengthShort, setIsPassLengthShort] = useState(false);
    const [doesUserExist, setDoesUserExist] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        console.log("Current user logged in: ",auth?.currentUser?.email);
    }, []);

    const signup = async (e) => {
        e.preventDefault();
        console.log("sign up func run");
        if(pass.length<6){
            setIsPassLengthShort(true);
        } else{
            try{
                await createUserWithEmailAndPassword(auth, email, pass);
                console.log("satement under createuser inside try block");
                addNewUser();
                navigate("/sign");
            } catch(err){
                setDoesUserExist(true);
                console.log(err.message);
            }
            
        }
        
    };

    const addNewUser = async () => {
        try {
            await setDoc(doc(db, "USERS", email),{
                email: email,
                username: username
            });
            console.log("added a new user to firestore");
        } catch (err) {
            console.log("user was not added to firestore");
            console.error(err);
        }
    };

    

    return(
        <div className="SignupPage">
            <h1><span>Join the</span> Community</h1>
            <form onSubmit={signup}>
                <label>Email {doesUserExist && <span style={{fontSize: '1rem', color: 'pink'}}>User already exists</span> }<input type="email" id="signup_email" name="signup_email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="abc@defg.hij" required ></input></label>
                <label>Password {isPassLengthShort && <span style={{fontSize: '1rem', color: 'pink'}}>Must be at least 6 charcters long</span> } <input type="password" id="signup_pass" name="signup_pass" value={pass} minLength="6" onChange={(e)=>{setPass(e.target.value)}} placeholder="********" required ></input></label>
                <label>Confirm Password<input type="password" id="signup_cfmpass" name="signup_cfmpass" value={cfmpass} onChange={(e)=>{setCfmPass(e.target.value)}} placeholder={passPlaceholder} required ></input></label>
                <label>Username <input type="text" id="signup_username" name="signup_username" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder="username" required></input></label>
                <button type="submit" className="sign_btn">Sign up</button>
            </form>
        </div>
    );
};

export default Signup;
