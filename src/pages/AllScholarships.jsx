/**
 * All Scholarships Page
 *
 * Displays paginated list of scholarships with search, filter, and sort capabilities.
 * Fetches data from backend API with query parameters for dynamic filtering.
 *
 * @component
 */

import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ScholarshipCard from "../components/common/ScholarshipCard";
import LoadingSpinner from "../components/common/LoadingSpinner";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // Items per page

  /**
   * Fetch scholarships whenever search, filter, sort, or page changes
   * Sends query parameters to backend for server-side filtering
   */
  useEffect(() => {
    setLoading(true);
    const params = {
      search,
      category: filterCategory,
      page,
      limit,
    };

    // Map sort values to server-expected parameters
    if (sort === "asc" || sort === "desc") {
      params.sortFees = sort;
    } else if (sort === "date") {
      params.sortDate = "newest";
    }

    axios
      .get("/all-scholarships", { params })
      .then((res) => {
        setScholarships(res.data.scholarships);
        setTotalPages(Math.ceil(res.data.totalScholarships / limit));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [search, filterCategory, sort, page]);

  /**
   * Handle search input change
   * Resets to page 1 when search term changes
   */
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  /**
   * Handle filter category change
   * Resets to page 1 when filter changes
   */
  const handleFilter = (e) => {
    setFilterCategory(e.target.value);
    setPage(1);
  };

  /**
   * Handle sort option change
   * Resets to page 1 when sort changes
   */
  const handleSort = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">All Scholarships</h1>

      {/* Search, Filter, and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name, university, or degree..."
          className="input input-bordered flex-1"
          value={search}
          onChange={handleSearch}
        />
        <select
          className="select select-bordered"
          value={filterCategory}
          onChange={handleFilter}
        >
          <option value="">All Categories</option>
          <option value="Full fund">Full Fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>
        <select
          className="select select-bordered"
          value={sort}
          onChange={handleSort}
        >
          <option value="">Sort By</option>
          <option value="asc">Fees: Low to High</option>
          <option value="desc">Fees: High to Low</option>
          <option value="date">Newest First</option>
        </select>
      </div>

      {/* Scholarship Grid */}
      {scholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No scholarships found.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-8">
        <button
          className="btn btn-sm"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="flex items-center px-4">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-sm"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllScholarships;
