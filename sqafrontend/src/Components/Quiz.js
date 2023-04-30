import { useEffect, useState } from "react";
import { cardSetTitle } from "./CardsetBar";
import { useLocation } from "react-router-dom";

console.log("The title here: ", cardSetTitle);

const Quiz = (set) => {
    //const [accounts, setAccounts] = useState(null);
    const title = useLocation().pathname.split('/')[3];
    
    return(
        <section>
            <p>this is the quiz page qui qui quiz</p>
            {/* <p>{set.title}</p>
            {
                accounts && accounts.map((account)=>{
                    return(
                        <div key={account.id}>
                            <p>{account.email}</p>
                            <p>{account.pass}</p>
                        </div>
                    );
                })
            } */}
            <p>The title is: {title}</p>
        </section>
    );
};
export default Quiz;