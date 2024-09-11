"use client";
import ReactPaginate from "react-paginate";

export const Paginate = (props) => {
  const { handlePageClick, pageCount, pageNo } = props;
  return (
    <>
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          forcePage={pageNo - 1}
          activeClassName="active"
          disabledClassName="disabled"
        />
      </div>
    </>
  );
};