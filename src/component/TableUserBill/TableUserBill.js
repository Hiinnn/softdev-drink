import React, { Component } from 'react';
import './TableUserBill.css';
//import { listMenu } from '../../data/listMenu';
import Table from 'react-bootstrap/Table'; 		//className = "table"
import { partyOrder } from '../../data/NEW/partyOrder';
import Axios from 'axios';

export default class TableUserBill extends Component {

    constructor(props) {

        super(props);

        // this.partyOrder = partyOrder;

        this.state = {
            editable: false,
            partyOrder: null,
        };


    }

    componentDidMount() {
        this.getPartyOrder()
    }

    getPartyOrder() {
        const url = `${localStorage.getItem('url')}/ordering/my_order/${this.props.match.params.partyId}`
        const head = {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }

        Axios.get(url, { headers: head })
            .then((res) => {
                console.log(res);
                this.setState({
                    partyOrder: res.data
                })
                // window.location.reload()
            })
            .catch((err) => {
                console.log('create ta err', err.response);
            })
    }

    handleClick = () => {
        alert('Print')
    };

    render() {
        if (this.state.partyOrder)
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

        else
            return <></>
    }
}
