import React from 'react';
import BillBar from '../../component/Bill-bar/Bill-bar';
import Table from 'react-bootstrap/Table'; 		//className = "table"
import './User-bill.css';
class UserBill extends React.Component {

    handleClick = () => {
        alert('Print')
    };

    render() {

        return (

            <div className="main-content-container">

                <BillBar />

                <br /><br /><br /><br /><br />

                <div className="table">

                    <Table striped bordered hover responsive variant="dark" id="Menu" /*style={{ marginLeft: "20%" }}*/>
                        <thead>
                            <tr>
                                <th style={{ width: 480 }}>Menu</th>
                                <th style={{ width: 120 }}>Price</th>
                                <th style={{ width: 120 }}>Amount</th>
                                <th style={{ width: 120 }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>Menu</td>
                                <td>Price</td>
                                <td>Amount</td>
                                <td>Total</td>
                            </tr>
                            <tr>
                                <td>Menu</td>
                                <td>Price</td>
                                <td>Amount</td>
                                <td>Total</td>
                            </tr>
                            <tr>
                                <td>Menu</td>
                                <td>Price</td>
                                <td>Amount</td>
                                <td>Total</td>
                            </tr>
                            <tr>
                                <td>Menu</td>
                                <td>Price</td>
                                <td>Amount</td>
                                <td>Total</td>
                            </tr>
                            <tr>
                                <td>Menu</td>
                                <td>Price</td>
                                <td>Amount</td>
                                <td>Total</td>
                            </tr>
                            <tr>
                                <td>Menu</td>
                                <td>Price</td>
                                <td>Amount</td>
                                <td>Total</td>
                            </tr>
                            <tr>
                                <td>Menu</td>
                                <td>Price</td>
                                <td>Amount</td>
                                <td>Total</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <div className="total-table">
                    <Table striped bordered hover responsive variant="dark" id="Total">
                        <tr>
                            <td >Total</td>
                        </tr>
                    </Table>
                </div>

                <br />
                <div className="print-button" onClick={this.handleClick} > PRINT </div>
                <br /><br /><br />

            </div >
        );
    }
}
export default UserBill;
