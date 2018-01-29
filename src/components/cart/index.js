import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Divider, Slider, Button, InputNumber } from 'antd';

import { editItem, removeItem } from '../../actions/cartActions';

import '../../../index.css';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		}
	}

	componentWillMount() {
		//console.log(this.props.cartItems);
		const tmpItems = this.props.cartItems.slice()//map((a) => a)
		//console.log(tmpItems)
		this.setState({
			items: tmpItems.map((a) => {
				a.isEditing = false;
				return a;
			})
		}, () =>{
			//console.log(this.state.items);
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			items: nextProps.cartItems.map((a) => {
				a.isEditing = false;
				return a;
			})
		}, () =>{
			//console.log(this.state.items);
		})
	}

	enableEditingItem(item) {
		var tmpItems = this.state.items.map((a) => {
			if (a.id === item.id) {
				a.isEditing = true
			}else{
				a.isEditing = false
			}
			return a;
		});

		this.setState({
			items: tmpItems
		})
	}

	editItem(item) {
		this.props.editItem(item);
	}

	removeItem(item) {
		this.props.removeItem(item);
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
				render: (text, record) => (
					<div>{record.isEditing ? 
						<span>
							<InputNumber min={1} max={record.quantity} defaultValue={record.cart} onChange={(value) => {record.cart = value}} />
							<Divider type='vertical' />
							<Button type="primary" htmlType="submit" onClick={() => {this.editItem(record)}} ><Icon type="select" /></Button>
						</span> 
					: 
						<span>{record.cart}</span>
					}</div>
				),
				sorter: (a, b) => a.quantity - b.quantity,
			}, {
				title: 'Acciones',
				key: 'action',
				render: (text, record) => (
					<span>
						<Button type="default" onClick={() => {this.enableEditingItem(record)}} ><Icon type="edit" /></Button>
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
				dataSource={this.state.items} 
				pagination={false} 
			/>
		</div>
		);
	}
}

function mapStateToProps( state ) {
	console.log(state.cart.items);
	return {
		cartItems: state.cart.items
	};
}

export default connect(mapStateToProps, {
	editItem,
	removeItem
})(Cart);