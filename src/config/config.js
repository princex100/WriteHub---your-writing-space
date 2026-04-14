import { useDispatch, useSelector } from "react-redux";
import { conf } from "../conf.js";
import { Client,ID,TablesDB,Query,Storage } from "appwrite";
import { useId } from "react";



class config{
   client;
   TablesDB;
   storage;
   avatarDB;
   UserDB


   constructor(){
    this.client=new Client()
    .setEndpoint(conf.apprwriteurl)
    .setProject(conf.projectID)

    this.TablesDB=new TablesDB(this.client);
    this.avatarDB=new TablesDB(this.client);
    this.UserDB=new TablesDB(this.client);
    this.storage=new Storage(this.client);
   }

   async createRow({slug,title,content,featuredImage,userId,status}){
    try{
      return await this.TablesDB.createRow({
        databaseId:conf.databaseID,
        tableId:conf.collectionid,
        rowId:slug,
        data:{
          title:title,
          content:content,
          featuredImage:featuredImage,
          status:status,
          userId:userId
        }
      })
    }
    catch(err){
      throw err;
    }
   }

   async listRows(){
    try{
      return await this.TablesDB.listRows({
        databaseId:conf.databaseID,
        tableId:conf.collectionid,
        queries:[
          Query.equal("status","active")
        ]
      
        
        
    })
    }
    catch(err){
      throw err;
    }
   }

   async updaterow({slug,title,content,featuredImage,status}){
    try{
      return await this.avatarDB.updateRow(
        conf.databaseID,
        conf.avatarTableId,
        
        slug,
        {
          title:title,
          content:content,
          featuredImage:featuredImage,
          status:status,
      
          
        }
      )
    }
    catch(err){
      throw err;
    }
   }

     async createAvatar(id,avatar){
    try{
      return await this.avatarDB.createRow({
 databaseId:conf.databaseID,
        tableId:conf.avatarTableId,
        rowId:ID.unique(),
        data:{
          userId:id,
          avatar:avatar
        }
      }
        
      )
    }
    catch(err){
      throw new Error("avatar couldn't be set.")     

    }
   }
     async updateAvatar(id,avatar){
    try{
      console.log(id);
      
      return await this.avatarDB.updateRow(
        conf.databaseID,
        conf.avatarTableId,
        id,
        {
          
          avatar:avatar
        }
             
        
      )
    }
    catch(err){
      throw new Error("avatar couldn't be set.")     

    }
   }

   async deleteRow(slug){
    try {
      return await this.TablesDB.deleteRow({
        databaseId:conf.databaseID,
        tableId:conf.collectionid,
        rowId:slug
      }
      )
    }
    catch(err){
      throw new Error("post couldnt be deleted.")     

    }
   }

   async uploadFile(file){
    try{
      // console.log(file);
      
      return await this.storage.createFile({
        bucketId:conf.bucketID,
        fileId:ID.unique(),
      
        file:file
      })
    }
    catch(err){
throw new Error("image not uploaded.")     
    }
   }
    getfilePreview(featuredImage){
    try{
      return  this.storage.getFilePreview({
        bucketId:conf.bucketID,
        fileId:featuredImage
      })
    }
    catch(err){
      throw err
    }
   }
    async getAvatarUrl(id){
    try{
      let retries=3;
      while(retries>0){
        try {
           return await this.avatarDB.listRows({
        databaseId:conf.databaseID,
        tableId:conf.avatarTableId,
        queries:[
          Query.equal("userId",id)
        ]
      
        
        
    })
        } catch (error) {
          retries--

          if(retries===0)throw error
        }
        await new Promise(res=>setTimeout(res, 800))
      }
    }
    catch(err){
      throw new Error("cant find avatar")
    }
   }

   
   getfileview(featuredImage){
      return this.storage.getFileView({
         bucketId: conf.bucketID,
    fileId: featuredImage,
      })
   }
   async deleteFile(featuredImage){
    try{
      console.log(featuredImage);
      
      return await this.storage.deleteFile({
        bucketId:conf.bucketID,
        fileId:featuredImage
      })
    }
    catch(err){
            throw new Error("cant delete avatar")

    }
   }

   async setUserInfo({email,userId,username,fullname,age,bio,phone,gender,oauth}){
    try{
        const response=await this.UserDB.listRows({
        databaseId:conf.databaseID,
        tableId:conf.userTableId,
        queries:[
          Query.equal("email",email)
        ]
       })

       if(response.rows.length!==0){
         let obj={};

         const field=response.rows[0];
         obj.email=field.email===""?email:""
         obj.age=field.age===""?age:""
         obj.bio=field.bio===""?bio:""
         obj.gender=field.gender===""?gender:""
         obj.username=field.username===""?username:""
         obj.fullname=field.fullname===""?fullname:""
         obj.phone=field.phone===""?phone:""
         obj.oauth=field.oauth===""?oauth:""

         const res=await this.UserDB.updateRow({
        databaseId:conf.databaseID,
        rowId:userId,
        tableId:conf.userTableId,
        data:obj


      });
      return res
       }
       else{
         const res=await this.UserDB.createRow({
        databaseId:conf.databaseID,
        rowId:userId,
        tableId:conf.userTableId,
        data:{
          
             email:email||"",
             bio:bio||"",
             age:age||"",
             gender:gender||"",
             phone:phone||"",
             fullname:fullname||"",
             username:username||"",
             oauth:oauth||""
        }


      });
      return res
       }

      
      return res;
    }
    catch(err){
      throw new Error("user info couldn't be updated.");
    }
  }

  async updateuserInfo({email,userId,username,fullname,age,bio,phone,gender}){
    try{
      console.log(4);
      console.log(email,bio,userId,fullname,username,age,gender);
      
      const res=await this.UserDB.updateRow({
        databaseId:conf.databaseID,
        tableId:conf.userTableId,
        rowId:userId,
        data:        {
          
             email:email,
             bio:bio,
             age:age,
             gender:gender,
             phone:phone,
             fullname:fullname,
             username:username,
        }

      }
         
       

      );
      return true;
    }
    catch(err){
      console.log(5);
      
      throw new Error("user info couldn't be updated.");
    }
  }


  async getUserInfo(id){
    try{
      console.log(id);
      
       return await this.UserDB.listRows({
        databaseId:conf.databaseID,
        tableId:conf.userTableId,
        queries:[
          Query.equal("$id",id)
        ]
       })
    }
    catch(err){
      throw new Error("user info couldn't be fetched.");
    }
  }

   async getUserInfobyEmail(email){
    try{
      // console.log(id);
      
       return await this.UserDB.listRows({
        databaseId:conf.databaseID,
        tableId:conf.userTableId,
        queries:[
          Query.equal("email",email)
        ]
       })
    }
    catch(err){
      throw new Error("user info couldn't be fetched.");
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
  async getUserAuthMethod(email){
    try {
        const res=await this.UserDB.listRows({
          databaseId:conf.databaseID,
        tableId:conf.userTableId,
        queries:[
          Query.equal("email",email)
        ]
        })
      console.log(res);
      if(res.total==0){
        throw new Error("signUp first.")
      }
      return res
      
    } catch (error) {
       throw new Error("signUp first.")
    }
  }
   

}


export const configService=new config();
