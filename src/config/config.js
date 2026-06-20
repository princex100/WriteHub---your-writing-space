import { conf } from "../conf.js";
import { Client,ID,TablesDB,Query,Storage } from "appwrite";

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

   async listRows(){
      return await this.TablesDB.listRows({
        databaseId:conf.databaseID,
        tableId:conf.collectionid,
        queries:[
          Query.equal("status","active")
        ]
    })
   }

   async updaterow({slug,title,content,featuredImage,status}){
      return await this.TablesDB.updateRow( 
        conf.databaseID,
        conf.collectionid, 
        slug,
        {
          title:title,
          content:content,
          featuredImage:featuredImage,
          status:status,
        }
      )
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
      })
    }
    catch {
      throw new Error("avatar couldn't be set.")
    }
   }

   async updateAvatar(id,avatar){
    try{

      return await this.avatarDB.updateRow(
        conf.databaseID,
        conf.avatarTableId,
        id,
        {
          avatar:avatar
        }
      )
    }
    catch {
      throw new Error("avatar couldn't be set.")
    }
   }

   async deleteRow(slug){
    try {
      return await this.TablesDB.deleteRow({
        databaseId:conf.databaseID,
        tableId:conf.collectionid,
        rowId:slug
      })
    }
    catch {
      throw new Error("post couldnt be deleted.")
    }
   }

   async uploadFile(file){
    try{

      return await this.storage.createFile({
        bucketId:conf.bucketID,
        fileId:ID.unique(),
        file:file
      })
    }
    catch {
      throw new Error("image not uploaded.")
    }
   }

   getfilePreview(featuredImage){
      return this.storage.getFilePreview({
        bucketId:conf.bucketID,
        fileId:featuredImage
      })
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
    catch {
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

      return await this.storage.deleteFile({
        bucketId:conf.bucketID,
        fileId:featuredImage
      })
    }
    catch {
      throw new Error("cant delete avatar")
    }
   }

   async setUserInfo({email,userId,username,fullname,age,bio,phone,gender,oauth}){
      const response=await this.UserDB.listRows({
        databaseId:conf.databaseID,
        tableId:conf.userTableId,
        queries:[
          Query.equal("$id",userId)
        ]
      })

      if(response.rows.length!==0){
         let obj={};

         const field=response.rows[0];

         obj.email=field.email===""?email:field.email
         obj.age=field.age===""?age:field.age
         obj.bio=field.bio===""?bio:field.bio
         obj.gender=field.gender===""?gender:field.gender
         obj.username=field.username===""?username:field.username
         obj.fullname=field.fullname===""?fullname:field.fullname
         obj.phone=field.phone===""?phone:field.phone
         obj.oauth=field.oauth===""?oauth:field.oauth

         const res=await this.UserDB.updateRow({
           databaseId:conf.databaseID,
           rowId:userId,
           tableId:conf.userTableId,
           data:obj
         });
         return res
      }
       else{
         await this.UserDB.createRow({
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
      }
  }

  async updateuserInfo({email,userId,username,fullname,age,bio,phone,gender}){
      await this.UserDB.updateRow({
        databaseId:conf.databaseID,
        tableId:conf.userTableId,
        rowId:userId,
        data:{
          email:email,
          bio:bio,
          age:age,
          gender:gender,
          phone:phone,
          fullname:fullname,
          username:username,
        }
      });

      return true; 
  }

  async getUserInfo(id){
      return await this.UserDB.listRows({
        databaseId:conf.databaseID,
        tableId:conf.userTableId,
        queries:[
          Query.equal("$id",id)
        ]
      })
  }

   async getUserInfobyEmail(email){
      return await this.UserDB.listRows({
        databaseId:conf.databaseID,
        tableId:conf.userTableId,
        queries:[
          Query.equal("email",email)
        ]
      })
  }

   async getAccount(){
      return await this.account.get(); 
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


      if(res.total==0){
        throw new Error("signUp first.")
      }
      return res

    } catch {
      throw new Error("signUp first.") // original error lost
    }
  }
}

export const configService=new config();
