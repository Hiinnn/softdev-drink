import React, { Component } from 'react';
import './TableUserBill.css';
//import { listMenu } from '../../data/listMenu';
import Table from 'react-bootstrap/Table'; 		//className = "table"
import partyOrder from '../../data/NEW/partyOrder';

export default class TableUserBill extends Component {

    constructor(props) {

        super(props);

        this.partyOrder = partyOrder;

        this.state = {
            editable: false,
            partyOrder: partyOrder
        };

        this.edit = this.edit.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
                <table className="bill-table">
                    <Table striped bordered hover responsive variant="dark" id="Menu" /*style={{ marginLeft: "20%" }}*/>
                        <thead >
                            <tr>
                                <th className = "head-table" style={{ width: "55%" }}>Menu</th>
                                <th className = "head-table" style={{ width: "15%" }}>Price</th>
                                <th className = "head-table" style={{ width: "15%" }}>Amount</th>
                                <th className = "head-table" style={{ width: "15%" }}>Total</th>
                            </tr>
                        </thead>

                        <tbody >
                            {
                                Object.keys(this.state.partyOrder.order_item).map((data, i) => {
                                    return (
                                        <tr key={i}>
                                            <tr>
                                                <td style={{width: "55%"}}>1{data.goods_name}</td>
                                                <td style={{ textAlign: "center" }} >2{data.price_unit}</td>
                                                <td style={{ textAlign: "center" }}>3{data.order_qty}</td>
                                                <td style={{ textAlign: "center" }}>4{data.order_price}</td>
                                            </tr>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </table >
                
                <br /><br />

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
