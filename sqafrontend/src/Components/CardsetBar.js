import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import CardSetIcon from "./icons/cardSet";

export const cardSetTitle = '';


// const CardsetBar = ({userEmail}) => {
const CardsetBar = () => {
    const loggedInEmail = auth?.currentUser?.email; //Needs checking to see if this variable is the best solution to always have userEmail value even after refreshing the page
    const [userEmail, setUserEmail] = useState(loggedInEmail);
    const [cardSetList, setCardSetList] = useState([]);
    const navigate = useNavigate();


    const getCardSets = async () => {
        try {
            //console.log("Inside getCardSets func in upper try block");
            const data = await getDocs(collection(db, "USERS", userEmail, "CARDSETS"));
            //console.log(data);
            const filteredData = data.docs.map((doc)=>({
                id: doc.id,
            }));
            //console.log("Inside getCardSets func in lower try block");
            setCardSetList(filteredData);
            //console.log(filteredData);
        } catch (err) {
            //console.log("Inside getCardSets func in catch block");
            console.error(err);
        }
    }; 
    
    useEffect(() => {
        //console.log("User that is logged in(Before authState): ",userEmail);
        onAuthStateChanged(auth, (userData)=>{
            if(userData){
                //console.log(userData);
                //console.log("THY EMAIL: ",userData.email);
                setUserEmail(userData.email);
                //console.log("The userEmail: ",userEmail);
            } else{
                console.log("CardsetBar: Walay sulod ky wlay email");
            }
        });
        //console.log("Current user(useEffect upper, CardsetBar): ", userEmail);
        if(userEmail){
            getCardSets();
            console.log("CardsetBar: Na get ang cardset");
        }else{
            console.log("CardsetBar: Wala na get ang card set");
        }
        //console.log("Current user(useEffect lower, CardsetBar): ", userEmail);
    }, [loggedInEmail]);

    const getCardSetTitle = (title) => {
        
             cardSetTitle = title;
            console.log("CardsetBar: The title: ", cardSetTitle);
        
    };

    const editSet = (setID) => {
        navigate(`/homelayout/editFC/${setID}`);
    };

    // i cant display only qa becuase its an object and it's the id of the row, only its fields or properties
    return(
        <section className="cardSet_bar">
                
                {
                    cardSetList?.map((set) => (
                        <article className="set_box" key={set.id}>
                            <button type="button" onClick={()=>{editSet(set.id)}}><CardSetIcon /></button>
                            
                            {/* <NavLink to="/homelayout/quiz" onClick={()=>{getCardSetTitle(set.id)}}>{set.id}</NavLink> */}
                            <NavLink className="navlink" to={`/homelayout/quiz/${set.id}`} onClick={()=>{getCardSetTitle(set.id)}}>{set.id}</NavLink>
                        </article>
                    ))
                }
                
        </section>
    );
};

export default CardsetBar;

