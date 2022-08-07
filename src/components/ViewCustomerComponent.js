import React, { useState, useEffect } from 'react';
import CustomerService from '../Services/CustomerService';
import { Card, Table, Container, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function ViewCustomer(props) {

  const navigate = useNavigate();
  const navigateBack = useNavigate();

  // Variables, states
  const [customer, setCustomer] = useState('');
  const { id } = useParams(); // get id param from current url


  useEffect(() => { // Get customer with aquired id
    CustomerService.getCustomerById(id).then((response) => {
      setCustomer(response.data)
    }).catch(error => {
      console.log(error);
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const editCustomer = () => {
    navigate(`/update-customer/${id}`);
  }

  const goToListCustomers = () => {
    navigateBack('/customers', { replace: true });
  }




  return (
    <Container style={{ marginLeft: '12,5%', marginBottom: '5%', width: '75%', justifyContent: 'center' }}>

      <Card style={{ marginLeft: '15%', width: '70%' }}>
        <Card.Body>
          <Card.Title>Details for customer with id {customer.id}</Card.Title>
        </Card.Body>

        {/* Table with no table head, only table body */}
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Customer ID</td>
              <td>{customer.id}</td>
            </tr>
            <tr>
              <td>First name</td>
              <td>{customer.fName}</td>
            </tr>
            <tr>
              <td>Last name</td>
              <td>{customer.lName}</td>
            </tr>
            <tr>
              <td>Date of birth</td>
              <td>{customer.dateOfBirth}</td>
            </tr>
            <tr>
              <td>Social security number</td>
              <td>{customer.ssn}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{customer.address}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{customer.email}</td>
            </tr>
          </tbody>
        </Table>
        <Card.Body>
          <Button variant="primary" onClick={editCustomer}>Edit</Button>{' '}
          <Button variant="danger" onClick={goToListCustomers}>Back</Button>
        </Card.Body>
      </Card>
    </Container >
  );
}

export default ViewCustomer;