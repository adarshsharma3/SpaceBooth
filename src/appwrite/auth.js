import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
export class AuthServices{
client=new Client();
account;

constructor(){
    this.client 
     .setEndpoint(conf.appwriteUrl) // Your API Endpoint
    .setProject(conf.appwriteProjectId);
    this.account=new Account(this.client);  
}

async createAccount({email,password,name}){
try{
const userAccount=await this.account.create(ID.unique(),email,password,name);
if(userAccount){
    return this.login({email,password});
}
else{
    return userAccount;
}
}
catch(error){
    console.log("create account me error");
throw error;
}

}

async login({email,password}){
try{
return await this.account.createEmailPasswordSession(email,password); //check for errorr!!
}
catch(error){
    console.log("login me problem");
    throw error;
}
}

async getCurrentUser(){
    try{
    return await this.account.get();
    }
    catch(error){
        console.log("Guest User most Probably")
        console.log("DIKKAT Appwrite serive :: getCurrentUser :: error", error);
        // throw error;
        return null; 
    }
    //try commenting this line out
}

async logout(){
    try{
     return await this.account.deleteSessions();
    }
    catch(error){
        console.log("error logout");
        throw error;
    }
}

}
const authService= new AuthServices();

export default authService