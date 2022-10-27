const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const dueDate = document.getElementById('due-date')
const value = document.getElementById('value')
const description = document.getElementById('description')
const save = document.getElementById('save')

let bills = [
    {dueDate: '26/10/2022', description: 'Água', value: '300'},
    {dueDate: '27/10/2022', description: 'Luz', value: '400'},
]
let id

function getBillsDB () {
    JSON.parse(localStorage.getItem('db_bills')) ?? []
}

function setBillsDB () {
    localStorage.setItem('db_bills', JSON.stringify(bills))
}

function loadBillsTable () {
    //bills = getBillsDB()    
    tbody.innerHTML = ''
    bills.forEach((bill, index) => {
        insertBill(bill, index)
    });
}

loadBillsTable()

function insertBill (bill, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${bill.dueDate}</td>
        <td>${bill.description}</td>
        <td>R$${bill.value}</td>
        <td class="bills-table-action">
            <button onclick="payBill${index}"><i class='bx bxs-wallet'></i></button>
        </td>
        <td class="bills-table-action">
            <button onclick="editBill${index}"><i class='bx bxs-edit'></i></button>
        </td>
        <td class="bills-table-action">
            <button onclick="deleteBill${index}"><i class='bx bxs-eraser'></i></button>
        </td>
    `

    tbody.appendChild(tr)
}

function openModal(action){
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active')
}