import axios from "axios";
import { ValidRoles } from "./roles";

type ValidRoles = "read" | "write" | "admin";

interface IUserData {
  id: string;
  role: ValidRoles;
}

class Auth {
  private userData: IUserData | null;
  private apiUrl: string;

  constructor() {
    this.userData = JSON.parse(localStorage.getItem("APP:USER") || "{}");
    this.apiUrl = "https://contact-me-api.vercel.app";
  }

  public UserData() {
    return this.userData;
  }

  public async SignIn(id: string) {
    try {
      const res = await axios.get(`${this.apiUrl}/keys/get/${id}`);
      this.userData = res.data.key;

      localStorage.setItem("APP:USER", JSON.stringify(res.data.key));

      return res.data.key;
    } catch (err) {
      alert("An unexpected error occurred, try again!");
    }
  }

  public async AddNewKey(admId: string, requestedRole: ValidRoles) {
    if (!ValidRoles.includes(requestedRole)) {
      return alert("Your requested role is not valid");
    }

    try {
      const res = await axios.get(
        `${this.apiUrl}/keys/set/${admId}/${requestedRole}`
      );
      alert(
        `One new key has added to database\n\nid: ${res.data.key.id}\nrole: ${res.data.key.role}`
      );
    } catch (err) {
      alert("An unexpected error occurred, try again!");
    }
  }

  public SignOut() {
    localStorage.removeItem("APP:USER");
    window.location.reload();
  }
}

export default new Auth();
