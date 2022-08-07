import axios from "axios";

const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/v1/t-account"; 

class TransactionAccountService {

    getTrAccounts() {
        return axios.get(CUSTOMER_API_BASE_URL + "/all");
    }

    getTrAccountById(id) {
        return axios.get(CUSTOMER_API_BASE_URL + "/" + id);
    }

    // Customized method to get accounts assigned to a certain customer
    getTrAccountsByCustomer(id) {
        return axios.get(CUSTOMER_API_BASE_URL + "/by/" + id);
    }




}

export default new TransactionAccountService()