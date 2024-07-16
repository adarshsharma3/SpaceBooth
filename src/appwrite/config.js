import { Client, Databases, ID, Query,Storage,ImageGravity,ImageFormat } from "appwrite";
import conf from "../conf/conf";

export class Service{
client=new Client();
databases;
bucket;

constructor(){
this.client
.setEndpoint(conf.appwriteUrl) // Your API Endpoint
.setProject(conf.appwriteProjectId);
this.databases = new Databases(this.client);
this.bucket=new Storage(this.client);
}

async createPost({title,slug,content,featuredImage,status,userId}){
    try{
      return await this.databases.createDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId  //change made here
        {
            title,
            content,
           
            featuredImage,
            status,
            userId
        }, // data
        // ["read("any")"] // permissions (optional)
    );
    }
    catch(error){
        console.log("create post me dikkat");
        // throw error;
    }
}

async updatePost(slug,{title,content,featuredImage,status}){
    try{
    return await this.databases.updateDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
        {
            title,
            slug, //changes made here check!!!
            content,
             featuredImage,
             status
        }, // data (optional)
        // ["read("any")"] // permissions (optional)
    );
    }
    catch(error){
        console.log("Updating database error");
        // throw error;
    }
}

async deletePost(slug){
    try{
     await this.databases.deleteDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug // documentId
    ); // isko hata k dekh lioo ;;;;;;;
    return true;
    }
    catch(error){
        console.log("error in deleteing post");
        return false;
    }
}

async getPost(slug){
    try{
    return await this.databases.getDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug // documentId
         // queries (optional)
    );
    }
    catch(error){
        console.log("Getting document error");
    }
}

async getPosts(queries=[Query.equal("status","active")]){
    try{
     return  await this.databases.listDocuments(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        queries,// [] // queries (optional)
    );
    }
    catch(error){
        console.log("error in getting all documents");

        return false;
    }
}

async uploadFile(file){  //have to pass the actual file here
    try{
 return this.bucket.createFile(
    conf.appwriteBucketId,
    ID.unique(),
    file
);
    }
    catch(error){
        console.log("while uploading file error");
        return false;
    }
}

async deleteFile(fileId){
try{
    await this.bucket.deleteFile(
        conf.appwriteBucketId, // bucketId
        fileId // fileId
    );
    return true;
}
catch{
    console.log("error while deleting file");
    return false;
}
}

getFilePreview(fileId){   //works fast thats why asyncc not needed
    const result = this.bucket.getFilePreview(
        conf.appwriteBucketId, // bucketId
        fileId, // fileId
        0, // width (optional)
        0, // height (optional)
        ImageGravity.Center, // gravity (optional)
        100, // quality (optional)
        15, // borderWidth (optional)
//    '#0000', // borderColor (optional)  dikkat kr raha hai
        100, // borderRadius (optional)
        // 0, // opacity (optional)
        // -360, // rotation (optional)  //issue
        // '', // background (optional)
        // ImageFormat.jpg // output (optional)  //jyaada fayda ni hai iskaa
    );
    return result;
}
}

const service = new Service();
export default service