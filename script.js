const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const dueDate = document.getElementById('due-date')
const billValue = document.getElementById('bill-value')
const description = document.getElementById('description')
const btnSave = document.getElementById('btn-save')

let bills = []
let id

const getBillsDB = () => JSON.parse(localStorage.getItem('db_bills')) ?? []

const setBillsDB = () => localStorage.setItem('db_bills', JSON.stringify(bills))

function compareDueDate(a,b) {
    if (a.dueDate < b.dueDate)
       return -1;
    if (a.dueDate > b.dueDate)
      return 1;
    return 0;
}
  
function loadBillsTable () {
    bills = getBillsDB()
    bills.sort(compareDueDate)    
    tbody.innerHTML = ''
    bills.forEach((bill, index) => {
        insertBill(bill, index)
    });
}

loadBillsTable()

function insertBill (bill, index) {
    let tr = document.createElement('tr')

    let date = new Date(bill.dueDate)
    let dateFormated = ((date.getDate() + 1)) + "-" + ((date.getMonth() + 1)) + "-" + date.getFullYear(); 

    tr.innerHTML = `        
        <td class="bills-table-dueDate">${dateFormated}</td>        
        <td class="bills-table-billValue">R$${bill.billValue}</td>
        <td>${bill.description}</td>
        <td class="bills-table-action">
            <button onclick="editBill(${index})"><i class='bx bxs-edit'></i></button>
        </td>
        <td class="bills-table-action">
            <button onclick="deleteBill(${index})"><i class='bx bxs-eraser'></i></button>
        </td>
    `

    tbody.appendChild(tr)
}

function editBill (index) {
    openModal(true, index)
}

function deleteBill(index) {
    bills.splice(index, 1)
    setBillsDB()
    loadBillsTable()
}

function openModal(edit = false, index = 0){
    modal.classList.add('active');

    if (edit) {
        dueDate.value = bills[index].dueDate
        description.value = bills[index].description
        billValue.value = bills[index].billValue
        id = index
    } else {
        dueDate.value = ''
        description.value = ''
        billValue.value = ''
    }
}

btnSave.onclick = e => {
    if(dueDate.value == '' | description.value == '' | billValue.value == ''){
        return
    }

    e.preventDefault()

    if (id !== undefined) {
        bills[id].dueDate = dueDate.value
        bills[id].description = description.value
        bills[id].billValue = billValue.value
    } else {
        bills.push({"dueDate": dueDate.value, "description": description.value, "billValue": billValue.value})
    }

    setBillsDB()

    closeModal()
    loadBillsTable()
    id = undefined
}

function closeModal() {
    modal.classList.remove('active')
}