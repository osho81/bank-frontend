import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListCustomerComponent from './components/ListCustomerComponent';
import WelcomeComponent from './components/WelcomeComponent';
import CreateCustomerComponent from './components/CreateCustomerComponent';
import ViewCustomerComponent from './components/ViewCustomerComponent';
import UpdateCustomerComponent from './components/UpdateCustomerComponent';
import ListTransactionAccountComponent from './components/ListTransactionAccountComponent ';
import ViewTrAccountComponent from './components/ListTransactionAccountComponent ';

// See also index.js (and index.html)

// Arrange routing hierarchy and structure
function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={< WelcomeComponent />} exact></Route>

            {/* Customer related rendering  */}
            <Route path="/customers" element={< ListCustomerComponent />}></Route>
            <Route path="/view-customer/:id" element={<ViewCustomerComponent />}></Route>
            <Route path="/create-customer/:id" element={<CreateCustomerComponent />}></Route>
            <Route path="/update-customer/:id" element={<UpdateCustomerComponent />}></Route>

            {/* transactionAccount related rendering  */}
            <Route path="/t-accounts" element={< ListTransactionAccountComponent />}></Route>
            <Route path="/view-traccount/:id" element={< ViewTrAccountComponent />}></Route>

          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
