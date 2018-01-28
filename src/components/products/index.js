import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Table, Icon, Divider, InputNumber, Button, Row, Col } from 'antd';

import { filterProductsBySublevel } from '../../actions/productsActions';

import '../../../index.css';

const Search = Input.Search;

class Products extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			filterProducts: [],
			sublevelId: 0,
			sublevelName: 'Producto',
			isFilter: false,
			filteredProducts: []
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			products: nextProps.products,
			filterProducts: nextProps.filterProducts
		})
	}

	componentDidMount() {
		if (this.props.location.state.id && this.state.sublevelId !== this.props.location.state.id) {
			this.setState({
				sublevelId: this.props.location.state.id,
				sublevelName: this.props.location.state.name
			})
			this.props.filterProductsBySublevel(this.props.location.state.id);
		}
	}

	componentDidUpdate() {
		if (this.props.location.state.id && this.state.sublevelId !== this.props.location.state.id) {
			this.setState({
				sublevelId: this.props.location.state.id,
				sublevelName: this.props.location.state.name
			})
			this.props.filterProductsBySublevel(this.props.location.state.id);
		}
	}

	searchProducts(value) {
		if (value === '') {
			this.setState({
				isFilter: false,
				filteredProducts: []
			})
			return;
		}
		const data = this.state.filterProducts.filter((a) => {
			return a.name.includes(value);
		})
		this.setState({
			isFilter: true,
			filteredProducts: data
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
				title: 'Cantidad',
				dataIndex: 'quantity',
				key: 'quantity',
				sorter: (a, b) => a.quantity - b.quantity,
			}, {
				title: 'Disponibilidad',
				key: 'available',
				render: (text, record) => (
					<span>{record.available ? 'Disponible' : 'No Disponible'}</span>
				),
				sorter: (a, b) => a.available - b.available,
			}, {
				title: '',
				key: 'action',
				render: (text, record) => (
					<span>
						<InputNumber min={1} max={record.quantity} defaultValue={1} onChange={()=>{}} />
					<Divider type="vertical" />
						<Button onClick={()=>{}} type="primary" ><Icon type="shopping-cart" /></Button>
					</span>
				),
			}
		];

		return (
			<div>
				<h2>{this.state.sublevelName}</h2>
				<Row>
					<Col xs={24} sm={18} md={12} lg={12} xl={8}>
						<Search
							placeholder='Buscar producto'
							onSearch={value => this.searchProducts(value)}
							enterButton
						/>
					</Col>
				</Row>
				<Table 
					rowKey='id' 
					columns={columns} 
					dataSource={this.state.isFilter ? this.state.filteredProducts : this.state.filterProducts} 
					pagination={false} 
				/>
			</div>
		);
	}
}

function mapStateToProps( state ) {
	return {
		products: state.products.products,
		filterProducts: state.products.filterProducts
	};
}

export default connect(mapStateToProps, {
	filterProductsBySublevel
})(Products);