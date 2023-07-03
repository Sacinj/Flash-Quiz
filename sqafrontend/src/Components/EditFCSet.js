import { useEffect, useState } from "react";
import { setDoc, doc, deleteDoc, getDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "./icons/delete";
import AddCardIcon from "./icons/addCard";
import "../styles/EditFCSet.css";

//Problems:
// If we refresh the whole page, then add a new Question and Answer then it will modify the the value 
//    of the first question and answer since the value of nextNumber is 1


const EditFCSet = () => {
    const title = useLocation().pathname.split('/')[3];
    const navigate = useNavigate();
    const loggedInEmail = auth?.currentUser?.email;
    const [cardSet, setCardSet] = useState({});
    const [Email, setEmail] = useState(loggedInEmail);
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    const [nextNumber, setNextNumber] = useState(1);
    

        useEffect(()=>{
        
            const unsubscribe = onAuthStateChanged(auth, (userData)=>{
                if(userData){
                    setEmail(userData.email);
                    console.log("EditFCSet: Current User is ", loggedInEmail);
                    getData();
                }
            });
    
            //getData();
            return () => {
                unsubscribe();
            }
        },[loggedInEmail, title, nextNumber]);
    
        const getData = async () => {
            try {
                const docSnap = await getDoc(doc(db, "USERS", Email, "CARDSETS", title));
                if(docSnap.exists()){
                    setCardSet(docSnap.data());
                    console.log("EditFCSet: Data: ", cardSet);

                    const fieldNames = Object.keys(cardSet);
                    console.log(fieldNames);
                    // Extract the numbers from field names
                    const numbers = fieldNames.map((fieldName) => parseInt(fieldName.slice(1)));
                    // Sort the numbers in descending order
                    numbers.sort((a, b) => b - a);
                    // Get the highest number
                    const highestNumber = numbers[0];
                    console.log("This is the highest numebr: ", highestNumber);
                    if(highestNumber){
                        setNextNumber(highestNumber+1);
                        console.log(nextNumber);
                    }
                    


                } else{
                    console.log("EditFCSet no data");
                }
            } catch (err) {
                console.error(err);
            }
        }




    const addQA = async (e) => {
        e.preventDefault();
        console.log("The next number: ", nextNumber);
        let qNumber = 'q'+nextNumber;
        let aNumber = 'a'+nextNumber;
        try {
            await setDoc(doc(db, "USERS", Email, "CARDSETS", title), {
                // ...doc.data,
                [qNumber]: newQuestion,
                [aNumber]: newAnswer,

            }, {merge: true});

            setNextNumber(nextNumber+1);
            setNewAnswer("");
            setNewQuestion("");
        } catch (err) {
            console.error(err);
        } 
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
            <form onSubmit={addQA} className="add2set_form">
                <div>
                <label>
                    Question:
                    <input placeholder="Question..." onChange={(e) => {setNewQuestion(e.target.value)}} value={newQuestion}></input>
                </label>
                <label>
                    Answer:
                    <input placeholder="Answer..." onChange={(e) => {setNewAnswer(e.target.value)}} value={newAnswer}></input>
                </label>
                </div>

                <div className="addButton">
                <button type="submit" ><span><AddCardIcon/></span>ADD</button>
                </div>
            </form>
            </div>



            <h2>Cards</h2>
            <div className="table-container">
                <table className="table-container__table">
                    <tr className="table__heading">
                        <th>Questions</th>
                        <th>Answers</th>
                        <th></th>
                    </tr>
                    <tr>
                    {
                        
                        Object.keys(cardSet).map((key) => (
                            <td key={key}>
                              <p>{key}: {cardSet[key]}</p>
                            </td>
                          ))

                    }
                    </tr>
                    
                    
                </table>
            </div>

        </section>
    );
};

export default EditFCSet;