import {Client,Account, ID} from "appwrite"
import { conf } from "../conf";
import { configService } from "./config";
import { useSelector } from "react-redux";

class authService{
  client;
  account;

  constructor(){
    this.client=new Client()
                     .setEndpoint(conf.apprwriteurl)
                     .setProject(conf.projectID)

    this.account=new Account(this.client);

  }

  async createAccount({email,password,name,firsttimelogin}){
    try{
       const data=await this.account.create(
        {
          userId:ID.unique(),
          email:email,
          password:password,
          name:name
        }
       );
       if(data){
        console.log("in login");
        
       const a=await this.login({email,password,firsttimelogin})
       console.log("after login");
       
        return data;
       }

    }
    catch(err){
      throw err;
    }
  }
  
  async login({email,password,firsttimelogin}){
      //  console.log("after login");

    try{
      // console.log("in try");
      
        // console.log(!res)
        // console.log(oauthmethod);
        
        // if(oauthmethod==="google"){
        //     throw new Error("this aacount was created using google.Try to login using google.")
        // }
        // else if(oauthmethod==="github"){
        //     throw new Error("this aacount was created using github.Try to login using github.")

        // }
        // console.log("before session");
        const userdetails=null
        if(firsttimelogin===false){
 userdetails= await configService.getUserInfobyEmail(email)
      if(userdetails.total===0){
         throw new Error("signUp first.")
      }
        }

        const user=await configService.getUserInfobyEmail(email)
        if(user.total===0){
          throw new Error("signUp first.")
        }
        if(user.rows[0].oauth==="google"){
            throw new Error("this aacount was created using google.Try to login using google.")
            
        }
        else if(user.rows[0].oauth==="github"){
            throw new Error("this aacount was created using github.Try to login using github.")
             
        }
      
      const session=await this.account.createEmailPasswordSession(
        {
          email:email,
          password:password
        }

      )
console.log(session);

      return session;
    }
    catch(err){
      throw new Error("signup");
    }
    
  }

  async logout(){
    try{
      const res=await this.account.deleteSessions();
      return res;
    }
    catch(err){
      return err;
    }
  }
  async getAccount(){
    try{
      return await this.account.get();
    }
    catch(err){
      throw err;
    }
  }

  // async getuserAuthmethod(){
  //   try {
  //      await this.account.l
  //   } catch (error) {
      
  //   }
  // }

  

}


const authservice=new authService();
export {authservice};