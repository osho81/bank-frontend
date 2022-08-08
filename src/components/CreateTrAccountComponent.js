import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import CustomerService from '../Services/CustomerService';
import TransactionAccountService from '../Services/TransactionAccountService';


function CreateTrAccountComponent(props) {

    const navigate = useNavigate();
    const navigateToList = useNavigate();

    const [accountNo, setAccountNo] = useState('')
    const [balance, setBalance] = useState('')
    const [ownerId, setOwnerId] = useState('')

    const handleAccountNo = (e) => { setAccountNo(e.target.value) }
    const handleBalance = (e) => { setBalance(e.target.value) }
    const handleOwner = (e) => { setOwnerId(e.target.value) }


    const createTrAccount = e => {
        e.preventDefault();

        // CustomerService.getCustomerById(owner).then((response) => { // Don't need, since pass in id

        var trAccount = { accountNo: accountNo, balance: balance, customer: { id: ownerId } }; // automatically finds customer by id

        TransactionAccountService.saveTrAccount(trAccount).then((res) => {
            navigate('/tr-accounts', { replace: true });
        // })
        }).catch(error => {
            console.log(error)
        });
    }

    const goToListTrAccounts = () => {
        navigateToList('/tr-accounts', { replace: true });
    }


    return (
        <div>
            <Container style={{ marginLeft: '12,5%', marginBottom: '5%', width: '75%', justifyContent: 'center' }}>
                <Card style={{ marginLeft: '20%', width: '60%' }}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: 24 }} >Account details</Card.Title>
                        <Card.Text>
                            Please enter account details and press submit when done
                        </Card.Text>
                        <Form style={{ fontSize: 12, fontWeight: 500 }}>
                            <Form.Group className="mb-2" controlId="formBasicAccountNumber">
                                <Form.Label>Account number</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter account number"
                                    value={accountNo} onChange={handleAccountNo} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicBalance">
                                <Form.Label>Balance</Form.Label>
                                <Form.Control size="sm" type="number" placeholder="Enter balace"
                                    value={balance} onChange={handleBalance} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicOwner">
                                <Form.Label>Owner</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter id for assigned customer"
                                    value={ownerId} onChange={handleOwner} />
                            </Form.Group>

                            <Button variant="primary" onClick={createTrAccount}>Submit</Button>{' '}
                            <Button variant="warning" onClick={goToListTrAccounts}>Cancel</Button>

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default CreateTrAccountComponent;