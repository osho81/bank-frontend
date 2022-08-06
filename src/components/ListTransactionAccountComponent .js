import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import TransactionAccountService from '../Services/TransactionAccountService';
import CustomerService from '../Services/CustomerService';


const ListTransactionAccountComponent = () => {

    const [isLoading, setisLoading] = useState(false) // Control rendering

    const [trAccounts, setTrAccounts] = useState([])
    const [customers, setCustomers] = useState([])
    const [takenAccounts, setTakenAccounts] = useState([])
    // const [intersections, setIntersections] = useState([])

    // Call methods to populate the arrays we need to render data to screen
    useEffect(() => {

        // Put functions here inside useEffect, to avoid eventual infinity problem
        // const getListTrAccounts = () => {
        //     setisLoading(true);
        //     TransactionAccountService.getTrAccounts().then((response) => {
        //         setTrAccounts(response.data); // Populate initial array values

        //         console.log("response");
        //         console.log(response.data);

        //     }).catch(error => {
        //         console.log(error);
        //     })
        //     setisLoading(false);
        // }

        // Get a list of all accounts that has been assigned a customer
        const getListCusomers = () => {
            setisLoading(true);

            TransactionAccountService.getTrAccounts().then((response) => {
                setTrAccounts(response.data); // Populate initial account array values
                console.log("all acc array");
                console.log(response.data);

                // Get all customers
                CustomerService.getCustomers().then((res) => {
                    setCustomers(res.data);
                    console.log("all cust array");
                    console.log(res.data);

                    // Then get all eventual accounts for each customer
                    res.data.map((cust) => { // For each customer...

                        // ...get assigned transaction accounts by current customer id
                        TransactionAccountService.getTrAccountsByCustomer((cust.id)).then((resp) => {
                            console.log("Assigned accounts for ", cust.id, "\n", resp.data);

                            // ...and for each tr-accounts array in current customer obj, look for matches
                            cust.transactionAccounts.map((currAcc) => {
                                if (response.data.indexOf(currAcc.id)) {
                                    console.log("Curr acc id", currAcc.id);

                                    // Add to a list matching account with owner, i.e.; 
                                    // Add new properties: keys (account & owner) and assign them current id:s as values. 
                                    setTakenAccounts(prev => [...prev, { account: currAcc.id, owner: cust.id }]);
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
                                    {takenAccounts.map((ownedAcc) => ownedAcc.account === trAccount.id ? " " + ownedAcc.owner : " "

                                    )}

                                </td>
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
                                <td> {customer.transactionAccounts.map(acc => acc.accountNo + " (# " + acc.id + ") ")}</td>
                                <td> !!!!!!!!!!!!!!!!!!!!!!! </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>


                {/* Test tBody - delete/move to rest of the renedering when test is done  */}
                {/* <tbody>
                    {takenAccounts.map((takenAccount, indexx) => {
                        return (
                            <tr key={indexx}>
                                <td> {takenAccount.id} </td>
                                <td> {takenAccount.accountNo} </td>
                                <td> {takenAccount.balance}</td>
                                <td> ?????????????????? </td>
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