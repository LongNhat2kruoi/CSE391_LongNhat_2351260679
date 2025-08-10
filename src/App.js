import React, { useState } from "react";
import Navbar from "./components/Navbar";
import StudentTable from "./components/StudentTable";
import AddStudentModal from "./components/AddStudentModal";
import EditStudentModal from "./components/EditStudentModal";
import DeleteStudentModal from "./components/DeleteStudentModal";
import { initialStudents } from "./data";
import "./styles.css";

function App() {
  const [Students, setStudents] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const addStudent = (Student) => {
    setStudents([...Students, { id: Date.now(), ...Student }]);
  };

  const updateStudent = (updated) => {
    setStudents(Students.map(e => e.id === updated.id ? updated : e));
  };

  const deleteStudent = (id) => {
    setStudents(Students.filter(e => e.id !== id));
  };

  // Xóa nhiều sinh viên
  const deleteSelectedStudents = () => {
    setStudents(Students.filter(e => !selectedIds.includes(e.id)));
    setSelectedIds([]);
  };

  // Chọn/bỏ chọn một sinh viên
  const handleCheck = (id, checked) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    }
  };

  // Chọn/bỏ chọn tất cả
  const handleCheckAll = (checked) => {
    if (checked) {
      setSelectedIds(Students.map(e => e.id));
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-xl">
        <StudentTable 
          Students={Students} 
          onEdit={setSelectedStudent} 
          onDelete={setSelectedStudent} 
          selectedIds={selectedIds}
          onCheck={handleCheck}
          onCheckAll={handleCheckAll}
          onDeleteSelected={deleteSelectedStudents}
        />
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="hint-text" style={{marginLeft: '10px'}}>
            Showing {Students.length} out of {Students.length} entries
          </span>
          <ul className="pagination mb-0" style={{marginRight: '10px'}}>
            <li className="page-item"><button type="button" className="page-link">Previous</button></li>
            <li className="page-item"><button type="button" className="page-link">1</button></li>
            <li className="page-item"><button type="button" className="page-link">2</button></li>
            <li className="page-item active"><button type="button" className="page-link">3</button></li>
            <li className="page-item"><button type="button" className="page-link">4</button></li>
            <li className="page-item"><button type="button" className="page-link">5</button></li>
            <li className="page-item"><button type="button" className="page-link">Next</button></li>
          </ul>
        </div>
        <AddStudentModal onAdd={addStudent} />
        <EditStudentModal Student={selectedStudent} onUpdate={updateStudent} />
        <DeleteStudentModal Student={selectedStudent} onDelete={deleteStudent} />   
      </div>
    </div>
  );
}
export default App;
