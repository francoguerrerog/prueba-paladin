import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Divider, Slider, Button, InputNumber, Row, Col } from 'antd';

import { editItem, removeItem, checkOut } from '../../actions/cartActions';

import '../../../index.css';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			editItems: [],
			totalPayment: 0
		}
	}

	componentWillMount() {
		var tmpItems = this.props.cartItems.map((a) => {
			return { isEditing: false, cart: a.cart, total: parseInt(a.price.replace(/\D/g,''))*a.cart };
		})

		this.setState({
			items: this.props.cartItems,
			editItems: tmpItems,
			totalPayment: tmpItems.map((item) => { return item.total; }).
			reduce((a, b) => { return a + b; }, 0)
		})
	}

	componentWillReceiveProps(nextProps) {
		var tmpItems = nextProps.cartItems.map((a) => {
			return { isEditing: false, cart: a.cart, total: parseInt(a.price.replace(/\D/g,''))*a.cart };
		})
		
		this.setState({
			items: nextProps.cartItems,
			editItems: tmpItems,
			totalPayment: tmpItems.map((item) => { return item.total; }).
			reduce((a, b) => { return a + b; }, 0)
		})
	}

	enableEditingItem(indexItem) {
		var tmpItems = this.state.editItems.map((a, index) => {
			if (indexItem === index) {
				a.isEditing = true
			}else{
				a.isEditing = false
			}
			return a;
		});

		this.setState({
			editItems: tmpItems
		})
	}
	
	editItemState(indexItem, value) {
		var tmpItems = this.state.editItems.map((a,index) => {
			if (indexItem === index) {
				a.cart = value
			}
			return a;
		});

		this.setState({
			editItems: tmpItems
		})
	}

	editItem(item, indexItem) {
		this.props.editItem({ ...item, cart: this.state.editItems[indexItem].cart });
	}

	removeItem(item) {
		this.props.removeItem(item);
	}

	renderFooter() {
		return (
			<div>
				<Row type="flex" justify="end">
					<Col  xs={12} sm={8} md={6} lg={4} xl={4}>
						<span>Total: ${this.state.totalPayment.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</span>
					</Col>
					<Col  xs={6} sm={6} md={4} lg={3} xl={3}>
						<Button type='primary' onClick={() => this.props.checkOut()}>Pagar</Button>
					</Col>
				</Row>
			</div>
		);
	}

	render() {
		const columns = [
			{
				title: 'Nombre',
				dataIndex: 'name',
				key: 'name',
			}, {
				title: 'Precio',
				dataIndex: 'price',
				key: 'price',
				sorter: (a, b) => a.price.replace(/\D/g,'') - b.price.replace(/\D/g,''),
			}, {
				title: 'Disponibilidad',
				key: 'available',
				render: (text, record) => (
					<span>{record.available ? 'Disponible' : 'No Disponible'}</span>
				),
				sorter: (a, b) => a.available - b.available,
			}, {
				title: 'Cantidad',
				dataIndex: 'cart',
				key: 'cart',
				render: (text, record, index) => (
					<div>{this.state.editItems.length > 0 && this.state.editItems[index].isEditing ? 
						<span>
							<InputNumber min={1} max={record.quantity} defaultValue={record.cart} onChange={(value) => {this.editItemState(index, value)}} />
							<Divider type='vertical' />
							<Button type="primary" htmlType="submit" onClick={() => {this.editItem(record, index)}} ><Icon type="select" /></Button>
						</span> 
					: 
						<span>{record.cart}</span>
					}</div>
				),
				sorter: (a, b) => a.quantity - b.quantity,
			}, {
				title: 'Acciones',
				key: 'action',
				render: (text, record, index) => (
					<span>
						<Button type="default" onClick={() => {this.enableEditingItem(index)}} ><Icon type="edit" /></Button>
						<Divider type='vertical' />
						<Button type="danger" onClick={() => {this.removeItem(record)}} ><Icon type="delete" /></Button>
					</span>
				),
			}
		];

		return (
		<div>
			<h2>Carrito de compras</h2>
			<Table 
				rowKey="id" 
				columns={columns} 
				dataSource={this.state.items.map((a) => a)} 
				pagination={false} 
				footer={() => this.renderFooter()}
			/>
		</div>
		);
	}
}

function mapStateToProps( state ) {
	return {
		cartItems: state.cart.items
	};
}

export default connect(mapStateToProps, {
	editItem,
	removeItem,
	checkOut
})(Cart);