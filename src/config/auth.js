// 🔹 Appwrite SDK imports
import { Client, Account, ID } from "appwrite"

// 🔹 Config
import { conf } from "../conf"

// 🔹 Custom backend service
import { configService } from "./config"

// 🔹 Redux (not used here ⚠️)

class authService {

  // 🔹 Class properties
  client;
  account;

  constructor() {

    // 🔹 Initialize Appwrite client
    this.client = new Client()
      .setEndpoint(conf.apprwriteurl)
      .setProject(conf.projectID)

    // 🔹 Initialize Account service
    this.account = new Account(this.client);
  }

  // 🔹 Create new account + auto login
  async createAccount({ email, password, name, firsttimelogin }) {
      // 🔹 Create user in Appwrite
      const data = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (data) {

      

        // 🔹 Auto login after signup
        await this.login({ email, password, firsttimelogin })


        return data;
      }
  }

  // 🔹 Login function (handles both normal + special cases)
  async login({ email, password, firsttimelogin }) {

    try {

    

      // 🔹 Case: first time login = false → direct login
      if (firsttimelogin === false) {

        const session = await this.account.createEmailPasswordSession(
          email,
          password
        )


        return session;
      }

      // 🔹 Fetch user details from DB
      const userdetails = await configService.getUserInfobyEmail(email)

    
      // 🔹 If user not found
      if (userdetails.total === 0) {
        throw new Error("signUp first.")
      }

     

      // 🔹 Check if account was created via OAuth
      if (userdetails.rows[0].oauth === "oauth") {
        throw new Error("this aacount was created using google or github.Try again.")
      }

      // 🔹 Normal login
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      )

      

      return session;

    }
    catch {

      throw new Error("signup");
    }
  }

  // 🔹 Logout user (delete all sessions)
  async logout() {
    try {
      const res = await this.account.deleteSessions();
      return res;
    }
    catch (err) {

      throw new Error(err.message)
    }
  }

  // 🔹 Get current logged-in user
  async getAccount() {
      return await this.account.get();
  }

  
}

// 🔹 Export singleton instance
const authservice = new authService();
export { authservice };