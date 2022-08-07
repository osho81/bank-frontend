import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import CustomerService from '../Services/CustomerService';
import { WithRouter } from '../Services/WithRouter';

// Main view, "Home" view page
// This class component could be converted to functional component, as the rest of the components
// But left as class component for educational reasons/comparisons

class ListCustomerComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // Initialize an array (populate it with componentDidMount())
            customers: []
        }

        // Bind events to the constructor
        this.addCustomer = this.addCustomer.bind(this);
        this.shownCustomerDetails = this.viewCustomerDetails.bind(this);
        this.viewTrAccountDetails = this.viewTrAccountDetails.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.goBack = this.goBack.bind(this);

    }

    // Method for calling API in CustomerService; 
    // then set new state with returned response data
    // Compare useEffect in functional components
    componentDidMount() {
        CustomerService.getCustomers().then((res) => {
            this.setState({ customers: res.data });
        });
    }

    // History.push("path") is deprecated; see useNavigate in react-router-dom v.6
    addCustomer() {
        // Uses wrapper from function component WithWouter.js (since this is a class component)
        this.props.navigate("/create-customer/_add");
    }

    viewCustomerDetails(id) {
        this.props.navigate(`/view-customer/${id}`);
    }

    viewTrAccountDetails = (id) => {
        this.props.navigate(`/view-traccount/${id}`);
    }

    goBack = () => {
        this.props.navigate("/");
    }

    deleteCustomer(id) {
        // Delete & filter to refresh remaining customers:
        CustomerService.deleteCustomer(id).then(res => {
            this.setState({ customers: this.state.customers.filter(customer => customer.id !== id) });
        });
    }



    render() {
        return (
            <div style={{ marginBottom: '5%' }}>
                <h2 className='list-header'>Customers</h2>
                {/* Design table area where the data from the populated customers list will be displayed */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Birth date</th>
                            <th>SSN</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Tr-Accounts</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody style={ {fontWeight: 500} }>
                        {
                            this.state.customers.map(
                                (customer, index) =>
                                    <tr key={index}>
                                        <td> {customer.id} </td>
                                        <td> {customer.lName + " " + customer.fName} </td>
                                        <td> {customer.dateOfBirth}</td>
                                        <td> {customer.ssn}</td>
                                        <td> {customer.address}</td>
                                        <td> {customer.email}</td>

                                        {/* Access the array of tr-accounts of current customer object; enable redirect to account page */}
                                        <td>
                                            {customer.transactionAccounts.map((acc, index ) =>
                                                <p key={index} style={{ lineHeight: '50%', margin: '1%'}}>
                                                    <Button variant="outline-info" style={{ fontSize: '9px', margin: '1%', padding: '0'}} 
                                                    onClick={() => this.viewTrAccountDetails(acc.id)}>
                                                        {acc.accountNo + " (Id: " + acc.id + ")"}
                                                    </Button> </p>
                                            )}
                                        </td>
                                        <td>
                                            <Button variant="primary" onClick={() => this.viewCustomerDetails(customer.id)}>Select</Button>{" "}
                                            <Button variant="danger" onClick={() => this.deleteCustomer(customer.id)}>Delete</Button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </Table>
                <br></br>
                <div className="text-center">
                    <Button variant="primary" onClick={this.addCustomer}>New Customer</Button>{" "}
                    <Button variant="warning" onClick={this.goBack}>Back</Button>
                </div>
            </div>
        );
    }
}

// See function component for navigation service
export default WithRouter(ListCustomerComponent);

// Alternative way of wrapping (navigation) hook: 
/* export function AppNavigation(props) {
    const navigate = useNavigate();
    return (< ListCustomerComponent navigate={navigate} ></ListCustomerComponent >)
} */