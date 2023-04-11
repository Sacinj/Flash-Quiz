import { Link } from "react-router-dom";

const Welcome = () => {
    return(
        <>
            <h1>Welcom User!</h1>
            <Link to='sign'>Log in</Link>
        </>
    );
};
export default Welcome;