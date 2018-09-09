import React, { Component } from 'react'
import propTypes from 'prop-types'

class Pagination extends Component {
  changePage = page => {
    this.props.onChangePage(Math.trunc(page))
  }

  renderPageLinks = () => {
    const { page, pages } = this.props
    let array_pages = Array.from({ length: pages }, (v, k) => 1 + k)
    if (pages < page) {
      this.props.onChangePage(pages)
    }

    return array_pages.map(item => {
      return (
        <a
          href="#to-page"
          key={item.toString()}
          onClick={() => this.changePage(item)}
          className={page === item ? 'current-page' : ''}
        >
          {item}
        </a>
      )
    })
  }

  render() {
    return <div className="pagination">Pages: {this.renderPageLinks()}</div>
  }
}

Pagination.propTypes = {
  pages: propTypes.number,
  page: propTypes.number.isRequired,
  perPage: propTypes.number.isRequired,
  total: propTypes.number.isRequired,
  onChangePage: propTypes.func.isRequired,
}

export default Pagination
