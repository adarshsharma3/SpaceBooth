import React from "react";
import { useEffect,useState } from "react";
import appwriteService from "../appwrite/config"
import {Button ,Container} from "../components/index"
import parse from "html-react-parser";
import { RingLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate,Link } from "react-router-dom";

const override = {
    display: 'block',
    margin: '0 auto',
    marginBottom: '100px', // Adjust this value as needed
  };
export default function Post(){
    const [post,setPost]=useState(null);
    const {slug}=useParams();
    const navigate=useNavigate();
    const [loading,setloading]=useState(true);
    const userData=useSelector((state)=>state.auth.userData);
    const isAuth=post && userData? post.userId===userData.$id :false;

    useEffect(()=>{
        if(slug){
        appwriteService.getPost(slug).then((post)=>{
            if(post) setPost(post);
            else navigate("/");
            setloading(false);
        })
        .catch((error)=>{
            console.log("Error  in post.jsx",error);
            setloading(false);
        })
    }
    else{
        navigate("/");
    }
    
    },[slug,navigate]);

    const deletePost=()=>{
        appwriteService.deletePost(post.$id).then((statuses)=>{
            if(statuses){
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <RingLoader color={'white'} cssOverride={override} size={150} />
          </div>
        );
      }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuth && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 text-white">
                                    Edit
                                </Button>
                            </Link>
                            {" "}
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 text-white underline">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="text-white ">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

