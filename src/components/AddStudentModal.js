import React, { useState } from "react";

export default function AddStudentModal({ onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: "", email: "", address: "", phone: "" });
    // Đóng modal sau khi thêm thành công
    window.$('#addStudentModal').modal('hide');
  };

  return (
    <div id="addStudentModal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">						
              <h4 className="modal-title">Thêm sinh viên</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">					
              <div className="form-group">
                <label>Tên</label>
                <input type="text" className="form-control" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <textarea className="form-control" value={form.address} onChange={e => setForm({...form, address: e.target.value})} required></textarea>
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input type="text" className="form-control" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
              </div>					
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Hủy</button>
              <button type="submit" className="btn btn-success">Thêm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
