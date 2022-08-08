import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Form, Container, Button } from 'react-bootstrap';
import TransactionAccountService from '../Services/TransactionAccountService';
import CustomerService from '../Services/CustomerService';

function UpdateTrAccountComponent(props) {

    const navigate = useNavigate();
    const navigateBack = useNavigate();

    const { id } = useParams();

    const [accountNo, setAccountNo] = useState('');
    const [balance, setBalance] = useState('');
    const [ownerId, setOwnerId] = useState(''); 

    // Id & Account number not allowed to be changed
    const handleBalance = e => { setBalance(e.target.value); };
    const handleOwnerId = e => { setOwnerId(e.target.value); };

    useEffect(() => { 
        TransactionAccountService.getTrAccountById(id).then((response) => {
            setAccountNo(response.data.accountNo);
            setBalance(response.data.balance);

            // Function for matching customer for account
            CustomerService.getCustomers().then((res) => (
                res.data.map((cust) => (
                    TransactionAccountService.getTrAccountsByCustomer((cust.id)).then((resp) => {
                        cust.transactionAccounts.forEach((currAcc) => {
                            // == since not same type comparison
                            if (currAcc.id == id) { 
                                setOwnerId(cust.id); 
                            }
                        })
                    })
                ))
            ))
        }).catch(error => {
            console.log(error);
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const updateTrAccount = e => {
        e.preventDefault();

        let trAccount = { accountNo, balance, customer: {id: ownerId} };

        TransactionAccountService.updateTrAccount(trAccount, id).then((response) => {
            console.log(response.data)
            navigate(`/view-traccount/${id}`);
        }).catch(error => {
            console.log(error)
        });
    }

    const goToTrAccountView = () => {
        navigateBack(`/view-traccount/${id}`);
    }


    return (
        <div>
            <Container style={{ marginLeft: '12,5%', marginBottom: '5%', width: '75%', justifyContent: 'center' }}>
                {/* Card has 75% width of the container's 75% screen width */}
                <Card style={{ marginLeft: '20%', width: '60%' }}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: 18 }} > Update transaction account with id {id} </Card.Title>
                        <Card.Text style={{ fontSize: 12 }}>
                            (ID and account number can't be changed)
                        </Card.Text>

                        {/* Use react-bootstrap forms component inside a cards component */}
                        <Form style={{ fontSize: 12, fontWeight: 500 }}>
                            <Form.Group className="mb-1" controlId="formBasicAccountNo">
                                <Form.Label>Account number </Form.Label>
                                <Form.Control size="sm" readOnly type="mute" placeholder="Account number"
                                    value={accountNo} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicBalance">
                                <Form.Label>Balance</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Balance"
                                    value={balance} onChange={handleBalance} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicCustomer">
                                <Form.Label>Customer</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Customer-ID"
                                    value={ownerId}

                                    // value={
                                    //     takenAccounts.map((ownedAcc) =>
                                    //         ownedAcc.acc_id === id ? ownedAcc.owner_id : ""
                                    //     )}
                                    onChange={handleOwnerId} />
                            </Form.Group>
                            <br></br>

                            <Button variant="primary" onClick={updateTrAccount}>Submit</Button>{' '}
                            <Button variant="warning" onClick={goToTrAccountView}>Cancel</Button>

                            {/* <Button type="submit">Submit form</Button> */}

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default UpdateTrAccountComponent;