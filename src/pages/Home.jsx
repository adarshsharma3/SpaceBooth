import React, { useEffect,useState } from "react";
import appwriteService from "../appwrite/config"
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';
import { PostCard,Container } from "../components";
const override = {
    display: 'block',
    margin: '0 auto',
    marginBottom: '100px', // Adjust this value as needed
  };
// import backgroundImage from '../image/BlackSpace.jpg'
function Home(){
    const [posts,setPosts]=useState([]);
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
            setLoading(false);
        })
        .catch((error)=>{
            console.log("Error ocuured in HomePage"+error);
            setLoading(false);
        })

    },[])
    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <RingLoader color={'white'} cssOverride={override} size={150} />
          </div>
        );
      }
    if (posts.length === 0) {
        return (
            <div className=" width-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Sorry No Posts Availaible!! Right Now  OR Maybe You are not Authenticated
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className="w-full py-8 bg-cover bg-center" >
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} /> 
                            {/* spreads the object Here post is the object containing requires value of one post we can also wriet it <PostCard post={post} />  */}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
export default Home

