import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination-container">
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
        className="pagination-btn"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}

      <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
