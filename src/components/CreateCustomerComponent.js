import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import CustomerService from '../Services/CustomerService';
import { useNavigate } from 'react-router-dom';

function CreateCustomerComponent() {

    const navigate = useNavigate();
    const navigateToList= useNavigate();

    // Original (empty) value and new value
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(''); // Date type in backend and here in Form-Control
    const [ssn, setSnn] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    // Methods for handling new values
    const handleFName = e => { setFName( e.target.value); };
    const handleLName = e => { setLName( e.target.value); };
    const handleDateOfBirth = e => { setDateOfBirth( e.target.value ); };
    const handleSsn = e => { setSnn( e.target.value ); };
    const handleAddress = e => { setAddress( e.target.value ); };
    const handleEmail = e => { setEmail( e.target.value ); };


    // Handle all inputs, i.e. use all new values to construct a Customer object
    // (Customer id is automatically assigned in backend)
    const createCustomer = e => {
        e.preventDefault();
        let customer = { fName: fName, lName: lName, dateOfBirth: dateOfBirth, ssn: ssn, address: address, email: email };
        // console.log('../customer => ' + JSON.stringify(customer));

        CustomerService.saveCustomer(customer).then((response) => {
            console.log(response.data)
            navigate('/customers', { replace: true });
        }).catch(error => {
            console.log(error)
        });
    }

    const goToListCustomers = () => {
        navigateToList('/customers', { replace: true });
    }


    return (
        <div>
            <Container style={{ marginLeft: '12,5%', marginBottom: '5%' , width: '75%', justifyContent: 'center' }}>
                {/* Card has 75% width of the container's 75% screen width */}
                <Card style={{ marginLeft: '20%', width: '60%' }}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: 24 }} > Customer details</Card.Title>
                        <Card.Text>
                            Please enter customer details and press submit when finished
                        </Card.Text>

                        {/* Use react-bootstrap forms component inside a cards component */}
                        <Form style={{ fontSize: 14 }}>
                            <Form.Group className="mb-2" controlId="formBasicFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter first name"
                                    value={fName} onChange={handleFName} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter last name"
                                    value={lName} onChange={handleLName} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicDateOfBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control size="sm" type="date" placeholder="Enter date of birth"
                                    value={dateOfBirth} onChange={handleDateOfBirth} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicSsn">
                                <Form.Label>SSN </Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter social security number"
                                    value={ssn} onChange={handleSsn} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Enter address"
                                    value={address} onChange={handleAddress} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control size="sm" type="email" placeholder="Enter email"
                                    value={email} onChange={handleEmail} />
                            </Form.Group>

                            <Button variant="primary" onClick={createCustomer}>Submit</Button>{' '}
                            <Button variant="danger" onClick={goToListCustomers}>Cancel</Button>

                            {/* <Button type="submit">Submit form</Button> */}

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div >
    );
};

export default CreateCustomerComponent;
