import React, { useEffect,useState } from "react";
import { Container,PostCard } from "../components"
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";
import appwriteService from "../appwrite/config"
const override = {
    display: 'block',
    margin: '0 auto',
    marginBottom: '100px', // Adjust this value as needed
  };


function AllPosts(){
    const[loader,setLoader]=useState(true);
const [posts,setPosts]=useState([]);
useEffect(()=>{
    appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents);
        }
        setLoader(false);
    }).catch((error)=>{
        console.log("Error in all posts",error);
    })
    
},[])


if(loader){
    return (
        <div className="flex justify-center items-center h-screen">
            <RingLoader color={'white'} cssOverride={override} size={150} />
          </div>
    )
}

return (
<div className="w-full py-8">
    <Container>
        <div className="flex flex-wrap">
            {posts.map((post)=>{  
                // made some changes
                return (
                    <div key={post.$id} className="p-2 w-1/4">
                        <PostCard {...post}/>
                    </div>
                );
            })}
        </div>
    </Container>
</div>


)
}

export default AllPosts

