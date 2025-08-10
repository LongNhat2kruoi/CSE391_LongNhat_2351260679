import React from "react";
import StudentRow from "./StudentRow";

export default function StudentTable({ Students, onEdit, onDelete, selectedIds, onCheck, onCheckAll, onDeleteSelected }) {
  return (
    <div className="table-responsive">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-6">
              <h2><b>Quản lý sinh viên</b></h2>
            </div>
            <div className="col-sm-6">
              <a href="#addStudentModal" className="btn btn-success" data-toggle="modal">
                <i className="material-icons">&#xE147;</i> <span>Thêm sinh viên mới</span>
              </a>
              <button
                className="btn btn-danger ml-2"
                disabled={selectedIds.length === 0}
                onClick={onDeleteSelected}
                style={{marginLeft: '10px'}}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedIds.length === Students.length && Students.length > 0}
                  onChange={e => onCheckAll(e.target.checked)}
                />
              </th>
              <th>Tên</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Điện thoại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {Students.map(e => (
              <StudentRow
                key={e.id}
                Student={e}
                onEdit={onEdit}
                onDelete={onDelete}
                checked={selectedIds.includes(e.id)}
                onCheck={onCheck}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
