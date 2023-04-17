import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";

const CardsetBar = () => {
    const [scienceList, setScienceList] = useState([]);
    const scienceCollectionRef = collection(db, "Science");
    //const cardSetCollectionRef = collection(db, );

    const getQAList = async () => {
        try {
            const data = await getDocs(scienceCollectionRef);
            console.log(data);
            const filteredData = data.docs.map((doc)=>({
                ...doc.data(),
                id: doc.id,
            }));
            setScienceList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getQAList();
    }, []);

    return(
        <section className="cardSet_bar">
            {/* need daw ID */}
                {scienceList.map((qa)=>(
                    <article className="set_box" key={qa.id}>
                        {qa.answer}
                    </article>
                ))}
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