import React, { useState, useEffect } from 'react';
import { Card, Table, Container, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import TransactionAccountService from '../Services/TransactionAccountService';

function ViewCustomer(props) {

  const navigate = useNavigate();
  const navigateBack = useNavigate();

  const [transactionAccount, setTransactionAccount] = useState('');
  const { id } = useParams(); 


  useEffect(() => {
    TransactionAccountService.getTrAccountsByCustomer(id).then((response) => {
      setTransactionAccount(response.data)
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
          <Card.Title>Details for transaction account with id {transactionAccount.id}</Card.Title>
        </Card.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Account ID</td>
              <td>{transactionAccount.id}</td>
            </tr>
            <tr>
              <td>Account number</td>
              <td>{transactionAccount.accountNo}</td>
            </tr>
            <tr>
              <td>Balance</td>
              <td>{transactionAccount.balance}</td>
            </tr>
            <tr>
              <td>Customer</td>
              <td>{transactionAccount.customer.id}</td>
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