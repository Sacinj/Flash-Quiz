import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Signin=()=>{
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:8000/accounts').then((res)=>{
                return res.json();
            }).then((data)=>{
                setAccounts(data);
            });
    },[]);

    const signin = (e) => {
        e.preventDefault();
        if(email && pass){
            accounts && accounts.map((acc)=>{
                if(acc.email===email){
                    if(acc.pass===pass){
                        navigate("/homelayout/quiz");
                        return false; // THis is maybe for modal and just so that map returns smthng
                    } else{
                        setEmail('');
                        setPass('');
                        return true;
                    }
                } else{
                    setEmail('');
                    setPass('');
                    return true;
                }
            })
   
        } else {
            setEmail('');
            setPass('');
        }
    };

    return(
        <div className="SigninPage">
            <h1><span>Flash Quiz</span> App</h1>
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
