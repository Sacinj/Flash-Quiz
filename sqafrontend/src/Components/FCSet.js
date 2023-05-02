import { useState } from "react";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import "../styles/FCSet.css";

const FCSet = () => {
    const [newQuestion, setNewQuestion] = useState("");
    const [newAnswer, setNewAnswer] = useState("");
    const [newSetName, setNewSetName] = useState("");
    const scienceCollectionRef = doc(collection(db, "Science"));
    

    const addQA = async () => {
        try {
            await setDoc(scienceCollectionRef,{
                answer: newAnswer,
                question: newQuestion,
            });
            console.log("added");
            console.log(newQuestion);
            console.log(newAnswer);
        } catch (err) {
            console.error(err);
        }
    };

    const addNewSet = async () => {
        try {
            await setDoc(doc(collection(db, newSetName)),{
                answer: newAnswer,
                question: newQuestion,
            });
            console.log("added");
            console.log(newQuestion);
            console.log(newAnswer);
        } catch (err) {
            console.error(err);
        }
    };

    

    return(
        <section>
            <p>this is the flash card set page for adding questions and aswers</p>
            <div className="add2set_container">
            <form className="add2set_form">
                <div>
                <label>
                    Input Question:
                    <input   placeholder="Question..." onChange={(e) => {setNewQuestion(e.target.value)}}></input>
                </label>
                <label>
                    Input Answer:
                    <input   placeholder="Answer..." onChange={(e) => {setNewAnswer(e.target.value)}}></input>
                </label>
                </div>

                <div className="select_submit">
                <label>
                    <select name="FCSet">
                        <option value="" disabled selected hidden>Choose a Set</option>
                    </select>
                </label>
                <button type="button" onClick={addQA}>ADD</button>
                </div>
            </form>
            </div>

            <p>Add a new collection or cardet</p>

            <div className="new_set_container">
            <form className="new_set_form">
                <div>
                <label>
                    Input Set Name:
                    <input placeholder="Set Name..."  onChange={(e) => {setNewSetName(e.target.value)}}></input>
                </label>
                <label>
                    Input Question:
                    <input   placeholder="Question..." onChange={(e) => {setNewQuestion(e.target.value)}}></input>
                </label>
                <label>
                    Input Answer:
                    <input   placeholder="Answer..." onChange={(e) => {setNewAnswer(e.target.value)}}></input>
                </label>
                </div>

                <div className="button">
                <button type="button" onClick={addNewSet}>ADD New Set</button>
                </div>
            </form>
            </div>
        </section>
    );
};
export default FCSet;