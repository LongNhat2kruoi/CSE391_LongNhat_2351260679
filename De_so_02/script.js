// script.js - Các hàm xử lý logic ứng dụng

// Biến toàn cục
let selectedItems = [];
// nextId sẽ được lấy từ data.js

// Hiển thị dữ liệu ra bảng
function displayData() {
    const tableBody = document.getElementById('dataTable');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const row = `
            <tr>
                <td>
                    <input type="checkbox" class="form-check-input me-2" onchange="toggleSelection(${item.id})">
                    <button class="btn btn-action btn-view" onclick="viewItem(${item.id})" title="Xem">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-action btn-edit" onclick="editItem(${item.id})" title="Sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-action btn-delete" onclick="deleteItem(${item.id})" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
                <td><strong>${item.id}</strong></td>
                <td>${item.customerName}</td>
                <td>${item.employeeName}</td>
                <td><strong>${formatCurrency(item.amount)}</strong></td>
                <td>${formatDate(item.createdDate)}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    updateDeleteButton();
}

// Format tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
}

// Format ngày tháng
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day} tháng ${month} năm ${year}`;
}

// Toggle chọn checkbox
function toggleSelection(id) {
    const index = selectedItems.indexOf(id);
    if (index > -1) {
        selectedItems.splice(index, 1);
    } else {
        selectedItems.push(id);
    }
    updateDeleteButton();
}

// Cập nhật nút xóa nhiều
function updateDeleteButton() {
    const deleteButton = document.getElementById('deleteSelected');
    deleteButton.disabled = selectedItems.length === 0;
}

// Xem chi tiết
function viewItem(id) {
    const item = data.find(d => d.id === id);
    if (item) {
        alert(`Chi tiết giao dịch:\nID: ${item.id}\nKhách hàng: ${item.customerName}\nNhân viên: ${item.employeeName}\nSố tiền: ${formatCurrency(item.amount)}\nNgày: ${formatDate(item.createdDate)}\nGhi chú: ${item.notes || 'Không có'}`);
    }
}

// Sửa item
function editItem(id) {
    const item = data.find(d => d.id === id);
    if (item) {
        document.getElementById('customerName').value = item.customerName;
        document.getElementById('employeeName').value = item.employeeName;
        document.getElementById('amount').value = item.amount;
        document.getElementById('notes').value = item.notes || '';

        document.getElementById('addModal').dataset.editId = id;
        document.querySelector('.modal-title').innerHTML = '<i class="fas fa-edit me-2"></i>Sửa bản ghi';

        const modal = new bootstrap.Modal(document.getElementById('addModal'));
        modal.show();
    }
}

// Xóa 1 bản ghi
function deleteItem(id) {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
        const index = data.findIndex(d => d.id === id);
        if (index > -1) {
            data.splice(index, 1);
            displayData();
            showSuccessMessage('Xóa bản ghi thành công!');
        }
    }
}

// Xóa nhiều bản ghi
function deleteSelectedRecords() {
    if (selectedItems.length === 0) return;

    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedItems.length} bản ghi đã chọn?`)) {
        selectedItems.forEach(id => {
            const index = data.findIndex(d => d.id === id);
            if (index > -1) {
                data.splice(index, 1);
            }
        });

        selectedItems = [];
        displayData();
        showSuccessMessage('Đã xóa các bản ghi đã chọn!');
    }
}

// Validate form
function validateForm() {
    let isValid = true;

    document.getElementById('customerError').textContent = '';
    document.getElementById('employeeError').textContent = '';
    document.getElementById('amountError').textContent = '';

    const customerName = document.getElementById('customerName').value.trim();
    const employeeName = document.getElementById('employeeName').value.trim();
    const amount = document.getElementById('amount').value;

    if (!customerName) {
        document.getElementById('customerError').textContent = 'Vui lòng nhập tên khách hàng';
        isValid = false;
    } else if (customerName.length > 30) {
        document.getElementById('customerError').textContent = 'Tên khách hàng không được quá 30 ký tự';
        isValid = false;
    }

    if (!employeeName) {
        document.getElementById('employeeError').textContent = 'Vui lòng nhập tên nhân viên';
        isValid = false;
    } else if (employeeName.length > 30) {
        document.getElementById('employeeError').textContent = 'Tên nhân viên không được quá 30 ký tự';
        isValid = false;
    }

    if (!amount || amount <= 0) {
        document.getElementById('amountError').textContent = 'Vui lòng nhập số tiền hợp lệ';
        isValid = false;
    }

    return isValid;
}

// Thêm hoặc cập nhật bản ghi
function addRecord() {
    if (!validateForm()) return;

    const customerName = document.getElementById('customerName').value.trim();
    const employeeName = document.getElementById('employeeName').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const notes = document.getElementById('notes').value.trim();
    const editId = document.getElementById('addModal').dataset.editId;

    if (editId) {
        const index = data.findIndex(d => d.id == editId);
        if (index > -1) {
            data[index] = {
                ...data[index],
                customerName,
                employeeName,
                amount,
                notes
            };
            showSuccessMessage('Cập nhật bản ghi thành công!');
        }
        delete document.getElementById('addModal').dataset.editId;
    } else {
        const newRecord = {
            id: nextId++, // nextId từ data.js
            customerName,
            employeeName,
            amount,
            createdDate: new Date().toISOString().split('T')[0],
            notes
        };
        data.push(newRecord);
        showSuccessMessage('Thêm bản ghi thành công!');
    }

    displayData();
    document.getElementById('addForm').reset();

    const modal = bootstrap.Modal.getInstance(document.getElementById('addModal'));
    modal.hide();
}

// Thông báo thành công
function showSuccessMessage(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show success-alert';
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.innerHTML = `
        <strong>Thành công!</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alert);

    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 3000);
}

// Khi mở modal -> reset form
document.getElementById('addModal').addEventListener('show.bs.modal', function () {
    document.getElementById('addForm').reset();
    document.getElementById('customerError').textContent = '';
    document.getElementById('employeeError').textContent = '';
    document.getElementById('amountError').textContent = '';
    delete document.getElementById('addModal').dataset.editId;
    document.querySelector('.modal-title').innerHTML = '<i class="fas fa-plus me-2"></i>Thêm bản ghi mới';
});

// Khởi động
document.addEventListener('DOMContentLoaded', function () {
    // Sử dụng dữ liệu từ data.js (biến data đã được định nghĩa trong data.js)
    displayData();
    
    // Thêm sự kiện cho nút xóa nhiều
    document.getElementById('deleteSelected').addEventListener('click', deleteSelectedRecords);
});
