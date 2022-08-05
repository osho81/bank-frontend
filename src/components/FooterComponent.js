import React from 'react';

const FooterComponent = () => {

    return (
        <div>
            <footer className="footer">
                <a href="https://github.com/osho81" className="text-muted" target={'_blank'} rel="noreferrer">Created by @Osho</a>
            </footer>
        </div>
    );
};

export default FooterComponent;


// Compare class component:

/* import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <div><a href="https://github.com/osho81" className="text-muted" target={'_blank'} rel="noreferrer">Created by @Osho</a></div>
                </footer>
            </div>
        )
    }
}

export default FooterComponent */