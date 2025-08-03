// script.js - Các hàm xử lý logic ứng dụng

// Biến toàn cục
let selectedItems = [];

// Hiển thị dữ liệu ra bảng
function displayData() {
    const tableBody = document.getElementById('dataTable');
    tableBody.innerHTML = '';

    data.forEach((item, index) => {
        const stt = index + 1; // STT tăng dần từ 1
        const row = `
            <tr>
                <td><div class="bi bi-caret-down-square" onchange="toggleSelection(${index})" style="padding-right: 5px;"></td>
                <td>
                    <button class="btn btn-action btn-view" onclick="viewItem(${index})" title="Xem">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-action btn-edit" onclick="editItem(${index})" title="Sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-action btn-delete" onclick="deleteItem(${index})" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
                <td><strong>${stt}</strong></td>
                <td>${item.Name}</td>
                <td>${item.LastName}</td>
                <td>${item.address}</td>
                <td>
                    <span class="badge bg-success">Hoạt động</span>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    updateDeleteButton();
}

// Toggle chọn checkbox
function toggleSelection(index) {
    const itemIndex = selectedItems.indexOf(index);
    if (itemIndex > -1) {
        selectedItems.splice(itemIndex, 1);
    } else {
        selectedItems.push(index);
    }
    updateDeleteButton();
}


// Xem chi tiết
function viewItem(index) {
    const item = data[index];
    if (item) {
        alert(`Chi tiết thông tin:\nSTT: ${index + 1}\nTên: ${item.Name}\nHọ Tên: ${item.LastName}\nĐịa chỉ: ${item.address}`);
    }
}

// Sửa item
function editItem(index) {
    const item = data[index];
    if (item) {
        document.getElementById('customerName').value = item.Name;
        document.getElementById('employeeName').value = item.LastName;
        document.getElementById('amount').value = item.address;
        document.getElementById('notes').value = '';

        document.getElementById('addModal').dataset.editIndex = index;
        document.querySelector('.modal-title').innerHTML = '<i class="fas fa-edit me-2"></i>Sửa bản ghi';

        const modal = new bootstrap.Modal(document.getElementById('addModal'));
        modal.show();
    }
}

// Xóa 1 bản ghi
function deleteItem(index) {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
        if (index >= 0 && index < data.length) {
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
        // Sắp xếp index giảm dần để xóa từ cuối lên đầu
        selectedItems.sort((a, b) => b - a);
        
        selectedItems.forEach(index => {
            if (index >= 0 && index < data.length) {
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

    // Reset error messages và classes
    document.getElementById('customerError').textContent = '';
    document.getElementById('employeeError').textContent = '';
    document.getElementById('amountError').textContent = '';
    
    // Reset invalid classes
    document.getElementById('customerName').classList.remove('is-invalid');
    document.getElementById('employeeName').classList.remove('is-invalid');
    document.getElementById('amount').classList.remove('is-invalid');

    const customerName = document.getElementById('customerName').value.trim();
    const employeeName = document.getElementById('employeeName').value.trim();
    const amount = document.getElementById('amount').value.trim();

    // Validate Tên (không quá 15 ký tự)
    if (!customerName) {
        document.getElementById('customerError').textContent = 'Vui lòng nhập tên!';
        document.getElementById('customerName').classList.add('is-invalid');
        isValid = false;
    } else if (customerName.length > 15) {
        document.getElementById('customerError').textContent = 'Tên không được vượt quá 15 ký tự!';
        document.getElementById('customerName').classList.add('is-invalid');
        isValid = false;
    }

    // Validate Họ đệm (không quá 20 ký tự)
    if (!employeeName) {
        document.getElementById('employeeError').textContent = 'Vui lòng nhập họ đệm!';
        document.getElementById('employeeName').classList.add('is-invalid');
        isValid = false;
    } else if (employeeName.length > 20) {
        document.getElementById('employeeError').textContent = 'Họ đệm không được vượt quá 20 ký tự!';
        document.getElementById('employeeName').classList.add('is-invalid');
        isValid = false;
    }

    // Validate Địa chỉ (không quá 50 ký tự)
    if (!amount) {
        document.getElementById('amountError').textContent = 'Vui lòng nhập địa chỉ!';
        document.getElementById('amount').classList.add('is-invalid');
        isValid = false;
    } else if (amount.length > 50) {
        document.getElementById('amountError').textContent = 'Địa chỉ không được vượt quá 50 ký tự!';
        document.getElementById('amount').classList.add('is-invalid');
        isValid = false;
    }

    return isValid;
}

// Thêm hoặc cập nhật bản ghi
function addRecord() {
    if (!validateForm()) return;

    const customerName = document.getElementById('customerName').value.trim();
    const employeeName = document.getElementById('employeeName').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const editIndex = document.getElementById('addModal').dataset.editIndex;

    if (editIndex !== undefined) {
        const index = parseInt(editIndex);
        if (index >= 0 && index < data.length) {
            data[index] = {
                Name: customerName,
                LastName: employeeName,
                address: amount
            };
            showSuccessMessage('Cập nhật bản ghi thành công!');
        }
        delete document.getElementById('addModal').dataset.editIndex;
    } else {
        const newRecord = {
            Name: customerName,
            LastName: employeeName,
            address: amount
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
    
    // Reset bộ đếm ký tự
    document.getElementById('customerCount').textContent = '0/15';
    document.getElementById('employeeCount').textContent = '0/20';
    document.getElementById('amountCount').textContent = '0/50';
    
    // Reset invalid classes
    document.getElementById('customerName').classList.remove('is-invalid');
    document.getElementById('employeeName').classList.remove('is-invalid');
    document.getElementById('amount').classList.remove('is-invalid');
    
    delete document.getElementById('addModal').dataset.editIndex;
    document.querySelector('.modal-title').innerHTML = '<i class="fas fa-plus me-2"></i>Thêm thông tin';
});

// Khởi động
document.addEventListener('DOMContentLoaded', function () {
    // Sử dụng dữ liệu từ data.js (biến data đã được định nghĩa trong data.js)
    displayData();
    
    // Thêm validation real-time cho các input
    document.getElementById('customerName').addEventListener('input', function() {
        const value = this.value;
        const errorElement = document.getElementById('customerError');
        const countElement = document.getElementById('customerCount');
        
        countElement.textContent = `${value.length}/15`;
        
        if (value.trim().length > 15) {
            errorElement.textContent = 'Tên không được vượt quá 15 ký tự!';
            this.classList.add('is-invalid');
        } else {
            errorElement.textContent = '';
            this.classList.remove('is-invalid');
        }
    });
    
    document.getElementById('employeeName').addEventListener('input', function() {
        const value = this.value;
        const errorElement = document.getElementById('employeeError');
        const countElement = document.getElementById('employeeCount');
        
        countElement.textContent = `${value.length}/20`;
        
        if (value.trim().length > 20) {
            errorElement.textContent = 'Họ đệm không được vượt quá 20 ký tự!';
            this.classList.add('is-invalid');
        } else {
            errorElement.textContent = '';
            this.classList.remove('is-invalid');
        }
    });
    
    document.getElementById('amount').addEventListener('input', function() {
        const value = this.value;
        const errorElement = document.getElementById('amountError');
        const countElement = document.getElementById('amountCount');
        
        countElement.textContent = `${value.length}/50`;
        
        if (value.trim().length > 50) {
            errorElement.textContent = 'Địa chỉ không được vượt quá 50 ký tự!';
            this.classList.add('is-invalid');
        } else {
            errorElement.textContent = '';
            this.classList.remove('is-invalid');
        }
    });
});
