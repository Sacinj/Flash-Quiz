import { useEffect, useState } from "react";
//import { cardSetTitle } from "./CardsetBar";
import { useLocation } from "react-router-dom";
import { doc, getDocFromCache, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

//console.log("The title here: ", cardSetTitle);

const Quiz = (set) => {
    const [cardSet, setCardSet] = useState(null);
    const currentUser = auth?.currentUser?.email;
    const title = useLocation().pathname.split('/')[3];
    const [userEmail, setUserEmail] = useState(currentUser);
    

    const getSet = async () =>{ //needs revision or debugg ky ka duha sya mo run
        try {
            console.log("Before docSnap");
            //const docRef = doc(db, "USERS", userEmail, "CARDSETS", title);
            console.log("USERS ",userEmail," CARDSETS ", title);
            const docSnap = await getDoc(doc(db, "USERS", userEmail, "CARDSETS", title));
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
              }
            //setCardSet(doc);
            
        } catch (e) {
            //console.log("Error getting cached document:", e);
            console.log("inside cache black");
        }
    } 



    useEffect(()=>{ // needs revision ky ka daghan mo run but working na tho
        onAuthStateChanged(auth, (userData) => {
            if(userData){
                setUserEmail(userData.email);
                console.log("setUserEmail: ", userEmail);
                //getSet();
            }else{
                console.log("Could not get email");
            }
        });

        if(userEmail){
            getSet();
            console.log(currentUser);
        }else{
            console.log("Could not get set");
            console.log("userEmail: ",userEmail,"currentUser: ", currentUser);
        }
    },[currentUser]);

    const button_handle = () => {
        console.log("Random Number: ",Math.floor(Math.random()*20));//min inclusive max exclusive
    };
    
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
            <button onClick={button_handle}>CLick ME</button>
        </section>
    );
};
export default Quiz;