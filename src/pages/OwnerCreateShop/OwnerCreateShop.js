import React from 'react';
import Ownerform from '../../component/Owner-form/Owner-form'
import Navbar from '../../component/Nav-bar/Nav-bar';
import './OwnerCreateShop.css';

class OwnerCreateShop extends React.Component {

    render() {
        return (
            <div>
                <Navbar />
                <div className="OwnerCreateShop-container">
                    <br /><br />
                    <Ownerform />
                    <br /><br /><br />
                </div>
            </div>
        );
    }
}
export default OwnerCreateShop;
