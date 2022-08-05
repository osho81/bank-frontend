import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import TransactionAccountService from '../Services/TransactionAccountService';
import CustomerService from '../Services/CustomerService';


const ListTransactionAccountComponent = () => {

    const [trAccounts, setTrAccounts] = useState([])
    const [customers, setCustomers] = useState([])
    // const [takenAccounts, setTakenAccounts] = useState([])
    const [taccArr, setTaccArr] = useState([])

    // Call methods to populate the arrays we need to render data to screen
    useEffect(() => { 
        getListTrAccounts(); 
        getListCusomers(); 
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
    const getListCusomers = () => {

        // Get all customers
        CustomerService.getCustomers().then((res) => {
            setCustomers(res.data);

            // Then get all eventual accounts for each customer
            res.data.map((tacc) => {
                TransactionAccountService.getTrAccountsByCustomer((tacc.id)).then((resp) => {
                    setTaccArr(taccArr => [...taccArr, ...resp.data]); // Add array to another array
                    
                    console.log("current owner: ", resp.data);
                })
            })
        }).catch(error => {
            console.log(error);
        })
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
                                    Later
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>


                {/* Test tBody - delete/move to rest of the renedering when test is done */}
                <tbody>
                    {customers.map((customer, ind) => {
                        return (
                            <tr key={ind}>
                                <td> {customer.id} </td>
                                <td> {customer.fName} </td>
                                <td> {customer.transactionAccounts.map(acc => acc.accountNo + ", ")}</td>
                                <td> !!!!!!!!!!!!!!!!!!!!!!! </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>


                {/* Test tBody - delete/move to rest of the renedering when test is done  */}
                <tbody>
                    {taccArr.map((tacc, index) => {
                        return (
                            <tr key={index}>
                                <td> {tacc.id} </td>
                                <td> {tacc.accountNo} </td>
                                <td> {tacc.balance}</td>
                                <td> ?????????????????? </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>


                {/* Test tBody - delete/move to rest of the renedering when test is done */}
                {/* <tbody>
                    {takenAccounts.map((tacc, ind) => {
                        return (
                            <tr key={ind}>
                                <td> {tacc.id} </td>
                                <td> {tacc.accountNo} </td>
                                <td> {tacc.balance}</td>
                            </tr>
                        )
                    }
                    )}
                </tbody> */}

            </Table>
            <br></br>
            <div className="text-center">
                nothing here yet
            </div>
        </div>
    );
}


export default ListTransactionAccountComponent;