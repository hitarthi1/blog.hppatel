import Head from "next/head";
import styles from "../styles/Home.module.css";
import { storage, db, serverTimestamp } from "../firebase";
import { collection,doc, DocumentSnapshot, getDocs,QueryDocumentSnapshot,QuerySnapshot,ref, Timestamp} from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import profilePic from "../public/hp.jpg";

export default function Home() {
 

  return (
    <div className="center">
     

      

      <style jsx>
        {`
            
          .card {
            max-width: 500px;
            margin: 22px auto;
          }
          .title {
            font-family: Alice, Georgia, serif;
            font-size: 49px;
            font-size: 3.0625rem;
          }
          .tagline {
            display: block;
            font-size: 14px;
            font-size: 0.875rem;
            line-height: 1.2em;
            color: #7c7c7c;
            margin: 5px 0 0;
          }
          .img-circle {
            display: block;
            width: 140px;
            height: 140px;
            overflow: hidden;
            border: 9px solid rgba(0, 0, 0, 0.05);
            margin: 0 auto;
          }
          .ss {
            position: relative;
          }
          .user {
            border-radius: 50%;
          }
          .avatar {
            vertical-align: middle;
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }

          p {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        `}
      </style>
    </div>
  )
}


export async function getServerSideProps(context) {
  const storageRef = collection(db,'blogs');
  const q =query(collection(db, 'blogs'))
  // orderBy('titleb', "desc"), limit(3))
  const querySnapshot = await getDocs(q);
 // console.log(q)
 console.log('fwejrghweir')
  console.log(storageRef)
  const Allblogs = querySnapshot.forEach(doc => doc.bodyb)
    console.log(Allblogs)

    return {
      props: {
             
      },
    }
  
}