import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, auth } from "../../firebase";
import { useRouter } from "next/router";
//import Image from "next/image";

import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  lim,
  getDocs,
} from "firebase/firestore";
import {
  Box,
  Container,
  Text,
  Circle,
  Heading,
  Center,
  Image,
} from "@chakra-ui/react";

export default function Blogpage({ blogg, user, allComments }) {
  const [myComment, setMyComment] = useState("");
  const [allCommentsBlog, setAllComments] = useState(allComments);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    console.log("omamajo", router.query.blogid);
  }, [router.isReady]);

  const users = auth.currentUser;
  //const { blogid } = router.query.Blogid;

  console.log("blog", blogg);
  console.log("comments", allComments);

  const makeCommet = async () => {
    const docData = {
      text: myComment,
      name: users.uid,
    };
    const docRef = doc(db, "blogs", `${router.query.blogid}`);
    //const docuref =collection(db, "blogs",`${blogid}`,"comments");
    const cmmm = await setDoc(doc(docRef, "comments", `${uuidv4()}`), docData);

    const cnn = collection(db, "blogs", `${router.query.blogid}`, "comments");
    const getSnap = await getDocs(cnn);

    const allCommentsB = [];
    getSnap.forEach((doc) => {
      allCommentsB.push({ ...doc.data(), id: doc.id });
    });
    setAllComments(allCommentsB);
  };

  return (
    <div className="center">
     
      {blogg.map((blogg) => {
        return (
          <div className="card " key={blogg.id}>
            <span className="card-title    orange-text  #e65100-text text-darken-4 ">
              <div className="row">
                <div className="col s3">
                  {new Date(blogg.createdAt).toDateString()}
                </div>
                <div className="col s6"> {blogg.titleb}</div>
              </div>
            </span>
           

            <p className="card-content black-text "> {blogg.bodyb}</p>
          </div>
        );
      })}

      {user ? (
        <>
          <div className="input-field">
            <input
              type="text"
              placeholder="add a comment"
              value={myComment}
              onChange={(e) => setMyComment(e.target.value)}
            />
          </div>
          <button
            className="btn #263238 blue-grey darken-4"
            onClick={() => makeCommet()}
          >
            Make comment
          </button>
        </>
      ) : (
        <h3>please login to make comments</h3>
      )}

      <hr />
      <div className="left-align">
        {allCommentsBlog.map((item) => {
          return (
            <h6 key={item.name}>
              <span>{item.name}</span> {item.text}
            </h6>
          );
        })}
      </div>

      <style jsx global>
        {`
          .span {
            font-weight: 500;
          }
          .body {
            color: black;
          }
          .img {
            width: 100%;
            max-width: 500px;
          }
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const Blogid = params.blogid;

  console.log(Object.values(params));

  console.log("1", `${Blogid}`);
  console.log("2", `${params.Blogid}`);

  const docRef = doc(db, "blogs", `${Blogid}`);

  const docSnap = await getDoc(docRef);
  const blogg = [];

  if (docSnap.exists()) {
    blogg.push({
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id,
    });

    // console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }

  const cmmm = collection(db, "blogs", `${Blogid}`, "comments");
  const getSnap = await getDocs(cmmm);
  const allComments = [];
  getSnap.forEach((doc) => {
    allComments.push({ ...doc.data(), id: doc.id });
  });
  return {
    props: {
      blogg,
      allComments,
    },
  };
}

// {blogg.map((blogg) => {
//   return (
//     <div className="card " key={blogg.id}>
//       <span className="card-title    orange-text  #e65100-text text-darken-4 ">
//         <div className="row">
//           <div className="col s3">
//             {new Date(blogg.createdAt).toDateString()}
//           </div>
//           <div className="col s6"> {blogg.titleb}</div>
//         </div>
//       </span>
//       {/* <Image

//         src={blogg.imageUrl}
//         alt="Picture of the author"
//         width={500}
//         height={500}
//       /> */}

//       <p className="card-content black-text "> {blogg.bodyb}</p>
//     </div>
//   );
// })}
