import React, { Component } from 'react';
import './TableUserBill.css';
import { listMenu } from '../../data/listMenu';
import Table from 'react-bootstrap/Table'; 		//className = "table"

export default class TableUserBill extends Component {

    handleClick = () => {
        alert('Print')
    };

    render() {
        return (
            <div>
                <div className="table">
                    <Table striped bordered hover responsive variant="dark" id="Menu" /*style={{ marginLeft: "20%" }}*/>
                        <thead>
                            <tr>
                                <th style={{ width: "55%" }}>Menu</th>
                                <th style={{ width: "15%" }}>Price</th>
                                <th style={{ width: "15%" }}>Amount</th>
                                <th style={{ width: "15%" }}>Total</th>
                            </tr>
                        </thead>

                        <tbody >
                            {
                                listMenu.map((Menu, i) => {
                                    return (
                                        <tr width="100%">
                                            <td style={{ width: "55%" }}>{Menu.nameMenu}</td>
                                            <td style={{ textAlign: "center" }}>{Menu.Price}</td>
                                            <td style={{ textAlign: "center" }}>{Menu.Amount}</td>
                                            <td style={{ textAlign: "center" }}>{Menu.Total}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div >

                <div className="total-table">
                    <Table striped bordered hover responsive variant="dark" id="Total">
                        <tr>
                            <td >Total</td>
                        </tr>
                    </Table>
                </div>
                
                <br />
                <div className="print-button" onClick={this.handleClick} > PRINT </div>
                <br /><br />
            </div>
        );
    }
}
