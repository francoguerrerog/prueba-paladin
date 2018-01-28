import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProductsBySublevel } from '../../actions/productsActions';

import '../../../index.css';


class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filterProducts: [],
            categoryId: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        //console.log(this.state);
        this.setState({
            products: nextProps.products,
            filterProducts: nextProps.filterProducts
        })
    }

    componentDidMount() {
        //console.log(this.state);
        if (this.props.location.state.id && this.state.categoryId !== this.props.location.state.id) {
            this.setState({
                categoryId: this.props.location.state.id
            })
            this.props.filterProductsBySublevel(this.props.location.state.id);
        }
    }

    componentDidUpdate() {
        //console.log(this.props.location);
        if (this.props.location.state.id && this.state.categoryId !== this.props.location.state.id) {
            this.setState({
                categoryId: this.props.location.state.id
            })
            this.props.filterProductsBySublevel(this.props.location.state.id);
        }
    }

    render() {
        return (
        <div>
            {/* Content */}
            {this.state.filterProducts.map((a, index) => {
                return <p key={index}>{a.name}</p>
            })}
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