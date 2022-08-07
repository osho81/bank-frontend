import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import TransactionAccountService from '../Services/TransactionAccountService';
import CustomerService from '../Services/CustomerService';
import { useNavigate } from 'react-router-dom';


const ListTransactionAccountComponent = () => {

    const navigate = useNavigate();

    const [isLoading, setisLoading] = useState(false) // Control rendering

    const [trAccounts, setTrAccounts] = useState([])
    // const [customers, setCustomers] = useState([]) // Just needed intermediary
    const [takenAccounts, setTakenAccounts] = useState([])
    // const [intersections, setIntersections] = useState([])


    // Populate the arrays we need to render needed data
    useEffect(() => {

        // Get a list of all accounts that has been assigned a customer
        const getListCusomers = () => {
            setisLoading(true);

            TransactionAccountService.getTrAccounts().then((response) => {
                setTrAccounts(response.data); // Populate initial account array values

                // Get all customers
                CustomerService.getCustomers().then((res) => {
                    // setCustomers(res.data); // Redundant (only using customer data temporary/locally)

                    res.data.map((cust) => { // For each customer...

                        // ...get assigned transaction accounts by the current customer id
                        TransactionAccountService.getTrAccountsByCustomer((cust.id)).then((resp) => {
                            console.log("Assigned accounts for cust ", cust.id, "\n", resp.data);

                            // ...and for each tr-accounts array in current customer obj, look for matches
                            cust.transactionAccounts.map((currAcc) => {
                                if (resp.data.indexOf(currAcc.id)) { // If account exist at current customer data...
                                    console.log("Curr acc id", currAcc.id);

                                    // ...add to a list matching account with owner, i.e.; 
                                    // Add new properties: keys (acc_id & owner_id) and assign them current id:s as values. 
                                    setTakenAccounts(prev => [...prev, { acc_id: currAcc.id, owner_id: cust.id }]);
                                }
                            })

                        })
                    })
                })
            }).catch(error => {
                console.log(error);
            })
            setisLoading(false);
        }


        //getListTrAccounts();
        getListCusomers();

    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const addTrAccount = () => {
        navigate("/create-traccount/_add");
    }

    const viewTrAccountDetails = (id) => {
        navigate(`/view-traccount/${id}`);
    }

    const viewCustomerDetails = (id) => {
        navigate(`/view-customer/${id}`);
    }

    const deleteTrAccount = (id) => {
        // Delete & filter to refresh remaining customers:
        TransactionAccountService.deleteTrAccount(id).then(res => {
            setTrAccounts(trAccounts.filter(trAccount => trAccount.id !== id));
        });
    }



    // Add ternary operation for isLoading rendering control 
    return isLoading ? (
        <p>Page is loading</p>
    ) : (
        <div style={{ marginBottom: '5%' }}>
            <h2 className='list-header'>Transaction Accounts</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>AccountNo</th>
                        <th>Balance</th>
                        <th>Owner id</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {trAccounts.map((trAccount, index) => {
                        return (
                            <tr key={index}>
                                <td> {trAccount.id} </td>
                                <td> {trAccount.accountNo} </td>
                                <td> {trAccount.balance}</td>
                                <td>
                                    {/* Ternary operator to return customer/owner for account that has such */}
                                    {takenAccounts.map((ownedAcc) =>
                                        <p key={ownedAcc.acc_id} style={{ lineHeight: '40%', margin: '1%'}}>
                                            {ownedAcc.acc_id === trAccount.id ?
                                                <Button variant="outline-info" style={{ fontSize: '12px', margin: '1%', padding: '1%' }}
                                                    onClick={() => viewCustomerDetails(ownedAcc.owner_id)}>
                                                    {"Customer-ID: " + ownedAcc.owner_id}
                                                </Button> : ""}
                                        </p>
                                    )}
                                </td>
                                <td>

                                    <Button variant="primary" onClick={() => viewTrAccountDetails(trAccount.id)}>Select</Button>{" "}
                                    <Button variant="danger" onClick={() => deleteTrAccount(trAccount.id)}>Delete</Button>

                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </Table>
            <br></br>
            <div className="text-center">
                <Button variant="primary" onClick={addTrAccount}>New Account</Button>
            </div>
        </div>
    );
}


export default ListTransactionAccountComponent;