import { BASE_URL } from "@/common/ConstantsBase";
import axios from "axios";

const API_URL = BASE_URL + "/api/v1/authentication";

class AuthService {

  login(user) {
    return axios.post(API_URL + "/sign-in", user);
  }

  register(user) {
    return axios.post(API_URL + "/sign-up", user);
  }
}

export default new AuthService();