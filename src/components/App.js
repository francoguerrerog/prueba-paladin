import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Layout, Menu, Icon } from 'antd';

import categoriesData from '../assets/categories.json';
import productsData from '../assets/products.json';

import { loadCategories } from '../actions/categoriesActions';
import { loadProducts } from '../actions/productsActions';

import '../../index.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		}
	}

	componentWillMount() {
		this.props.loadCategories(categoriesData);
		this.props.loadProducts(productsData);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			categories: nextProps.categories
		})
	}

	renderSublevel(data) {
		return (
			data.map((a, index) => {
				if (a.sublevels) {
					return (
						<SubMenu
							key={a.id+a.name}
							title={
								<div>
									<Icon type="right" />
									<span className="nav-text">{ a.name }</span>
								</div>
							}
						>
						{this.renderSublevel(a.sublevels)}
						</SubMenu>
					);
				}
				return(
					<Menu.Item key={a.id}>
						<div onClick={() => { browserHistory.push({ pathname: '/product', search: '?id='+a.id, state: { id: a.id, name: a.name }}) }} >
							<span className="nav-text">{a.name}</span>
						</div>
					</Menu.Item>
				);
			})
		);
	}

	render() {
		return (
			<Layout>
				<Sider
					breakpoint="lg"
					collapsedWidth="0"
					onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
				>
					<div className="logo" />
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['Home']}>
						<Menu.Item key="Home">
							<div onClick={() => { browserHistory.push('/') }}>
								<Icon type="home" />
								<span className="nav-text">Inicio</span>
							</div>
						</Menu.Item>
						{this.renderSublevel(this.state.categories)}
						<Menu.Item key="Cart">
							<div onClick={() => { browserHistory.push('/cart') }}>
								<Icon type="shopping-cart" />
								<span className="nav-text">Carrito</span>
							</div>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }} />
					<Content style={{ margin: '24px 16px 0' }}>
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							{ this.props.children }
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2016 Created by Ant UED
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

function mapStateToProps( state ) {
	return {
		categories: state.categories.categories
	};
}

export default connect(mapStateToProps, {
	loadCategories,
	loadProducts
})(App);
