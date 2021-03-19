import React, { Component, Fragment } from "react";
import ReactPaginate from "react-paginate";

export class MarketPagination extends Component {
  render() {
    const {
      postsPerPage,
      totalPosts,
      nextPage,
      prevPage,
      totalPages,
    } = this.props;

    const { onPageChanged = (f) => f } = this.props;

    return (
      <>
        <ReactPaginate
          pageCount={this.props.totalPages}
          previousLabel={<i class="fa fa-angle-left"></i>}
          nextLabel={<i class="fa fa-angle-right"></i>}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={this.props.onPageChanged}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination pagination-lg"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </>
    );
  }
}
export default MarketPagination;
