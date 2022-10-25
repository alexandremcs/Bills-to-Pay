const modal = document.querySelector('.modal-container');

function openModal(action){
    modal.classList.add('active');

    if (action === 'new') {
        console.log("new bill");
    }

    if (action === 'edit') {
        
    }
}

function closeModal() {
    modal.classList.remove('active')
}