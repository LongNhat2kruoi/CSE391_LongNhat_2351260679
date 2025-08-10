import React from "react";

export default function DeleteStudentModal({ Student, onDelete }) {
  const handleDelete = () => {
    if (Student) {
      onDelete(Student.id);
      // Đóng modal sau khi xóa thành công
      window.$('#deleteStudentModal').modal('hide');
    }
  };

  return (
    <div id="deleteStudentModal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
            <div className="modal-header">						
              <h4 className="modal-title">Xoá thông tin sinh viên</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">					
              <p>Bạn có chắc chắn muốn xoá bản ghi này không?</p>
              <p className="text-warning"><small>Hành động này không thể hoàn tác.</small></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Hủy</button>
              <button type="submit" className="btn btn-danger">Xoá</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
