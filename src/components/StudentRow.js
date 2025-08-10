import React from "react";

export default function StudentRow({ Student, onEdit, onDelete, checked, onCheck }) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onCheck(Student.id, e.target.checked)}
        />
      </td>
      <td>{Student.name}</td>
      <td>{Student.email}</td>
      <td>{Student.address}</td>
      <td>{Student.phone}</td>
      <td>
        <a
          href="#editStudentModal"
          className="edit"
          data-toggle="modal"
          onClick={() => onEdit(Student)}
        >
          <i className="material-icons" title="Edit">&#xE254;</i>
        </a>
        <a
          href="#deleteStudentModal"
          className="delete"
          data-toggle="modal"
          onClick={() => onDelete(Student)}
        >
          <i className="material-icons" title="Delete">&#xE872;</i>
        </a>
      </td>
    </tr>
  );
}
