import { Outlet } from "react-router-dom";
import '../styles/SignLayout.css';

const SignLayout = () => {
    return(
        <div className="sign-layout" >
            <div className='sign_bg'>
                <img src='././images/signin-cover.png' alt='signin cover' />
            </div>
    
            <div className='sign_content'>
                <Outlet />
                
            </div>
        </div>
    );
};
export default SignLayout; 