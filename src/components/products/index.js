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
			editFilterProducts: [],
			sublevelId: 0,
			sublevelName: 'Producto',
			searchText: '',
			isFilter: false,
			isFilterPrice: false,
			filterPrice: [],
			isFilterQuantity: false,
			filterQuantity: [],
			filteredProducts: [],
			editFilteredProducts: [],
			filterPriceVisible: false,
			priceRange: { 0: '0', 100: '100'},
			minPrice: 0,
			maxPrice: 100,
			filterQuantityVisible: false,
			quantityRange: { 0: '0', 100: '100'},
			minQuantity: 0,
			maxQuantity: 100
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

		var tmpItems = nextProps.filterProducts.map((a) => {
			return { cart: 1 };
		})

		this.setState({
			priceRange: { [parseInt(minPrice.replace(/\D/g,''))]: minPrice, [parseInt(maxPrice.replace(/\D/g,''))]: maxPrice },
			quantityRange: { [minQuantity]: minQuantity, [maxQuantity]: maxQuantity },
			minPrice: parseInt(minPrice.replace(/\D/g,'')),
			maxPrice: parseInt(maxPrice.replace(/\D/g,'')),
			minQuantity,
			maxQuantity,
			products: nextProps.products,
			filterProducts: nextProps.filterProducts,
			editFilterProducts: tmpItems
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

		if (this.state.searchText !== value) {
			this.setState({ searchText: value })
		}

		if (value === '' && !this.state.isFilterPrice && !this.state.isFilterQuantity) {
			this.setState({
				isFilter: false,
				filteredProducts: [],
				editFilteredProducts: []
			})
			return;
		}

		var data = this.state.filterProducts

		if (value !== '') {
			data = data.filter((a) => {
				return a.name.includes(value);
			})
		}

		if (this.state.isFilterPrice) {
			data = data.filter((a) => {
				return parseInt(a.price.replace(/\D/g,'')) >= this.state.filterPrice[0] && parseInt(a.price.replace(/\D/g,'')) <= this.state.filterPrice[1];
			})
		}

		if (this.state.isFilterQuantity) {
			data = data.filter((a) => {
				return a.quantity >= this.state.filterQuantity[0] && a.quantity <= this.state.filterQuantity[1];
			})
		}

		var tmpItems = data.map((a) => {
			return { cart: 1 };
		})
		this.setState({
			isFilter: true,
			filteredProducts: data,
			editFilteredProducts: tmpItems
		})
	}

	addItemToCart(item, indexItem) {
		var data = {}
		if (this.state.isFilter) {
			data = { ...item, cart: this.state.editFilteredProducts[indexItem].cart }
		}else{
			data = { ...item, cart: this.state.editFilterProducts[indexItem].cart }
		}
		this.props.addItem(data);
	}

	editItemState(indexItem, value) {
		if (this.state.isFilter) {
			var tmpItems = this.state.editFilteredProducts.map((a,index) => {
				if (indexItem === index) {
					a.cart = value
				}
				return a;
			});

			this.setState({
				editFilteredProducts: tmpItems
			})
			return;
		}
		var tmpItems = this.state.editFilterProducts.map((a,index) => {
			if (indexItem === index) {
				a.cart = value
			}
			return a;
		});

		this.setState({
			editFilterProducts: tmpItems
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
				filterDropdown: (
					<div className="custom-filter-dropdown">
						<Slider 
							range 
							min={this.state.minPrice} 
							max={this.state.maxPrice} 
							marks={this.state.priceRange} 
							onAfterChange={(value) => this.setState({ filterPrice: value })} 
						/>
						<Button 
							type="primary" 
							onClick={() => { 
								this.setState({ isFilterPrice: true, filterPriceVisible: false }, () => {
									this.searchProducts(this.state.searchText);
								});
							}} 
						>
							<Icon type="search" />
						</Button>
						<Button 
							type="danger" 
							style={{ marginLeft: 10 }} 
							onClick={() => { 
								this.setState({ isFilterPrice: false, filterPriceVisible: false }, () => {
									this.searchProducts(this.state.searchText);
								});
							}}
						>
							<Icon type="delete" />
						</Button>
					</div>
				),
				filterIcon: this.state.isFilterPrice ? <Icon type="filter" style={{ color: '#1890ff' }} /> : <Icon type="filter" />,
				filterDropdownVisible: this.state.filterPriceVisible,
				onFilterDropdownVisibleChange: visible => this.setState({ filterPriceVisible: visible }),
			}, {
				title: 'Cantidad',
				dataIndex: 'quantity',
				key: 'quantity',
				sorter: (a, b) => a.quantity - b.quantity,
				filterDropdown: (
					<div className="custom-filter-dropdown">
						<Slider 
							range 
							min={this.state.minQuantity} 
							max={this.state.maxQuantity} 
							marks={this.state.quantityRange} 
							onAfterChange={(value) => this.setState({ filterQuantity: value })}
						/>
						<Button 
							type="primary" 
							onClick={() => { 
								this.setState({ isFilterQuantity: true, filterQuantityVisible: false }, () => {
									this.searchProducts(this.state.searchText);
								});
							}}
						>
							<Icon type="search" />
						</Button>
						<Button 
							type="danger" 
							style={{ marginLeft: 10 }} 
							onClick={() => {
								this.setState({ isFilterQuantity: false, filterQuantityVisible: false }, () => {
									this.searchProducts(this.state.searchText);
								});
							}}
						>
							<Icon type="delete" />
						</Button>
					</div>
				),
				filterIcon: this.state.isFilterQuantity ? <Icon type="filter" style={{ color: '#1890ff' }} /> : <Icon type="filter" />,
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
				render: (text, record, index) => (
					<span>
						<InputNumber min={1} max={record.quantity} defaultValue={1} onChange={(value) => {this.editItemState(index, value)}} />
						<Divider type='vertical' />
						<Button type="primary" htmlType="submit" onClick={() => {this.addItemToCart(record, index);}} ><Icon type="shopping-cart" /></Button>
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
				<Row style={{ paddingTop: 10 }}>
					<Table 
						rowKey='id' 
						columns={columns} 
						dataSource={this.state.isFilter ? this.state.filteredProducts : this.state.filterProducts} 
						pagination={false} 
					/>
				</Row>
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