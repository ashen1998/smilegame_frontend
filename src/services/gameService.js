import axios from "axios";
import {authHeader, handleResponseAfterCheckingLogin} from "@/services/baseService";
import {BASE_URL} from "@/common/ConstantsBase";

const API_URL = "https://marcconrad.com/uob/smile/api.php";

const API_URL_MAIN = BASE_URL + "/api/v1/game/score";

class GameService {
  callSmileAPI() {
    return axios.get(API_URL);
  }

  setPlayerScore(id, score) {
    const url = API_URL_MAIN + "?id=" + id + "&score=" + score;
    const req = axios.post(url, {headers: authHeader()});
    return handleResponseAfterCheckingLogin(req);
  }

  getPlayerScore(id) {
    const url = API_URL_MAIN + "?id=" + id
    const req = axios.get(url, {headers: authHeader()});
    return handleResponseAfterCheckingLogin(req);
  }

  getAllTopScorePlayers() {
    const url = API_URL_MAIN + "/all_users"
    const req = axios.get(url, {headers: authHeader()});
    return handleResponseAfterCheckingLogin(req);
  }
}

export default new GameService();