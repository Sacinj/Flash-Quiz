import { useEffect, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/FCSet.css";
import CreateSetIcon from "./icons/createSet";
import { useNavigate } from "react-router-dom";

const FCSet = () => {
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    const [newSetName, setNewSetName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const loggedInEmail = auth?.currentUser?.email;

    useEffect(()=>{
        
        onAuthStateChanged(auth, (userData)=>{
            if(userData){
                setEmail(userData.email);
                console.log("FCSet: Current User is ", loggedInEmail);
            }
        });
    },[loggedInEmail]);

    const addNewSet = async () => {
        try {
            await setDoc(doc(db, "USERS",loggedInEmail, "CARDSETS", newSetName),{
                a1: newAnswer,
                q1: newQuestion,
            });
            navigate(`/homelayout/editFC/${newSetName}`);
            window.location.reload(true); // to refresh the card set bar to show the new card set on the list
            
        } catch (err) {
            console.error(err);
        }
        
    };
    


    return(
        <section>
            <h1>Create New Set</h1>
            <div>
                <p>Note: Flash Card Set Name must not repeat any other card set name</p>
                <p>Note: Flash Card Set Name must not have spaces</p>
            </div>

            <div className="new_set_container">
            <form className="new_set_form">
                <div>
                <label>
                    Flash Card Set Name:
                    <input placeholder="Set Name..."  onChange={(e) => {setNewSetName(e.target.value)}}></input>
                </label>
                <label>
                    Question:
                    <input   placeholder="Question..." onChange={(e) => {setNewQuestion(e.target.value)}}></input>
                </label>
                <label>
                    Answer:
                    <input   placeholder="Answer..." onChange={(e) => {setNewAnswer(e.target.value)}}></input>
                </label>
                </div>

                <div className="button">
                <button type="button" onClick={addNewSet} ><span><CreateSetIcon/></span>Create</button>
                </div>
            </form>
            </div>
        </section>
    );
};
export default FCSet;