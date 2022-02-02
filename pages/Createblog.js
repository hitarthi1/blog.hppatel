
import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {storage,db,auth} from '../firebase'
import { getStorage, ref,uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { async } from '@firebase/util';
import {  serverTimestamp } from "firebase/firestore";




export default function Createblog({user}) {
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [image,setImage] = useState(null)
    const [url,setUrl] = useState('')
    

const users = auth.currentUser;



useEffect ((user)=>{

   
//      
    async function upload(user){  
         
        const docData = {
        //    titleb: {title},
        //     bodyb:{body},
        //     imageUrl:{url},
        
            titleb:title,
            bodyb:body,
            imageUrl:url,
            postedBy:users.uid,
             createdAt:serverTimestamp()
        };
        
        await setDoc(doc(db, `blogs/${uuidv4()}` ), docData);
        M.toast({html: 'Blog Created',classes:"green"})   
       }
       if(url){
        upload()
       }
    
    
    

 },[url])


     const SubmitDetails = ()=>{
        if (!title || !body || !image){
            M.toast({html: 'please add all the fields',classes:"red"})    
            return
        }



        const storage = getStorage();
        const storageRef = ref(storage);
        const imagesRef = ref(storage, `image/${uuidv4()}`);
        
        const uploadTask = uploadBytesResumable(imagesRef, image);


       uploadTask.on('state_changed', 
       (snapshot) => {
         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         if(progress == '100') M.toast({html: 'Image Uploaded',classes:"green"})    
         
       }, 
       (error) => {
        M.toast({html: error.message,classes:"red"}) 
       }, 


       () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setUrl(downloadURL)
        });
      }
     );
     
    //  async function upload(){      
    //     const docData = {
    //     //    titleb: {title},
    //     //     bodyb:{body},
    //     //     imageUrl:{url},
        
    //         titleb:"title",
    //         bodyb:"title",
    //         imageUrl:url,
    //         // postedBy:{user.uid},
    //         // createdAt:serverTimestamp()
    //     };
    //     await setDoc(doc(db, "blogs","one"), docData);
    //     M.toast({html: 'Blog Created',classes:"green"})   
    //    }
    //   upload();






    }
    return (
        <div className="input-field rootdiv">
            <h3>Create A Blog !!</h3>
            <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e)=>setTitle(e.target.value)}
            
            />
            <textarea
             type="text"
             value={body}
             placeholder="body"
            onChange={(e)=>setBody(e.target.value)}
            
            />
            <div className="file-field input-field">
                <div className="btn #fb8c00 orange darken-1">
                    <span>File</span>
                    <input type="file"  onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
             <button className="btn #fb8c00 orange darken-1" onClick={()=>SubmitDetails()}>Submit Post</button>

             <style jsx>
                 {`
                 
                 .rootdiv{
                     margin:30px auto;
                     max-width:600px;
                     padding:20px;
                     text-align:center;
                 }
                 `}
             </style>

        </div>
    )
}
