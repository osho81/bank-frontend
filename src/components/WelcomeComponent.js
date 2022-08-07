import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WelcomeComponent extends Component {
    render() {
        return (
            <div className='welcome-main'>
                <h2 style={{ fontWeight: 800 }}>Welcome To Bank of Bravos</h2>
                <br></br>
                {/* Links styled as a buttons*/}
                <Link to="/customers" className="btn btn-primary">All Customers</Link>{" "}
                <Link to="/tr-accounts" className="btn btn-primary">All Accounts</Link>
            </div>
        );
    }
}

export default WelcomeComponent;