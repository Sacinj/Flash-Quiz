import { useState } from "react";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

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
            <form >
                <label>
                    Input Question:
                    <input   placeholder="Question..." onChange={(e) => {setNewQuestion(e.target.value)}}></input>
                </label>
                <label>
                    Input Answer:
                    <input   placeholder="Answer..." onChange={(e) => {setNewAnswer(e.target.value)}}></input>
                </label>
                <button type="button" onClick={addQA}>ADD</button>
            </form>

            <p>Add a new collection or cardet</p>
            <form >
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
                <button type="button" onClick={addNewSet}>ADD New Set</button>
            </form>
        </section>
    );
};
export default FCSet;