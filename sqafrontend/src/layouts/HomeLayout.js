import { useEffect, useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import '../styles/HomeLayout.css';
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import CardsetBar from "../Components/CardsetBar";
import { collection } from "firebase/firestore";
import { cardSetTitle } from "../Components/CardsetBar";
import PersonIcon from "../Components/icons/person";

const HomeLayout = () => {
    //const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const loggedInEmail = auth?.currentUser?.email; //Needs checking to see if this variable is the best

    /* const getUserName = async ( email ) => {
        try{
            const data = await getDocs(collection(db, "USERS"));
            //console.log(data);
            const filteredData = data.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }));
            setScienceList(filteredData);
        } catch (err) {
            console.error(err);
        }
        
    } */
    

    useEffect(()=>{
        
        onAuthStateChanged(auth, (userData)=>{
            //console.log(userData);
            if(userData){
                setEmail(userData.email);
            }
        });
        //getUserName();
    },[loggedInEmail]);
    const navigate = useNavigate();

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
        <div className="home-layout">
            
            <nav className="nav-bar">
                    <h1>Flash Quiz</h1>
                    <div className="nav-bar__nav-link-container">
                        <NavLink to="/homelayout/fcset" className="nav-bar__nav-link" activeClassName="active">Create New Set</NavLink>
                        <NavLink to="/homelayout/aboutus" className="nav-bar__nav-link" activeClassName="active">About Us</NavLink>
                        <NavLink to="/homelayout/quiz" className="nav-bar__nav-link" activeClassName="active">Tutorial</NavLink>
                    </div>
                    
                    <article className="nav-bar__acct-nav">
                        
                        <div className="nav-bar__acct-nav__username">
                            {auth?.currentUser?.email}
                        </div>

                        <button type="button" className="nav-bar__acct-nav__logout-btn" onClick={logout} >Log Out</button>

                        <div className="nav-bar__acct-nav__profile-pic">
                            <PersonIcon />
                        </div>
                    </article>
            </nav>
            

            <CardsetBar>
            </CardsetBar>
            
            <div className="home-content">
                <Outlet />
            </div>

        </div>
    );
};
export default HomeLayout;