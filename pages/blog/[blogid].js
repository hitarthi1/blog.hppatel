import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, auth } from "../../firebase";
import { useRouter } from "next/router";

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

export default function Blogpage({ blogg, user, allComments }) {
  const [myComment, setMyComment] = useState("");
  const [allCommentsBlog, setAllComments] = useState(allComments);
  const router = useRouter();

  const users = auth.currentUser;
  //const { blogid } = router.query.Blogid
  console.log("omamajo", router.query.Blogid);

  const makeCommet = async () => {
    const docData = {
      text: myComment,
      name: users.uid,
    };
    const docRef = doc(db, "blogs", `${router.query.Blogid}`);
    //const docuref =collection(db, "blogs",`${blogid}`,"comments");
    const cmmm = await setDoc(doc(docRef, "comments", `${uuidv4()}`), docData);

    const cnn = collection(db, "blogs", `${router.query.Blogid}`, "comments");
    const getSnap = await getDocs(cnn);

    const allCommentsB = [];
    getSnap.forEach((doc) => {
      allCommentsB.push({ ...doc.data(), id: doc.id });
    });
    setAllComments(allCommentsB);
  };

  return (
    <div className="container center">
      {blogg.map((blogg) => {
        return (
          <div className="card " key={blogg.createdAt}>
            <span className="card-title    orange-text  #e65100-text text-darken-4 ">
              <div className="row">
                <div className="col s3"> {new Date(blogg.createdAt).toDateString()}</div>
                <div className="col s6"> {blogg.titleb}</div>
               
              </div>
            </span>
            <img src={blogg.imageUrl} boxSize="220px" alt={blogg.titleb} />

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
          <button className="btn #000000 black" onClick={() => makeCommet()}>
            Make comment
          </button>
        </>
      ) : (
        <h3 className="card-content black-text ">
          please login to make comments
        </h3>
      )}

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
  const Blogid = params.Blogid;

  //console.log(`${Blogid}`);

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
