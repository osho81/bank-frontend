import axios from "axios";

const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/v1/customer"; 

class CustomerService {

    // Method for retrieving all customers from backend API
    getCustomers() {
        return axios.get(CUSTOMER_API_BASE_URL + "/all");
    }

    // Method for retrieving a specific customer from backend API
    getCustomerById(id) {
        return axios.get(CUSTOMER_API_BASE_URL + "/" + id);  // or + "/" + id
    }

    saveCustomer(customer){
        return axios.post(CUSTOMER_API_BASE_URL, customer);
    }

    updateCustomer(customer, id){
        return axios.put(CUSTOMER_API_BASE_URL + "/" + id, customer);
    }

    deleteCustomer(id) {
        return axios.delete(CUSTOMER_API_BASE_URL + "/" + id);
    }

}

// Export object of this class (when called from ListCustomerComponent)
export default new CustomerService()