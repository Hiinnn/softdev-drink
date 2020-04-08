import React, {Component} from 'react';
import './Bill-bar.css';

class BillBar extends Component{
    clicked = () => {
        alert('clicked');
    };

    render() {
        return (
            <div className="bill-bar-container">
                <div className="drink-logo"> DRINK </div>
                <div className="bill-bar-button" onClick={this.clicked} style={{paddingRight:200}}> LOGOUT </div>
                <div className="bill-bar-button" onClick={this.clicked} style={{paddingRight:100}}> SHOP </div>
            </div>
        ) ;
    }
}
export default BillBar;
