import React from 'react';
import TableUserBill from '../../component/TableUserBill/TableUserBill';
import Navbar from '../../component/Nav-bar/Nav-bar';
import './User-bill.css';

class UserBill extends React.Component {
    render() {
        return (
            <div className="userbill-container">
                <Navbar />
                <br /><br /><br /><br />
                <TableUserBill/>
            </div >
        );
    }
}
export default UserBill;
