import React, { useState, useEffect } from 'react';
import { Card, Form, Container, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerService from '../Services/CustomerService';

function UpdateCustomerComponent(props) {

    const navigate = useNavigate();
    const navigateBack = useNavigate();

    // const [customer, setCustomer] = useState({});
    // const handleFName = e => { setCustomer({ fName: e.target.value }); };
    // const handleLName = e => { setCustomer({ lName: e.target.value }); };
    // // const handleDateOfBirth = e => { setCustomer({ dateOfBirth: e.target.value }); };
    // // const handleSsn = e => { setCustomer({ ssn: e.target.value }); };
    // const handleAddress = e => { setCustomer({ address: e.target.value }); };
    // const handleEmail = e => { setCustomer({ email: e.target.value }); };


    const { id } = useParams(); // get id param from current url

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(''); // Date type in backend and here in Form-Control
    const [ssn, setSnn] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    // Id, ssn, Date of birth not allowed to be changed
    const handleFName = e => { setFName( e.target.value); };
    const handleLName = e => { setLName( e.target.value); };
    const handleAddress = e => { setAddress( e.target.value ); };
    const handleEmail = e => { setEmail( e.target.value ); };


    useEffect(() => { // Initial retrieval of customer details/values
        CustomerService.getCustomerById(id).then((response) => {
            // setCustomer(response.data)
            setFName(response.data.fName);
            setLName(response.data.lName);
            setDateOfBirth(response.data.dateOfBirth);
            setSnn(response.data.ssn);
            setAddress(response.data.address);
            setEmail(response.data.email);
        }).catch(error => {
            console.log(error);
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const updateCustomer  = e => {
        e.preventDefault();

        const customer = {fName, lName, dateOfBirth, ssn, address, email}

        CustomerService.updateCustomer(customer, id).then((response) => {
            console.log(response.data)
            navigate(`/view-customer/${id}`);
        }).catch(error => {
            console.log(error)
        });
    }

    const goToCustomerView = () => {
        navigateBack(`/view-customer/${id}`);
    }


    return (
        <div>
            <Container style={{ marginLeft: '12,5%', marginBottom: '5%', width: '75%', justifyContent: 'center' }}>
                {/* Card has 75% width of the container's 75% screen width */}
                <Card style={{ marginLeft: '20%', width: '60%' }}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: 18 }} > Update customer with id {id} </Card.Title>
                        <Card.Text style={{ fontSize: 12 }}>
                            (ID, SSN and date of birth can't be changed)
                        </Card.Text>

                        {/* Use react-bootstrap forms component inside a cards component */}
                        <Form style={{ fontSize: 12, fontWeight: 500 }}>
                            <Form.Group className="mb-1" controlId="formBasicSsn">
                                <Form.Label>SSN </Form.Label>
                                <Form.Control size="sm" readOnly type="mute" placeholder="Social security number"
                                    value={ssn} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicDateOfBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control size="sm" readOnly type="mute" placeholder="Date of birth"
                                    value={dateOfBirth} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="First name"
                                    value={fName} onChange={handleFName} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Last name"
                                    value={lName} onChange={handleLName} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Address"
                                    value={address} onChange={handleAddress} />
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control size="sm" type="email" placeholder="Email"
                                    value={email} onChange={handleEmail} />
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

export default UpdateCustomerComponent;