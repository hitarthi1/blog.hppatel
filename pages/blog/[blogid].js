import {useState} from 'react'
import {db} from '../../firebase'
import {useRouter} from 'next/router'
import Image from 'next/image'
export default function Blogpage({blog,user,allComments}) {

     const [myComment,setMyComment] = useState('')
     const [allCommentsBlog,setAllComments] = useState(allComments)
     const router = useRouter()
     const { blogid } = router.query
     const makeCommet = async ()=>{
       
        await db.collection('blogs').doc(blogid).collection('comments').add({
             text:myComment,
             name:user.displayName
         })
        const commentQuery = await db.collection('blogs').doc(blogid).collection('comments').get()
        setAllComments(commentQuery.docs.map(docSnap=>docSnap.data()))

     }
    return (
        <div className="container center">
            

            
            
        </div>
    )
}

export async function getServerSideProps() {
    

  }




