import { useEffect, useState } from "react";
import { setDoc, doc, deleteDoc, getDoc, updateDoc, deleteField, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "./icons/delete";
import AddCardIcon from "./icons/addCard";
import "../styles/EditFCSet.css";

//Problems:
// The questions and answers are correctly displayed by row as a pair but not by column. Pero ok na yan ahahha
// No warning yet about empty input fields and then adding the question. Dont try adding with empty input
// When you delete a question and answer pair the qa field names will have skips but when you add a new
//      qa it will follow what's the highest qa field, so it's all good tho it;s a potential issue in the Quiz.js
// Note:
// The console logs that are commented out may not reflect what's on the app's displayed on the screen but it
//      works na regardless of the mentioned problems/issues above


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
                    // console.log("EditFCSet: Current User is ", loggedInEmail);
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

                    const docData = docSnap.data();
                    const orderedData = {};

                    // The most ok code. correct rows but wrong columns
                    Object.keys(docData)
                    .sort((a, b) => {
                        const aNum = parseInt(a.substring(1));
                        const bNum = parseInt(b.substring(1));
                        return aNum - bNum;
                    })
                    .forEach((key) => {
                        orderedData[key] = docData[key];
                    });

                    setCardSet(orderedData);

                    // console.log("EditFCSet: Data: ", cardSet);


                    const fieldNames = Object.keys(docSnap.data());
                    // console.log(fieldNames);
                    // Extract the numbers from field names
                    const numbers = fieldNames.map((fieldName) => parseInt(fieldName.slice(1)));
                    // Sort the numbers in descending order
                    numbers.sort((a, b) => b - a);
                    // Get the highest number
                    const highestNumber = numbers[0];
                    // console.log("This is the highest numebr: ", highestNumber);
                    if(highestNumber){
                        setNextNumber(highestNumber+1);
                        // console.log(nextNumber);
                    }
                    
                    // console.log("The docSnap: ", docSnap.data());

                } else{
                    console.log("EditFCSet no data");
                }
            } catch (err) {
                console.error(err);
            }
        }

    const addQA = async (e) => {
        e.preventDefault();
        // console.log("The next number: ", nextNumber);
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

    const deleteQA = async (key) => {
        
        try{
            const number = parseInt(key.slice(1));
            const aField = "a"+number;
            const qField = "q"+number;
            await updateDoc(doc(db, "USERS", Email, "CARDSETS", title), {
                [aField]: deleteField(),
                [qField]: deleteField()
            })
            getData(); // to reload the component so that the display is updated
            
        } catch (err) {
            console.error(err);
        }
    };

    return(
        <section>
            <div>
                <h1>{title}</h1>
                <button type="button" onClick={deleteSet} className="editFCSet_button"><span><DeleteIcon/></span>Delete Set</button>
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
                <button type="submit" className="editFCSet_button" ><span><AddCardIcon/></span>ADD</button>
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

                    {/* This is the partner of the most ok code from the codes above */}
                    {Object.keys(cardSet).map((key, index) => (
                        index % 2 === 0 ? (
                            <tr key={key}>
                            <td>{key}: {cardSet[key]}</td>
                            {Object.keys(cardSet).length > index + 1 && (
                                <td>{Object.keys(cardSet)[index + 1]}: {cardSet[Object.keys(cardSet)[index + 1]]}</td>
                            )}
                            <td><button type="button" onClick={()=> {deleteQA(key)}} className="editFCSet_button"><span><DeleteIcon/></span></button></td>
                            </tr>
                        ) : null
                        ))}

                    
                </table>
            </div>

        </section>
    );
};

export default EditFCSet;