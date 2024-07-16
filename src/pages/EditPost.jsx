import React from "react";
import { useEffect,useState } from "react";
import { Container,PostForm } from "../components";
import { useNavigate,useParams } from "react-router-dom";
import appwriteService from '../appwrite/config';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';
const override= css`
display:block;
margin:0 auto;
`;
function EditPosts(){
    const [loader,setLoader]=useState(true)
    const [post,setPosts]=useState(null);
    const {slug}=useParams();
    const naviagte=useNavigate();

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                    setLoader(false);
                }
            }).catch((error)=>{
              console.log("error while editing a post",error)
              setLoader(false);
            })
        }else{
            naviagte('/');
        }
       
    },[slug,naviagte])
if(loader){
    return (
<div className="flex justify-center items-center h-screen  ">
  <RingLoader color={'white'} css ={override} size={150} />
</div>
    )
}
    return post?(
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ):null
}

export default EditPosts