const form = document.getElementById("formSinhVien");
const table = document.getElementById("tableSV").getElementsByTagName("tbody")[0];
let editIndex = -1;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const maSV = document.getElementById("maSV").value.trim();
  const hoTen = document.getElementById("hoTen").value.trim();
  const email = document.getElementById("email").value.trim();
  const ngaysinh = document.getElementById("ngaysinh").value;
  const gioiTinh = document.querySelector('input[name="gioiTinh"]:checked')?.value || "";

  if (!maSV || !hoTen || !email || !ngaysinh || !gioiTinh) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  const regexEmail = /^\S+@\S+\.\S+$/;
  if (!regexEmail.test(email)) {
    alert("Email không hợp lệ!");
    return;
  }

  if (editIndex === -1) {
    const newRow = table.insertRow();
    newRow.innerHTML = `
      <td></td>
      <td>${maSV}</td>
      <td>${hoTen}</td>
      <td>${email}</td>
      <td>${gioiTinh}</td>
      <td>${ngaysinh}</td>
      <td>
        <button class="btn btn-warning btn-sm btn-edit">Sửa</button>
        <button class="btn btn-danger btn-sm btn-delete">Xoá</button>
      </td>`;
  } else {
    const row = table.rows[editIndex];
    row.cells[1].innerText = maSV;
    row.cells[2].innerText = hoTen;
    row.cells[3].innerText = email;
    row.cells[4].innerText = gioiTinh;
    row.cells[5].innerText = ngaysinh;
    editIndex = -1;
    form.querySelector("button[type='submit']").innerText = "Thêm sinh viên";
  }

  form.reset();
  capNhatSTT();
  ganSuKien();
});

function capNhatSTT() {
  for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[0].innerText = i + 1;
  }
}

function ganSuKien() {
  const btnDeletes = table.querySelectorAll(".btn-delete");
  const btnEdits = table.querySelectorAll(".btn-edit");

  btnDeletes.forEach((btn, index) => {
    btn.onclick = function () {
      if (confirm("Bạn có chắc chắn muốn xoá sinh viên này?")) {
        table.deleteRow(index);
        capNhatSTT();
        ganSuKien();
      }
    };
  });

  btnEdits.forEach((btn, index) => {
    btn.onclick = function () {
      const row = table.rows[index];
      document.getElementById("maSV").value = row.cells[1].innerText;
      document.getElementById("hoTen").value = row.cells[2].innerText;
      document.getElementById("email").value = row.cells[3].innerText;
      document.getElementById("ngaysinh").value = row.cells[5].innerText;

      const gioiTinh = row.cells[4].innerText;
      document.querySelectorAll('input[name="gioiTinh"]').forEach(radio => {
        radio.checked = (radio.value === gioiTinh);
      });

      editIndex = index;
      form.querySelector("button[type='submit']").innerText = "Cập nhật sinh viên";
    };
  });
}

capNhatSTT();
ganSuKien();
