import { auth, storage } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import EditIcon from "./icons/edit";
import "../styles/AccountSettings.css";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import PersonIcon from "./icons/person";

/* Problem:
When refreshing it does not display the uploaded file anymore, suggestion: save the imageURL to the firestore
    together with the account details.
The images uploaded are not deleted and will accumulate overtime, so it needs to be delete after not used
*/

/* Notes:
The the upload progress shows always and since the input files is ugly anyway, just put it all to
    floating(css) modal.
*/

const AccountSettings = () => {
    const loggedInEmail = auth?.currentUser?.email;
    const [Email, setEmail] = useState(loggedInEmail);
    const [imageUpload, setImageUpload] = useState(null); // during upload
    const [imageURL, setImageURL] = useState(null);
    const [uploadProg, setUploadProg] = useState(0);
    const [isUploading, setIsUploading] = useState(false); //doesn't work

    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth, (userData)=>{
            if(userData){
                setEmail(userData.email);
                
            }
        });
        console.log("AccountSettings: useEffect has run");

        return () => {
            unsubscribe();
        }
    },[loggedInEmail]);

    const uploadImage = () => {


        const date = new Date().toLocaleDateString("es-CL"); //es-CL is to format it by language and country to get hypen instead of slashes
        if(imageUpload == null) return;
        const imageRef = ref(storage, `profilePics/${imageUpload.name + date}`);


        const uploadTask = uploadBytesResumable(imageRef, imageUpload);
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
            setUploadProg(prog);
        }, (error)=> console.log(error), () => {getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            console.log("File URL: ", downloadURL);
            setImageURL(downloadURL);
        });});
        
        /* uploadBytes(imageRef, imageUpload).then(()=>{
            alert("Image Uploaded");
        }) */


    };

    return(
        <section className="account-settings">
            <div className="profile-pic">
                {
                    <img src={imageURL}/> || <PersonIcon/> // doesn't work the displaying of PersonIcon
                }
            </div>
            <p>Change Profile Picture</p>
            <button type><span><EditIcon className="account-icon"/></span></button>
            <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}></input> {/* since you can upload multiple files the files is an array */}
            <button type="button" onClick={uploadImage}>Upload Image</button>

           {/*  {
                isUploading && <h5>Uploading progress: {uploadProg} %</h5>
            } */}
            <h5>Uploading progress: {uploadProg} %</h5>
            
        </section>
    );

}

export default AccountSettings;