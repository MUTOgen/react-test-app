import React, { Component } from 'react';
import propTypes from 'prop-types';

class Pagination extends Component {
    changePage = (e) => {
        e.preventDefault()
        this.props.onChangePage(Math.trunc(e.target.getAttribute('data-page')))
    }

    renderPageLinks = () => {
        const {perPage, total, page} = this.props
        let pages = Math.ceil(total/perPage)
        let array_pages = Array.from({length: pages}, (v, k) => 1+k)

        if(pages < page) {
            this.props.onChangePage(pages)
        }
        
        return array_pages.map((item) => {
            return (
                <a href="#to-page" key={item.toString()} onClick={this.changePage} className={page === item ? 'current-page' : ''} data-page={item}>{item}</a>
            )
        })
    }
    
    render() {
        return (
            <div className="pagination">
               Pages: {this.renderPageLinks()}
            </div>
        );
    }
}

Pagination.propTypes = {
    page: propTypes.number.isRequired,
    perPage: propTypes.number.isRequired,
    total: propTypes.number.isRequired,
    onChangePage: propTypes.func.isRequired
}

export default Pagination