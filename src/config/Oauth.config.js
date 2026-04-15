import { Account, Client, OAuthProvider } from "appwrite";
import { conf } from "../conf.js";

class OauthService{
  account
  client
  constructor(){
     this.client=new Client()
     .setEndpoint(conf.apprwriteurl)
     .setProject(conf.projectID)

     this.account=new Account(this.client)
  }

  googlelogin=()=>{
    try {
          this.account.createOAuth2Token({
  provider: OAuthProvider.Google,
  success: 'https://write-hub-your-writing-space.vercel.app/oauth',
  failure: 'https://write-hub-your-writing-space.vercel.app/',
})
       return true
    } catch (error) {
       throw new Error("google login failed.Try again.")
    }
  }
   githublogin=()=>{
     try {
       
       this.account.createOAuth2Token({
  provider: OAuthProvider.Github,
  success: 'https://write-hub-your-writing-space.vercel.app/oauth',
  failure: 'https://write-hub-your-writing-space.vercel.app/',
})
       return true

    } catch (error) {
       throw new Error("github login failed.Try again.")
      
    }
  }

  getUserdata=async()=>{
    let retries=3;
     while (retries > 0) {
    try {
      
        const user=await this.account.get()
        return user
      
    } catch (error) {
      retries--
      if (retries === 0) {
        return null
      }
      // wait 800ms then try again
      await new Promise(res => setTimeout(res, 900))
    }
  }
    
  }

  createAndGetSession=async({userId,secret})=>{
    let retries=3;
     while (retries > 0) {
    try {
       const session=await this.account.createSession({userId,secret})
      if(session){
        const user=await this.account.get()
        
        return user
      }
    } catch (error) {
      retries--
      if (retries === 0) {
        return null
      }
      // wait 800ms then try again
      await new Promise(res => setTimeout(res, 900))
    }
  }
    
  }

  deletesesssions=async()=>{
    try {
      await this.account.deleteSessions()
      
    } catch (error) {
      throw error
    }
  }

}

export const oAuthservice=new OauthService()