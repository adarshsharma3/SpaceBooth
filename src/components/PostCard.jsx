import React from "react";
// y wahi cards hai jo hum articles ki jgh show kr re hote hai
import appService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({$id,title,featuredImage}){
return(
<Link to={`/post/${$id}`}>
<div className="w-full bg-black bg-opacity-30 border-white rounded-2xl p-4">
    <div className="w-full justify-center mb-4">
<img src={appService.getFilePreview(featuredImage)} alt={title} className="rounded-xl" />

</div>
<h2 className='text-xl font-bold text-white'>{title}</h2>
</div>

</Link>
)

}
export default PostCard
