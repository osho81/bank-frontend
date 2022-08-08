import React from 'react';
import TransactionAccountService from '../Services/TransactionAccountService';

function UpdateTrAccountComponent(props) {

    const navigate = useNavigate();
    const navigateBack = useNavigate();

    const { id } = useParams();

    const [accountNo, setAccountNo] = useState('');
    const [balance, setBalance] = useState('');
    const [customer, setCustomer] = useState('');

    // Id & Account number not allowed to be changed




    useEffect(() => { // Initial retrieval of customer details/values
        TransactionAccountService.getTrAccountById(id).then((response) => {
            setAccountNo(response.data.accountNo);
            setBalance(response.data.balance);
            setCustomer(response.data.customer);
        }).catch(error => {
            console.log(error);
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps



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
                                <Form.Control size="sm" type="text" placeholder="Last name"
                                    value={customer.id} onChange={handleCustomer} />
                            </Form.Group>
                            <br></br>

                            <Button variant="primary" onClick={updateCustomer}>Submit</Button>{' '}
                            <Button variant="warning" onClick={goToCustomerView}>Cancel</Button>

                            {/* <Button type="submit">Submit form</Button> */}

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default UpdateTrAccountComponent;