import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

const CardsetBar = () => {
    const [scienceList, setSubjectList] = useState([]);
    const scienceCollectionRef = collection(db, "Science");

    useEffect(() => {
        const getQAList = async () => {
            try {
                const data = await getDocs(scienceCollectionRef);
                console.log(data);
            } catch (err) {
                console.error(err);
            }
        };
        getQAList();
    }, []);

    return(
        <section className="cardSet_bar">
                
        </section>
    );
};

export default CardsetBar;

/* {
    sets.map((set)=>{
        return(
            <article className="set_box">
                <NavLink className="set_title" onClick={(set)=>{setCardSet(set)}} to="quiz">{set.title}</NavLink>
            </article>
        );
    })
} */