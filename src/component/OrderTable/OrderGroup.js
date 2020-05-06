import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import OrderTable from './OrderTable';

import './OrderGroup.css';
import Axios from 'axios';
import { NotifyAlert } from '../SweetAlert';
import Swal from 'sweetalert2';

class Order extends React.Component {

	constructor() {
		super()
		this.state = {
			order: [],
			role: localStorage.getItem('role'),

			orderData: {
				food: [],
				drink: []
			},
		}
	}

	componentDidMount() {
		this.getOrderData()
	}

	getOrderData = () => {
		Axios.get(`${localStorage.getItem('url')}/stock/manage/?type=fd&shop_id=${this.props.match.params.shopId}`)
			.then((res) => {
				let sOrder = this.state.orderData;
				sOrder.food = res.data
				this.setState({
					orderData: sOrder
				})
			})
			.catch((err) => {
			})

		Axios.get(`${localStorage.getItem('url')}/stock/manage/?type=dk&shop_id=${this.props.match.params.shopId}`)
			.then((res) => {
				let sOrder = this.state.orderData;
				sOrder.drink = res.data
				this.setState({
					orderData: sOrder
				})
			})
			.catch((err) => {
			})
	}

	cart_addOrder = (type, index) => {
		// Check if order doesn't exist => add order to cart
		if (this.state.order.findIndex(i => i.goods_name === this.state.orderData[type][index].goods_name) === -1) {
			this.setState({
				order: this.state.order.concat([{ goods_name: this.state.orderData[type][index].goods_name, amount: 1, pk: this.state.orderData[type][index].pk }])
			})
		}
	}

	cart_deleteOrder = (index) => {
		// delete order from cart
		let newOrder = [...this.state.order]

		newOrder = [...newOrder.slice(0, index), ...newOrder.slice(index + 1, newOrder.length)] // Slice order[index] out

		this.setState({
			order: newOrder
		})
	}

	increaseOrder = (index) => {
		// increase number of order
		let newOrder = [...this.state.order]

		if (newOrder[index].amount > 0) {
			newOrder[index].amount += 1
			this.setState({
				order: newOrder
			})
		}
	}

	decreaseOrder = (index) => {
		// decrease number of order
		let newOrder = [...this.state.order]

		if (newOrder[index].amount === 1) {
			this.cart_deleteOrder(index)
			return;
		}

		newOrder[index].amount -= 1;
		this.setState({
			order: newOrder
		})
	}

	ordering() {
		// loop order
		let data;
		for (let i = 0; i < this.state.order.length; i++) {
			data = {
				party_id: this.props.match.params.partyId,
				order_qty: this.state.order[i].amount,
				goods_id: this.state.order[i].pk
			}
			this.postOrder(data)
		}
	}

	postOrder(data) {
		const url = `${localStorage.getItem('url')}/ordering/order_foods/`
		const head = {
			Authorization: `Bearer ${localStorage.getItem('access')}`
		}

		Axios.post(url, data, { headers: head })
			.then((res) => {
				Swal.fire({
					icon: 'success',
					title: 'สั่งอาหารสำเร็จ',
					showConfirmButton: false,
					timer: 1500
				}).then(() => {
					window.location.reload()
				})
			})
			.catch((err) => {
				NotifyAlert(() => { }, 'เกิดข้อผิดพลาด', '', 'error', false)
			})
	}

	render() {
		return (
			<div className="order-container" >
				<div className="order-table-container" >

					{/* Food Table */}
					<div className="order-table" >
						<OrderTable
							type={'food'}
							width={400}
							role={this.state.role}
							disabledBt={this.state.role === 'dk'}
							shopId={this.props.match.params.shopId}
							addToCart={this.cart_addOrder.bind(this)}
						/>
					</div>

					{/* Drink Table */}
					<div className="order-table" >
						<OrderTable
							type={'drink'}
							width={400}
							role={this.state.role}
							disabledBt={this.state.role === 'dk'}
							shopId={this.props.match.params.shopId}
							addToCart={this.cart_addOrder.bind(this)}
						/>
					</div>

					{/* Cart Table */}
					<div className="order-table"
						style={
							{ marginRight: '0px' }} >
						<CartTable order={this.state.order}
							increase={this.increaseOrder.bind(this)}
							decrease={this.decreaseOrder.bind(this)}
						/>
					</div>
					<br />

					{/* Order button */}
					<Button style={
						{ display: 'block', float: 'right', width: "300px", fontSize: "20px" }} onClick={this.ordering.bind(this)}> Order now </Button>
				</div>
			</div>
		);
	}
}
export default Order;

class CartTable extends React.Component {
	render() {
		return (
			<Table striped bordered responsive="sm"
				variant="dark"
				style={
					{ width: 300 }}
				id="order-cart" >
				<thead >
					<tr >
						<th colSpan="4"
							style={
								{ textAlign: 'center' }} > Your Order </th>
					</tr>
				</thead>
				<tbody >
					{
						this.props.order && Object.keys(this.props.order).map((index) => {
							return (
								<tr key={'cart' + index} >
									<td width="60%"
										style={
											{ borderRight: '0px' }} > {this.props.order[index].goods_name}
									</td>
									<td style={{ textAlign: "center", borderLeft: '0px', borderRight: '0px', userSelect: "none", cursor: "pointer" }}
										width="10%"
										onClick={() => { this.props.decrease(index) }}>
										-
									</td>
									<td style={
										{ textAlign: "center", borderLeft: '0px', borderRight: '0px', userSelect: "none" }}
										width="20%" > {this.props.order[index].amount}
									</td>
									<td style={
										{ textAlign: "center", borderLeft: '0px', userSelect: "none", cursor: "pointer" }}
										width="10%"
										onClick={
											() => { this.props.increase(index) }} >
										+
									</td>
								</tr>
							)
						})
					}
				</tbody>
			</Table>
		)
	}
}