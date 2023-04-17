import { useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import '../styles/HomeLayout.css';
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import CardsetBar from "../Components/CardsetBar";

const HomeLayout = () => {
    //const [cardSet, setCardSet] = useState(); // object from sets is this set or category
    const navigate = useNavigate();

    /* const setBar_handle = (set) => {
        setCardSet(set);
    }; */

    const logout = async () => {
        try{
            await signOut(auth);
            console.log("user has been logged out");
            navigate("/");
        } catch(err){
            console.log(err);
        }
    };

    return(
        <div className="home_layout">
            
            <nav className="nav_bar">
                    <h1>Flash Quiz App</h1>
                    <NavLink to="/homelayout/fcset">Add QA</NavLink>
                    <article className="acct_nav">
                        {/* <Link to="/sign" className="logout_btn">Logout</Link> */}
                        <button type="button" className="logout_btn" onClick={logout} >Log Out</button>
                        <div>
                            {auth?.currentUser?.email}
                        </div>
                        <div className="profile_pic">
                            <p>pic</p>
                        </div>
                    </article>
            </nav>
            <CardsetBar>
            </CardsetBar>
            
            <div className="home_content">
                <Outlet />
            </div>
        </div>
    );
};
export default HomeLayout;