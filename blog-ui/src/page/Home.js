

// Home.js
import React, { useEffect } from "react";
import { Badge } from "react-bootstrap";
import { useBoundStore } from "../store/boundStore";

function Home() {
  const { blogs, currentPage, totalPages, setPage, fetchBlogs } =
    useBoundStore();

  useEffect(() => {
    fetchBlogs(currentPage - 1);
  }, [currentPage, fetchBlogs]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="d-flex flex-column min-vh-100">
        {blogs.map((blog) => (
          <div key={blog.id} className="mb-4">
            <h2>{blog.title}</h2>
            <p>{blog.body}</p>
            <Badge>{blog.username}</Badge>
          </div>
        ))}

        <nav className="mt-auto py-3">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Home;
