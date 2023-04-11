import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalWarning from "./ModalWarn";

// database of accounts
const accounts = [
    {
        id: 1,
        name: 'Anna',
        email: 'anna@gmail.com',
        pass: 'anna1'
    },
    {
        id: 2,
        name: 'Barbie',
        email: 'barbie@gmail.com',
        pass: 'barbie1'
    },
    {
        id: 3,
        name: 'Cara',
        email: 'cara@gmail.com',
        pass: 'cara1'
    }
  ]

const Signup = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cfmpass, setCfmPass] = useState('');
    const [accs, setAccs] = useState(accounts);
    const [showModal, setShowModal] = useState(false);
    const [modalCont, setModalCont] = useState('');
    const navigate = useNavigate();
    const [passPlaceholder, setPassPlaceholder] = useState('********');

    const signup = (e) => {
        e.preventDefault();
        if(email && pass && cfmpass){
            const passArray = accs.map((acc)=>{
                if(acc.email===email){
                    setEmail('');
                    console.log('account exists based on email');
                    setShowModal(true);
                    setModalCont('Email already exists!');
                    return(acc.pass);

                } else {
                    if(pass===cfmpass){
                        console.log('pass and cmf pass matches')
                        /* accs.push(
                            {
                                id: new Date().getTime().toString(),
                                name: 'new account',
                                email,
                                pass
                            }
                        ); */
                        setAccs([...accs, {
                            id: new Date().getTime().toString(),
                            name: 'new account',
                            email,
                            pass
                        }]);
                        console.log(accs);
                        navigate("/sign");
                        return(acc.pass);
                    } else {
                        console.log('confirm pass does not match');
                        setCfmPass('');
                        setPassPlaceholder('Please Confirm Again');
                        return(acc.pass);
                    }
                }
            })
        } else {
            setEmail('');
            setPass('');
            setCfmPass('');
        }
    };

    return(
        <div className="SignupPage">
            <h1><span>Join the</span> Community</h1>
            <form onSubmit={signup}>
                <label>Email {showModal && <ModalWarning modalContent={modalCont} />}<input type="email" id="signup_email" name="signup_email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="abc@defg.hij" required ></input></label>
                <label>Password<input type="password" id="signup_pass" name="signup_pass" value={pass} onChange={(e)=>{setPass(e.target.value)}} placeholder="********" required ></input></label>
                <label>Confirm Password<input type="password" id="signup_cfmpass" name="signup_cfmpass" value={cfmpass} onChange={(e)=>{setCfmPass(e.target.value)}} placeholder={passPlaceholder} required ></input></label>
                <button type="submit" className="sign_btn">Sign up</button>
            </form>
        </div>
    );
};

export default Signup;
