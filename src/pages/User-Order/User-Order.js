import React from 'react'
import Navbar from '../../component/Nav-bar/Nav-bar';
import OrderGroup from '../../component/OrderTable/OrderGroup'

export default class UserOrder extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <OrderGroup />
            </div>
        )
    }
}