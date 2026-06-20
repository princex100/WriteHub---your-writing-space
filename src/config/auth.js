import { Client, Account, ID } from "appwrite"import { conf } from "../conf"import { configService } from "./config"
class authService {  client;
  account;

  constructor() {    this.client = new Client()
      .setEndpoint(conf.apprwriteurl)
      .setProject(conf.projectID)    this.account = new Account(this.client);
  }  async createAccount({ email, password, name, firsttimelogin }) {    const data = await this.account.create({
      userId: ID.unique(),
      email: email,
      password: password,
      name: name
    });

    if (data) {      await this.login({ email, password, firsttimelogin })


      return data;
    }
  }  async login({ email, password, firsttimelogin }) {

    try {      if (firsttimelogin === false) {

        const session = await this.account.createEmailPasswordSession({
          email: email,
          password: password
        })


        return session;
      }      const userdetails = await configService.getUserInfobyEmail(email)      if (userdetails.total === 0) {
        throw new Error("signUp first.")
      }      if (userdetails.rows[0].oauth === "oauth") {
        throw new Error("this aacount was created using google or github.Try again.")
      }      const session = await this.account.createEmailPasswordSession({
        email: email,
        password: password
      })



      return session;

    }
    catch {

      throw new Error("signup");
    }
  }  async logout() {
    try {
      const res = await this.account.deleteSessions();
      return res;
    }
    catch (err) {

      throw new Error(err.message)
    }
  }  async getAccount() {
    return await this.account.get();
  }


}const authservice = new authService();
export { authservice };