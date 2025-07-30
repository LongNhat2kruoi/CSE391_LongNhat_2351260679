let currentPage = 1;
const entriesPerPage = 5;

function renderTable() {
  const start = (currentPage - 1) * entriesPerPage;
  const end = start + entriesPerPage;
  const visibleEmployees = employees.slice(start, end);

  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  visibleEmployees.forEach((emp) => {
    tableBody.innerHTML += `
      <tr>
        <td><input type="checkbox" /></td>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.address}</td>
        <td>${emp.phone}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1">✏️</button>
          <button class="btn btn-sm btn-danger">🗑️</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("showingCount").textContent = visibleEmployees.length;
  document.getElementById("totalCount").textContent = employees.length;

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(employees.length / entriesPerPage);
  const pagination = document.getElementById("paginationButtons");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <button class="btn btn-outline-primary ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>
    `;
  }
}

function goToPage(page) {
  currentPage = page;
  renderTable();
}

function addEmployee(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();

  employees.push({ name, email, address, phone });

  document.getElementById("addForm").reset();
  bootstrap.Modal.getInstance(document.getElementById('modalAdd')).hide();
  renderTable();
}

function searchEmployee() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const tableBody = document.getElementById("tableBody");
  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(keyword) ||
    emp.email.toLowerCase().includes(keyword) ||
    emp.address.toLowerCase().includes(keyword) ||
    emp.phone.includes(keyword)
  );

  tableBody.innerHTML = "";

  filtered.forEach(emp => {
    tableBody.innerHTML += `
      <tr>
        <td><input type="checkbox" /></td>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.address}</td>
        <td>${emp.phone}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1">✏️</button>
          <button class="btn btn-sm btn-danger">🗑️</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("showingCount").textContent = filtered.length;
  document.getElementById("totalCount").textContent = employees.length;
}

window.onload = renderTable;
