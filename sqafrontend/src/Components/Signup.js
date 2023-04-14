import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalWarning from "./ModalWarn";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cfmpass, setCfmPass] = useState('');
    //const [accs, setAccs] = useState(accounts);
    const [showModal, setShowModal] = useState(false);
    const [modalCont, setModalCont] = useState('');
    const navigate = useNavigate();
    const [passPlaceholder, setPassPlaceholder] = useState('********');

    const signup = async (e) => {
        e.preventDefault();
        console.log("sign up func run");
        if(pass.length<6){
            setModalCont("Must be at least 6 characters long");
            setShowModal(true);
        } else{
            try{
                await createUserWithEmailAndPassword(auth, email, pass);
                console.log("satement under createuser inside try block");
                navigate("/sign");
            } catch(err){
                console.log(err.message);
            }
        }
        
    };

    return(
        <div className="SignupPage">
            <h1><span>Join the</span> Community</h1>
            <form onSubmit={signup}>
                <label>Email {showModal && <ModalWarning modalContent={modalCont} />}<input type="email" id="signup_email" name="signup_email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="abc@defg.hij" required ></input></label>
                <label>Password {showModal && <ModalWarning modalContent={modalCont} />} <input type="password" id="signup_pass" name="signup_pass" value={pass} onChange={(e)=>{setPass(e.target.value)}} placeholder="********" required ></input></label>
                <label>Confirm Password<input type="password" id="signup_cfmpass" name="signup_cfmpass" value={cfmpass} onChange={(e)=>{setCfmPass(e.target.value)}} placeholder={passPlaceholder} required ></input></label>
                <button type="submit" className="sign_btn">Sign up</button>
            </form>
        </div>
    );
};

export default Signup;
