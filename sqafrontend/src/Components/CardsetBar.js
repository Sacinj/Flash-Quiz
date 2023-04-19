import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";

// const CardsetBar = ({userEmail}) => {
const CardsetBar = () => {
    const userEmail = auth?.currentUser?.email;
    
    //const cardSetCollectionRef = collection(db, "USERS", userEmail, "CARDSETS");
    const [cardSetList, setCardSetList] = useState([]);

    const getCardSets = async () => {
        try {
            console.log("Inside getCardSets func in upper try block");
            //const data = await getDocs(cardSetCollectionRef);
            const data = await getDocs(collection(db, "USERS", userEmail, "CARDSETS"));
            console.log(data);
            const filteredData = data.docs.map((doc)=>({
                id: doc.id,
            }));
            console.log("Inside getCardSets func in lower try block");
            setCardSetList(filteredData);
            console.log(filteredData);
        } catch (err) {
            console.log("Inside getCardSets func in catch block");
            console.error(err);
        }
    }; 

    useEffect(() => {
        console.log("Current user(useEffect upper, CardsetBar): ", userEmail);
        if(userEmail){
            getCardSets();
        }
        
        console.log("Current user(useEffect lower, CardsetBar): ", userEmail);
    }, []);


    // i cant display only qa becuase its an object, only its fields or properties
    return(
        <section className="cardSet_bar">
                
                {
                    cardSetList?.map((set) => (
                        <article className="set_box" key={set.id}>
                            {set.id}
                        </article>
                    ))
                }
                
        </section>
    );
};

export default CardsetBar;

