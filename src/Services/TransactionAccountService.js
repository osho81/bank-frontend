import axios from "axios";

const TRACCOUNT_API_BASE_URL = "http://localhost:8080/api/v1/t-account"; 

class TransactionAccountService {

    getTrAccounts() {
        return axios.get(TRACCOUNT_API_BASE_URL + "/all");
    }

    getTrAccountById(id) {
        return axios.get(TRACCOUNT_API_BASE_URL + "/" + id);
    }

    // Customized method to get accounts assigned to a certain customer
    getTrAccountsByCustomer(id) {
        return axios.get(TRACCOUNT_API_BASE_URL + "/by/" + id);
    }

    saveTrAccount(account) {
        return axios.post(TRACCOUNT_API_BASE_URL, account);
    }

    updateTrAccount(account, id) {
        return axios.put(TRACCOUNT_API_BASE_URL + "/" + id, account);
    }

    deleteTrAccount(id) {
        return axios.delete(TRACCOUNT_API_BASE_URL + "/" + id);
    }




}

export default new TransactionAccountService()