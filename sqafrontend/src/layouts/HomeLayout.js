import { useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import '../styles/HomeLayout.css';
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

//database
const sets = [
    {
        id: 'science',
        title: 'Science',
        qa: [
            {
                id: 1,
                question: 'What is the powerhouse of the cell?',
                answer: 'Mitochondria'
            },
            {
                id: 2,
                question: 'What is the heaviest organ in the body?',
                answer: 'Liver'
            }
        ]
    },
    {
        id: 'logic circuits',
        title: 'Logic Circuits',
        qa: [
            {
                id: 1,
                question: 'What is 32?',
                answer: 'OR'
            },
            {
                id: 2,
                question: 'What is 8?',
                answer: 'AND'
            }
        ]
    },
    {
        id: 'movies',
        title: 'Movies',
        qa: [
            {
                id: 1,
                question: 'Feed me if you dare',
                answer: 'Shrek'
            },
            {
                id: 2,
                question: 'I am speed',
                answer: 'Cars 1'
            }
        ]
    }
];

const HomeLayout = () => {
    const [cardSet, setCardSet] = useState(); // object from sets is this set or category
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
            
            <nav class="nav_bar">
                    <h1>Flash Quiz App</h1>
                    <button type="button" className="logout_btn" onClick={logout} >Log Out</button>
                    <article className="acct_nav">
                        {/* <Link to="/sign" className="logout_btn">Logout</Link> */}
                        <div>
                            {auth?.currentUser?.email}
                        </div>
                        <div className="profile_pic">
                            <p>pic</p>
                        </div>
                    </article>
            </nav>
            <section className="cardSet_bar">
                {
                            sets.map((set)=>{
                                return(
                                    <article className="set_box">
                                        <NavLink className="set_title" onClick={(set)=>{setCardSet(set)}} to="quiz">{set.title}</NavLink>
                                    </article>
                                );
                            })
                        }
            </section>
            
            <div className="home_content">
                <Outlet set={cardSet} />
            </div>
        </div>
    );
};
export default HomeLayout;