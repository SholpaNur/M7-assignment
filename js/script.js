const $ = (id) => document.getElementById(id)
let table = $('employees')
let count = 0;
let id = $('id'), nm = $('name'), ext = $('extension'), email = $('email'), department = $('department');
out = $('empCount');

let deleteEmp = (e) => {
    let empName = e.target.parentNode.parentNode.children[1].textContent;
    let cDel = confirm(`confirm deleting ${empName}?`);
    if (cDel) {
        table.deleteRow(e.target.parentNode.parentNode.rowIndex);
        count--;
        out.textContent = count;
    }
}

let clicked = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let idv = id.value, namev = nm.value, extv = ext.value, emailv = email.value;
    if (
        idv !== undefined && idv.length === 8 &&
        namev !== undefined && namev.length > 0 &&
        extv !== undefined && extv.length === 4 &&
        emailv !== undefined && emailv.length > 0
    ) {
        let row = table.insertRow(-1);
        let cell, txt, deleteBtn;

        for (let el of [idv, namev, extv, emailv, department.value]) {
            cell = row.insertCell();
            txt = document.createTextNode(el);
            cell.appendChild(txt);
        }

        deleteBtn = document.createElement('button')
        deleteBtn.className = 'btn btn-danger btn-sm float-end delete'
        let textDelete = document.createTextNode('X')
        deleteBtn.appendChild(textDelete)

        cell.appendChild(deleteBtn)
        id.value = '';
        nm.value = '';
        ext.value = '';
        email.value = '';
        id.focus();

        deleteBtn.addEventListener('click', deleteEmp)
        count++;
        out.textContent = count;
    }
}

window.addEventListener('load', () => {
    let form = $('addForm');
    form.addEventListener('submit', clicked)
})
