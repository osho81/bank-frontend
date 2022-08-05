import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import TransactionAccountService from '../Services/TransactionAccountService';
import CustomerService from '../Services/CustomerService';


const ListTransactionAccountComponent = () => {

    const [trAccounts, setTrAccounts] = useState([])
    const [customers, setCustomers] = useState([])
    const [owners, setOwners] = useState([])

    // For update/pushing of array (and outside useEffect)
    // setTrAccounts( current => [...current, response.data] );


    useEffect(() => {
        getListTrAccounts(); // Initial population of the array of objects, trAccounts
        listAccountOwners(); // Get list of account owners
        console.log(customers.length);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    // Put function inside useEffect, to avoid eventual infinity problem
    const getListTrAccounts = () => {
        TransactionAccountService.getTrAccounts().then((response) => {
            // Suitable when populating array at start
            setTrAccounts(response.data);

            console.log("response");
            console.log(response.data);

        }).catch(error => {
            console.log(error);
        })

    }

    // Get a list of all accounts that has been assigned a customer
    const listAccountOwners = () => {
        // Get number of customers
        CustomerService.getCustomers().then((res) => {
            setCustomers(res.data);
        }).catch(error => {
            console.log(error);
        })

        for (let i = 0; i < customers.length; i++) {
            TransactionAccountService.getTrAccountsByCustomer(i + 1).then((res) => {

                if (res.data.id !== undefined && res.data.length !== 0) {
                    setOwners(...owners, res.data);
                }


                console.log("res");
                console.log(res.data);

            }).catch(error => {
                console.log(error);
            })
        }

    }




    return (
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
                                <td> {trAccount.customer} </td>
                                <td>
                                    actions
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>


                <tbody>
                    {customers.map((customer, index) => {
                        return (
                            <tr key={index}>
                                <td> {customer.id} </td>
                                <td> {customer.fName} </td>
                                <td> {customer.transactionAccounts.map(acc => acc.id + ", ")}</td>
                                <td>
                                    actions
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>

            </Table>
            <br></br>
            <div className="text-center">
                nothing here yet
            </div>
        </div>
    );
}


export default ListTransactionAccountComponent;