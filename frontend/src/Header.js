import React, { Component, useState } from 'react';


class Header extends Component {
    render(props) {
        return(
        <div className='counter'>
            <h1>{this.props.children}</h1>
        </div>
        )
    }
}

export default Header;