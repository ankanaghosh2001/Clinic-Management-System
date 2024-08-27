let pid = document.getElementById("PID");
let did = document.getElementById("DID");

window.onload = () => {
    fetch('/patient')
    .then (res =>{
        if(!res.ok){
            throw new Error(`HTTP error! status : ${res.status}`); 
        }
        return res.json();
    })
    .then (data => {
        data.forEach(element => {
            let optionText = `<option value = ${element.PID}>${element.PID}</option>`;
            pid.innerHTML += optionText;
        });
    })

    fetch('/doctor')
    .then (res => {
        if(!res.ok){
            throw new Error(`HTTP error! status : ${res.status}`);
        }
        return res.json();
    })
    .then (data => {
        data.forEach(element => {
            let optionText = `<option value = ${element.DID}>${element.DID}</option>`;
            did.innerHTML += optionText;
        });
    });
}