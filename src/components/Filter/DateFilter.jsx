import React from "react";
import { useState } from "react";

function DateFilter({ onSearchByDate }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    if (startDate && endDate) {
      onSearchByDate(startDate, endDate);
    }
  };

  return (
    <section className="dateFilterContainer">
      <div className="d-flex align-items-center mb-3">
        <div className="me-3">
          <label className="form-label">Tanggal Mulai:</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="me-3">
          <label className="form-label">Tanggal Akhir:</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        
        <div className="pt-4">
          <button className="btn btn-primary" onClick={handleSearch}>
            Filter
          </button>
        </div>
        
      </div>
    </section>
  );
}

export default DateFilter;
