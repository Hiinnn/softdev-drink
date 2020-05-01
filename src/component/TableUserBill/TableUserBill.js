import React, { Component } from 'react';
import './TableUserBill.css';
//import { listMenu } from '../../data/listMenu';
import Table from 'react-bootstrap/Table'; 		//className = "table"
import { partyOrder } from '../../data/NEW/partyOrder';

export default class TableUserBill extends Component {

    constructor(props) {

        super(props);

        this.partyOrder = partyOrder;

        this.state = {
            editable: false,
            partyOrder: partyOrder
        };

        //this.edit = this.edit.bind(this)
        //this.handleChange = this.handleChange.bind(this)
    }

    edit = () => {

        if (this.state.editable === true) {
            //send data to back-end
        }

        this.setState(() => {
            return { editable: !this.state.editable }
        })

    }

    handleChange = (e) => {

        // e.preventDefault();

        //const name = e.target.name;
        //const value = e.target.value;
        const partyOrder = { ...this.state.partyOrder };

        //newOrder[name] = value;

        //console.log(name,value)

        this.setState({
            partyOrder: partyOrder
        })

        console.log(this.state)
    }

    handleClick = () => {
        alert('Print')
    };

    render() {
        return (
            <div>
                <div className="bill-table">
                    <Table striped bordered hover responsive variant="dark" id="Menu" /*style={{ marginLeft: "20%" }}*/>
                        <thead>
                            <tr>
                                <th className="menu-head" >Menu</th>
                                <th className="price-head">Price</th>
                                <th className="amount-head">Amount</th>
                                <th className="total-head">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.partyOrder.order_item.map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="menu">{data.goods_name}</td>
                                            <td className="price">{data.price_unit}</td>
                                            <td className="amount">{data.order_qty}</td>
                                            <td className="total">{data.order_price}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table >
                </div >

                <br /><br />

                <div className="total-table">
                    <Table striped bordered hover responsive variant="dark" id="Total">
                        <thead>
                            <tr>
                                <td >Total</td>
                                <td >{partyOrder.total}</td>
                            </tr>
                        </thead>
                    </Table>
                </div>

                <br />
                <div className="print-button" onClick={this.handleClick} > PRINT </div>
                <br /><br />
            </div >
        );
    }
}
