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
import ListTransactionAccountComponent from './components/ListTransactionAccountComponent';
import ViewTrAccountComponent from './components/ViewTrAccountComponent';
import CreateTrAccountComponent from './components/CreateTrAccountComponent';
import UpdateTrAccountComponent from './components/UpdateTrAccountComponent';

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

            {/* TransactionAccount related rendering  */}
            <Route path="/tr-accounts" element={< ListTransactionAccountComponent />}></Route>
            <Route path="/view-traccount/:id" element={< ViewTrAccountComponent />}></Route>
            <Route path="/create-traccount/:id" element={<CreateTrAccountComponent />}></Route>
            <Route path="/update-traccount/:id" element={<UpdateTrAccountComponent />}></Route>

          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
