import {useState} from 'react'
import {db} from '../../firebase'
import {useRouter} from 'next/router'

import { collection, doc, getDoc, setDoc , query, where  } from "firebase/firestore";

export default function Blogpage({blogg,user}) {

    // const [myComment,setMyComment] = useState('')
    //  const [allCommentsBlog,setAllComments] = useState(allComments)
    //  const router = useRouter()
    //  const { blogid } = router.query
    //  //console.log (router.query)
    //  const makeCommet = async ()=>{
    //      const docData={
    //         text:myComment,
    //         name:user.displayName
    //     }; 
    //     await setDoc(collection(db, `blogs/${blogid}`,'comments' ),docData );
    //      const getSnap = await getDoc(cmmm);
 
    //  const allCommentsB = [];
    //   getSnap.docs.forEach(doc => {
    //      allCommentsB.push({...doc.data(),createdAt:doc.data().createdAt.toMillis(),id:doc.id})});
    //     setAllComments(allCommentsB) }

    return (
        <div className="container center">

{blogg.map(blogg=>{
          return(
            <div className="card" key={blogg.createdAt}>
           <h2>{blogg.titleb}</h2>
            <h5>Created On - {new Date(blogg.createdAt).toDateString()}</h5>
            <img src={blogg.imageUrl} alt={blogg.titleb} />
            <p>{blogg.bodyb}</p>
          </div>
          )
        })}
{/* 
             {user?
             <>
             <div className="input-field">
               <input type="text" 
              placeholder="add a comment" 
                 value={myComment} 
               onChange={(e)=>setMyComment(e.target.value)}/>
            </div>
             <button className="btn #fb8c00 orange darken-1" onClick={()=>makeCommet()}>Make comment</button>
             </>
             :<h3>please login to make comments</h3>
             }

            <div className="left-align">

                {allCommentsBlog.map(item=>{
                    return <h6 key={item.name}><span>{item.name}</span> {item.text}</h6>
                })}
             </div> */}

            <style jsx global>
                {`
                span{
                    font-weight:500;
                }
                body{
                    color:orange
                }
                img{
                    width:100%;
                    max-width:500px;
                }
                `}
            </style>
            
         </div>
     )
}

export async function getServerSideProps({params:{blogid}}) {
   
   const ab={blogid}
     const docRef = doc(db,  'blogs','9840dc06-4a6e-4484-b1a8-1340d634f5ab' );

    const docSnap = await getDoc(docRef);
    const blogg =[];
        
if (docSnap.exists()) {
    blogg.push({...docSnap.data(),
        createdAt:docSnap.data().createdAt.toMillis(),
        id:docSnap.id})

    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
       

    //     const cmmm =  doc(collection(db, `blogs/9840dc06-4a6e-4484-b1a8-1340d634f5ab`,'comments' ));
    //      const getSnap = await getDoc(cmmm);
    // const allComments = [];
    //  getSnap.forEach(doc => {
    //     allComments.push({...doc.data(),createdAt:doc.data().createdAt.toMillis(),id:doc.id})
    // });
    return {
      props: {
          blogg
      },
    }
  }




