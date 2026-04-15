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
        console.log(firsttimelogin);
        
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
     
        console.log(firsttimelogin);
      
     if(firsttimelogin===false){
          const session=await this.account.createEmailPasswordSession(
        {
          email:email,
          password:password
        }

      )
console.log(session);

      return session;
     }


        
const userdetails= await configService.getUserInfobyEmail(email)
console.log(userdetails);

      if(userdetails.total===0){
         throw new Error("signUp first.")
      }
        

        // const user=await configService.getUserInfobyEmail(email)
        // console.log(user);
        
       console.log(userdetails);
       
        if(userdetails.rows[0].oauth==="oauth"){
            throw new Error("this aacount was created using google or github.Try again.")
            
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