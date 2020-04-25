import React from 'react';
import BillBar from '../../component/Bill-bar/Bill-bar';
import TableUserBill from '../../component/TableUserBill/TableUserBill';
import './User-bill.css';

class UserBill extends React.Component {
    render() {
        return (
            <div className="main-content-container">
                <BillBar />
                <br /><br /><br /><br />
                <TableUserBill/>
            </div >
        );
    }
}
export default UserBill;
