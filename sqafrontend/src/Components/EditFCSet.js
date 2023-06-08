import { useEffect, useState } from "react";
import { setDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "./icons/delete";
import AddCardIcon from "./icons/addCard";


const EditFCSet = () => {
    const title = useLocation().pathname.split('/')[3];
    const navigate = useNavigate();
    const loggedInEmail = auth?.currentUser?.email;
    const [cardSet, setCardSet] = useState({});
    const [Email, setEmail] = useState(loggedInEmail);
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    
    useEffect(()=>{
        
        onAuthStateChanged(auth, (userData)=>{
            if(userData){
                setEmail(userData.email);
                console.log("EditFCSet: Current User is ", loggedInEmail);
            }
        });

        getData();
    },[loggedInEmail]);

    const getData = async () => {
        try {
            const docSnap = await getDoc(doc(db, "USERS", loggedInEmail, "CARDSETS", title));
            if(docSnap.exists()){
                setCardSet(docSnap.data());
                console.log("EditFCSet: Data: ", cardSet);
            } else{
                console.log("EditFCSet no data");
            }
        } catch (err) {
            console.error(err);
        }
    }

    /* useEffect(()=>{
        getData();
    },[]) */

    const addQA = async () => {
        /* try {
            await setDoc(scienceCollectionRef,{
                answer: newAnswer,
                question: newQuestion,
            });
            console.log("added");
            console.log(newQuestion);
            console.log(newAnswer);
        } catch (err) {
            console.error(err);
        } */
    };
    const deleteSet = async () => {
        try{
            await deleteDoc(doc(db,"USERS", loggedInEmail, "CARDSETS",title ));
            navigate("/homelayout/quiz");
            window.location.reload(true); // to refresh the page to update the card set list that is displayed
        } catch (err) {
            console.error(err);
        }
    };

    return(
        <section>
            <div>
                <h1>{title}</h1>
                <button type="button" onClick={deleteSet}><span><DeleteIcon/></span>Delete Set</button>
            </div>
            
            <div className="add2set_container">
            <form className="add2set_form">
                <div>
                <label>
                    Question:
                    <input placeholder="Question..." onChange={(e) => {setNewQuestion(e.target.value)}}></input>
                </label>
                <label>
                    Answer:
                    <input placeholder="Answer..." onChange={(e) => {setNewAnswer(e.target.value)}}></input>
                </label>
                </div>

                <div className="addButton">
                <button type="button" onClick={addQA}><span><AddCardIcon/></span>ADD</button>
                </div>
            </form>
            </div>

            <h2>Cards</h2>
            <div>
                <div>
                    <p>Questions:</p>
                    <p>Answers:</p>
                </div>
                <div>
                    {
                        /* cardSet?.map((field)=>(
                            <article>
                                <p>{field}</p>
                            </article>
                        )) */


                            /* What to do here is to display the fields of this document and then get the 
                            number of the last question in order to know the next field name/number of
                            the new question and answer to be added by incrementing */

                    }
                </div>
            </div>
        </section>
    );
};

export default EditFCSet;