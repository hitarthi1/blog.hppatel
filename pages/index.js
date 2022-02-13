import Head from "next/head";
import styles from "../styles/Home.module.css";
import { storage, db, serverTimestamp } from "../firebase";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot,
  ref,
  Timestamp,
} from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaFirefoxBrowser,
  FaGithub,
} from "react-icons/fa";
import { extendTheme } from "@chakra-ui/react";
//import Image from "next/image";
import {
  Box,
  Container,
  Text,
  Circle,
  Heading,
  Center,
  Image,
  Button,
} from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
const TeamData = {
  name: "Hitarthi Patel",
  profileLink: "https://linkedin.com/in/hitarthi-patel-a223411a6",
  profileLink2: "https://github.com/hitarthi1",
  imageLink: "collobrator/hp.jpg",
  socialType2: "FaGithub",
  socialType1: "linkedin",
};

export default function Home({ Allblogs }) {
  function getIcon(socialType) {
    // const socialType = "twitter";
    switch (socialType) {
      case "twitter":
        return <FaTwitter />;
      case "linkedin":
        return <FaLinkedin />;
      case "FaGithub":
        return <FaGithub />;

      default:
        return null;
    }
  }
  function Feature({ title, img,id, ...rest }) {
    return (
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}
        shadow="md"
        flex="1"
        {...rest}
      >
        <Image mt={4} boxSize="350px"src={img} />
        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
             <Link href={`/blog/${id}`}>
           {title} 
            </Link>
          </Box>
        </Box>
      </Box>
    );
  }
  
  const theme = extendTheme({
    textStyles: {
      h1: {
        // you can also use responsive styles
        fontSize: ["48px", "72px"],
        fontWeight: "bold",
        lineHeight: "110%",
        letterSpacing: "-2%",
      },
      h2: {
        fontSize: ["36px", "48px"],
        fontWeight: "semibold",
        lineHeight: "110%",
        letterSpacing: "-1%",
      },
    },
  });

  return (
    <div className="center">
      <Container
        bg="#FAFAFA"
        maxW="container.xl"
        px={{ base: "6", "2xl": "0" }}
        mb="8"
      >
        <Center>
          <HStack spacing="24px">
            <Circle size="200px" borderWidth="3px" borderColor="yellow">
              <Image
                borderRadius="50%"
                boxSize="150px"
                src={TeamData.imageLink}
                alt="Dan Abramov"
              />
            </Circle>

            <VStack spacing={4} align="flex-start">
              <VStack align="flex-start">
                <Heading>Acha Laga? Share Karo!</Heading>
                <Text>By Hitarthi Patel</Text>
              </VStack>
              <Text>I always have something interesting to tell you!!</Text>
              <Text>  ISSUES </Text>
              <SimpleGrid columns={[1, 2]} spacing="1px">
                <Button
                  colorScheme="linkedin"
                  leftIcon={getIcon(TeamData.socialType1)}
                  onClick={() => {
                    window.open(TeamData.profileLink, "_blank");
                  }}
                >
                  {TeamData.name}
                </Button>
                <Button
                  colorScheme="linkedin"
                  leftIcon={getIcon(TeamData.socialType2)}
                  onClick={() => {
                    window.open(TeamData.profileLink2, "_blank");
                  }}
                >
                  {TeamData.name}
                </Button>
              </SimpleGrid>
            </VStack>
          </HStack>
        </Center>
      </Container>

      <Container>
        <Text>Previous Issues</Text>
        <HStack spacing={8}>
          {Allblogs.map((blog, i) => {
            if (i < 3) {
              return <Feature title={blog.titleb} img={blog.imageUrl}   id ={blog.id}/>;
            }
          })}
        </HStack>
      </Container>

      <Container>
        <VStack spacing="50px">
          {Allblogs.map((blog, i) => {
            if (i > 2) {
              return (
                <HStack key={blog.createdAt} spacing="50px">
                  <Box w="90px" h="40px">
                    <Text>{new Date(blog.createdAt).toDateString()}</Text>
                  </Box>
                  <Box w="90px" h="40px">
                    <Link href={`/blog/${blog.id}`}>{blog.titleb}</Link>
                  </Box>
                  <Box w="40px" h="40px">
                    <Text>#{i}</Text>
                  </Box>
                </HStack>
              );
            }
          })}
        </VStack>
      </Container>
      
      <style jsx>
        {`
          .card {
            max-width: 500px;
            margin: 22px auto;
          }
          .span {
            font-weight: 500;
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
  );
}

export async function getServerSideProps(context) {
  const storageRef = collection(db, "blogs");
  const q = query(collection(db, "blogs"), orderBy("titleb", "desc"));
  const querySnapshot = await getDocs(q);
  // console.log(q)

  // console.log(storageRef)
  const Allblogs = [];
  querySnapshot.forEach(
    (doc) => {
      Allblogs.push({
        ...doc.data(),
        createdAt: doc.data().createdAt.toMillis(),
        id: doc.id,
      });
    }

    // return {
    //   ...doc.data(),
    //   createdAt:doc.data().createdAt.toMillis(),
    //   id:doc.id
    // }
    // }
  );

  return {
    props: {
      Allblogs,
    },
  };
}
