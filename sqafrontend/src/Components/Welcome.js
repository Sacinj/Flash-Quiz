import { Link } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../config/firebase";

const Welcome = () => {

    useEffect(() => {
        console.log("Current user logged in: ",auth?.currentUser?.email);
    }, []);

    return(
        <>
            <h1>Welcom User!</h1>
            <Link to='sign'>Log in</Link>
        </>
    );
};
export default Welcome;