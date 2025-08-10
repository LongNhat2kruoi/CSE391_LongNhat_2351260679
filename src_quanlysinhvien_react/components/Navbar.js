import React, { useState } from "react";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Xử lý tìm kiếm ở đây
    console.log("Searching for:", searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        {/* Logo/Brand */}
        <span
          className="navbar-brand fw-bold"
          style={{ color: "#435d7d", cursor: "pointer" }}
        >
          TLU
        </span>

        {/* Navigation Links */}
        <div className="navbar-nav">
          <button className="nav-link btn btn-link" style={{ color: "#435d7d", textDecoration: "none" }}>
            Trang chủ
          </button>
          <button
            className="nav-link btn btn-link active"
            style={{ color: "#435d7d", fontWeight: "bold", textDecoration: "none" }}
          >
            Sinh viên
          </button>
        </div>

        {/* Search Bar */}
        <div className="d-flex">
          <div className="input-group " style={{ width: "300px", gap: "5px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm sinh viên"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "6px 12px",
              }}
            />
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleSearch}
              style={{
                borderRadius: "4px",
                marginLeft: "5px",
              }}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
