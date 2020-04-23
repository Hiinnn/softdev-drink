import React from 'react';
import BillBar from '../../component/Bill-bar/Bill-bar';
import Table from 'react-bootstrap/Table'; 		//className = "table"
import './User-bill.css';

const listMenu = [
    {
        index: 1,
        nameMenu: "Onion rings",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 2,
        nameMenu: "Papaya salad",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 3,
        nameMenu: "Lasagne",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 4,
        nameMenu: "Porridge with fish",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 5,
        nameMenu: "Tom Yum Kung",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 6,
        nameMenu: "Crisp fried calamari",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 7,
        nameMenu: "Cola",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 8,
        nameMenu: "Lavender Lemonade",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 9,
        nameMenu: "Punch",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 10,
        nameMenu: "Açai Pome Blue Mojito",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 11,
        nameMenu: "Winter Shandy",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 12,
        nameMenu: "Shirley Ginger",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 13,
        nameMenu: "Tahitian Coffee",
        Price: "x",
        Amount: "y",
        Total: "z"
    },
    {
        index: 14,
        nameMenu: "Strawberry Field",
        Price: "x",
        Amount: "y",
        Total: "z"
    }

]

class UserBill extends React.Component {

    handleClick = () => {
        alert('Print')
    };

    render() {

        return (

            <div className="main-content-container">

                <BillBar />

                <br /><br /><br /><br />

                <div className="table">

                    <Table striped bordered hover responsive variant="dark" id="Menu" /*style={{ marginLeft: "20%" }}*/>
                        <thead>
                            <tr>
                                <th style={{ width: "55%" }} >Menu</th>
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

            </div >
        );
    }
}
export default UserBill;
