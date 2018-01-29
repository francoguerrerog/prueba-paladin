import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Table, Icon, Divider, InputNumber, Button, Row, Col, Slider, Form } from 'antd';

import { filterProductsBySublevel } from '../../actions/productsActions';
import { addItem } from '../../actions/cartActions';

import '../../../index.css';

const Search = Input.Search;
const FormItem = Form.Item;

class Products extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterProducts: [],
			sublevelId: 0,
			sublevelName: 'Producto',
			isFilter: false,
			filteredProducts: [],
			filterPriceVisible: false,
			priceRange: { 0: '0', 200: '200'},
			filterQantityVisible: false,
			quantityRange: { 0: '0', 200: '200'}
		}
	}

	componentWillReceiveProps(nextProps) {
		const maxPrice = nextProps.filterProducts.map((a) => { return a.price }).reduce(function(prev, current) {
			return (parseInt(prev.replace(/\D/g,'')) > parseInt(current.replace(/\D/g,''))) ? prev : current
		})
		const minPrice = nextProps.filterProducts.map((a) => { return a.price }).reduce(function(prev, current) {
			return (parseInt(prev.replace(/\D/g,'')) < parseInt(current.replace(/\D/g,''))) ? prev : current
		})
		const maxQuantity = nextProps.filterProducts.map((a) => { return a.quantity }).reduce(function(prev, current) {
			return (prev > current) ? prev : current
		})
		const minQuantity = nextProps.filterProducts.map((a) => { return a.quantity }).reduce(function(prev, current) {
			return (prev< current) ? prev : current
		})

		this.setState({
			priceRange: { [parseInt(minPrice.replace(/\D/g,''))]: minPrice, [parseInt(maxPrice.replace(/\D/g,''))]: maxPrice },
			quantityRange: { [minQuantity]: minQuantity, [maxQuantity]: maxQuantity },
			products: nextProps.products,
			filterProducts: nextProps.filterProducts.map((a) => {
				a.cart = 1;
				return a;
			})
		}, () => {
			//console.log(this.state.priceRange, this.state.quantityRange);
		});
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

	addItemToCart(item) {
		this.props.addItem(item);
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
				filterDropdown: (
					<div className="custom-filter-dropdown">
						<Slider range marks={this.state.priceRange} />
						<Button type="primary" >Filtrar</Button>
					</div>
				),
				filterDropdownVisible: this.state.filterPriceVisible,
				onFilterDropdownVisibleChange: visible => this.setState({ filterPriceVisible: visible }),
			}, {
				title: 'Cantidad',
				dataIndex: 'quantity',
				key: 'quantity',
				sorter: (a, b) => a.quantity - b.quantity,
				filterDropdown: (
					<div className="custom-filter-dropdown">
						<Slider range marks={this.state.quantityRange} />
						<Button type="primary" >Filtrar</Button>
					</div>
				),
				filterDropdownVisible: this.state.filterQuantityVisible,
				onFilterDropdownVisibleChange: visible => this.setState({ filterQuantityVisible: visible }),
			}, {
				title: 'Disponibilidad',
				key: 'available',
				filters: [
					{
						text: 'Disponible',
						value: true,
				  	}, {
						text: 'No Disponible',
						value: false,
					}
				],
				render: (text, record) => (
					<span>{record.available ? 'Disponible' : 'No Disponible'}</span>
				),
				onFilter: (value, record) => { return record.available == (value == 'true') },
				sorter: (a, b) => a.available - b.available,
			}, {
				title: '',
				key: 'action',
				render: (text, record) => (
					<span>
						<InputNumber min={1} max={record.quantity} defaultValue={1} onChange={(value) => {record.cart = value}} />
						<Divider type='vertical' />
						<Button type="primary" htmlType="submit" onClick={() => {this.addItemToCart(record);}} ><Icon type="shopping-cart" /></Button>
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
		filterProducts: state.products.filterProducts
	};
}

export default connect(mapStateToProps, {
	filterProductsBySublevel,
	addItem
})(Products);