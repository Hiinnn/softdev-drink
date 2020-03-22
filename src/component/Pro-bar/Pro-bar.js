import React, {Component} from 'react';
import './Pro-bar.css';

class Probar extends Component{
    clicked = () => {
        alert('LOGOUT');
    };

    render() {
        return (
            <div className="pro-bar-container">
                <div className="drink-logo"> DRINK </div>
                <div className="pro-bar-button" onClick={this.clicked} style={{paddingRight:200}}> LOGOUT </div>
            </div>
        ) ;
    }
}
export default Probar;