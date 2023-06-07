import { useEffect, useState } from "react";
import "../styles/Quiz.css";
//import { cardSetTitle } from "./CardsetBar";
import { useLocation } from "react-router-dom";
import { doc, getDocFromCache, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";



const Quiz = (set) => {
    const [cardSet, setCardSet] = useState(null);
    const currentUser = auth?.currentUser?.email;
    const title = useLocation().pathname.split('/')[3];
    const [userEmail, setUserEmail] = useState(currentUser);
    
    const [fieldname, setFieldName] = useState('q1');
    const [toggleQA, setToggleQA] = useState(true);
    const [numberQA, setNumberQA] = useState(1);
    


    const cardSetLength = 3;
   
    

    const getSet = async () =>{ //needs revision or debugg ky ka duha sya mo run
        try {
            console.log("Before docSnap");
            //const docRef = doc(db, "USERS", userEmail, "CARDSETS", title);
            console.log("USERS ",userEmail," CARDSETS ", title);
            const docSnap = await getDoc(doc(db, "USERS", userEmail, "CARDSETS", title));
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setCardSet(docSnap.data());
                
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
    },[currentUser]);//e apil ba ang fieldname?
//, fieldname, numberQA - myabe included in the dependencies of useEffect
    
    const button_handle = () => {
        console.log("Random Number: ",Math.floor(Math.random()*21));//min inclusive max exclusive
    };

    const flipCard = () => {
        toggleQA ? setToggleQA(false) : setToggleQA(true);
        if(toggleQA){
            setFieldName('q'+numberQA);
        } else{
            setFieldName('a'+numberQA);
        }
        //console.log("ToggleQA= ",toggleQA);
        //console.log("Fieldname = ", fieldname);
    };
    
    const nextCard = () => {
        if(numberQA<cardSetLength){
            setNumberQA(numberQA+1);

        };

    };

    const backCard = () => {
        if(numberQA>1){
            setNumberQA(numberQA-1);

        };

    };

    return(
        <section className="quiz_component">
            <div>
                <p>{title}</p>
            </div>
            
            
            <div>
                <button type="button" onClick={backCard}>Back</button>
                <button type="button" onClick={flipCard}>Flip</button>
                <button type="button" onClick={nextCard}>Next</button>
            </div>
            <div className="card_deck">
                <p>
                    {
                        numberQA
                    }
                </p>
                {
                    //cardSet[fieldname] && <p>Loading...</p> // mo render na wla pay sulod ang cardSet guro mao error
                    //cardSet?.fieldname || <p>Loading...</p>
                    cardSet ? <p>{cardSet[fieldname]}</p> : <p>Loading...</p>
                }
                
                
            </div>
            <div>
                <button onClick={button_handle}>CLick ME</button>
            </div>

            
        </section>
    );
};
export default Quiz;