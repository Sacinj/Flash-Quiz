import { useEffect, useState } from "react";
import "../styles/Quiz.css";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // getDocFromCache
import { auth, db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

//Problems:
// Need to double click the flip button the first time the current QA is displayed

//Note:
// Does not display anything when the fieldname where the number does not exits. But it's ok since its not an error

const Quiz = () => {
    const [cardSet, setCardSet] = useState(null);
    const currentUser = auth?.currentUser?.email;
    const title = useLocation().pathname.split('/')[3];
    const [userEmail, setUserEmail] = useState(currentUser);
    
    const [fieldname, setFieldName] = useState('q1');
    const [toggleQA, setToggleQA] = useState(true);
    const [numberQA, setNumberQA] = useState(1);
    const [cardSetLength, setCardSetLength] = useState(1);
    const [isShuffle, setIsShuffle] = useState(false);
    
   

    const getSet = async () =>{ 
        try {
            
            const docSnap = await getDoc(doc(db, "USERS", userEmail, "CARDSETS", title));
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                setCardSet(docSnap.data());
                console.log("The cardSet data: ",cardSet)


                const fieldNames = Object.keys(docSnap.data());
                    // console.log(fieldNames);
                    // Extract the numbers from field names
                    const numbers = fieldNames.map((fieldName) => parseInt(fieldName.slice(1)));
                    // Sort the numbers in descending order
                    numbers.sort((a, b) => b - a);
                    // Get the highest number
                    const highestNumber = numbers[0];
                    // console.log("This is the highest numebr: ", highestNumber);
                    setCardSetLength(highestNumber);
                // idk if ok ra ba na wla gi unsubscribe and docSnap
                
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
        const authClear = onAuthStateChanged(auth, (userData) => {
            if(userData){
                setUserEmail(userData.email);
                console.log("setUserEmail: ", userEmail);
                getSet();
                //flipCard();
            }else{
                console.log("Could not get email");
            }
        });

        // if(userEmail){
        //     getSet();
        //     console.log(currentUser);
        // }else{
        //     console.log("Could not get set");
        //     console.log("userEmail: ",userEmail,"currentUser: ", currentUser);
        // }
        console.log("Quiz.js : UseEffect has run");
        return() => {
            authClear();
        }
    },[currentUser]);// there is no difference if we include fieldname and numberQA, idk why
//, fieldname, numberQA - myabe included in the dependencies of useEffect
    
    const shuffleSet = () => {
        setIsShuffle(!isShuffle);
    };


    //This also works - problems still persists
    /* const flipCard = () => {
        toggleQA ? setToggleQA(false) : setToggleQA(true);
        if(toggleQA){
            setFieldName('q'+numberQA);
        } else{
            setFieldName('a'+numberQA);
        }
        //console.log("ToggleQA= ",toggleQA);
        //console.log("Fieldname = ", fieldname);
    }; */

    //This works - problem still persists
    const flipCard = () => {
        toggleQA ? setToggleQA(false) : setToggleQA(true);
        if(toggleQA){
            setFieldName(currentField => {
                return 'q'+ parseInt(currentField.slice(1));
            });
        } else{
            setFieldName(currentField => {
                return 'a'+ parseInt(currentField.slice(1));
            });
        }
        
    };
    
    const nextCard = () => {
        if(numberQA<cardSetLength && isShuffle===false){
            setNumberQA(numberQA+1);
            setFieldName('q'+(numberQA+1));
        } else if(isShuffle===true){
            let randoNum = Math.floor(Math.random() * ((cardSetLength - 1 + 1)) + 1);
            
            setNumberQA(randoNum);
            setFieldName('q'+randoNum);
        }
        
    };

    const backCard = () => {
        if(numberQA>1 && isShuffle===false){
            setNumberQA(numberQA-1);
            setFieldName('q'+(numberQA-1));
        } else if(isShuffle===true){
            let randoNum = Math.floor(Math.random() * ((cardSetLength - 1 + 1)) + 1);
            
            setNumberQA(randoNum);
            setFieldName('q'+randoNum);
        }

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
                
                    {
                        numberQA
                    }
                    {
                        isShuffle ? <p>Shuffle is on</p> : <p>Shuffle is off</p> 
                    }
                
                {
                    //cardSet[fieldname] && <p>Loading...</p> // mo render na wla pay sulod ang cardSet guro mao error
                    //cardSet?.fieldname || <p>Loading...</p>
                    cardSet ? <p>{cardSet[fieldname]}</p> : <p>Loading...</p>
                }
                
                
            </div>
            <div>
                <button onClick={shuffleSet}>Shuffle</button>
            </div>

            
        </section>
    );
};
export default Quiz;
