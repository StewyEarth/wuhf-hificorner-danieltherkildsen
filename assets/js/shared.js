document.addEventListener('DOMContentLoaded', () => {
    let companynameElem = document.querySelector('.companyname');
    let address1Elem = document.querySelector('.address1');
    let address2Elem = document.querySelector('.address2');

    fetch('assets/data/contact-details.json')
        .then((response)=>{return response.json()})
        .then((data)=>{
            companynameElem.textContent = data.name;
            address1Elem.textContent = data.address;
            address2Elem.textContent = data.address2;
        });
});