import { Link } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import "../styles/Welcome.css";
import PassSetIcon from "./icons/passwordSet";


const Welcome = () => {

    useEffect(() => {
        console.log("Current user logged in: ",auth?.currentUser?.email);
    }, []);

    return(
        <div className="welcome" /*style={{backgroundImage: 'url(/images/welcome-cover.png'}}*/>
            
                <h1>Flash Quiz</h1>
                <p className="welcome__description">Study using Flash Quiz and Save your Flash Cards Online</p>
                <Link to='sign'>Get Started</Link>
                <section className="welcome__info">
                    <article className="welcome__info__card">
                        <p>Study using Flash Quiz and Save your Flash Cards Online</p>
                    </article>

                    <article className="welcome__info__card">
                        <p>Study using Flash Quiz and Save your Flash Cards Online</p>
                    </article>

                    <article className="welcome__info__card">
                        <p>Study using Flash Quiz and Save your Flash Cards Online</p>
                    </article>
                </section>
                <PassSetIcon></PassSetIcon>
            
        </div>
    );
};
export default Welcome;