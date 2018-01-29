import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table, Icon, Divider, Slider, Button } from 'antd';

import '../../../index.css';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartItems: []
		}
	}

	componentWillMount() {
		this.setState({
			cartItems: this.props.cartItems
		}, () =>{
			console.log(this.state.cartItems);
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			cartItems: nextProps.cartItems
		}, () =>{
			console.log(this.state.cartItems);
		})
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
				sorter: (a, b) => a.quantity - b.quantity,
			}, {
				title: 'Acciones',
				key: 'action',
				render: (text, record) => (
					<span>
						<Button type="default" onClick={() => {this.addItemToCart(record);}} ><Icon type="edit" /></Button>
						<Divider type='vertical' />
						<Button type="danger" onClick={() => {this.addItemToCart(record);}} ><Icon type="delete" /></Button>
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
				dataSource={this.state.cartItems} 
				pagination={false} 
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
})(Cart);