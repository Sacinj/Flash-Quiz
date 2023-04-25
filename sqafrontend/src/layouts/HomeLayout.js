import { useEffect, useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import '../styles/HomeLayout.css';
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import CardsetBar from "../Components/CardsetBar";
import { collection } from "firebase/firestore";

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
        <div className="home_layout">
            
            <nav className="nav_bar">
                    <h1>Flash Quiz App</h1>
                    <NavLink to="/homelayout/fcset">Add QA</NavLink>
                    <article className="acct_nav">
                        <button type="button" className="logout_btn" onClick={logout} >Log Out</button>
                        <div>
                            {/* {email} */}
                            {auth?.currentUser?.email}
                            {/* {scienceList.map((qa)=>(
                                if(qa.email==email){
                                    <article className="set_box" key={qa.id}>
                                    {qa.answer}
                                    </article>
                                } else{
                                    <article className="set_box" key={qa.id}>
                                    </article>
                                }
                                
                            ))} */}
                        </div>
                        <div className="profile_pic">
                            <p>pic</p>
                        </div>
                    </article>
            </nav>
            {/* <CardsetBar userEmail={auth?.currentUser?.email}> */}
            <CardsetBar>
            </CardsetBar>
            
            <div className="home_content">
                <Outlet />
            </div>
        </div>
    );
};
export default HomeLayout;