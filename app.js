function attachEvents() {

    const baseURL = 'https://phonebook-nakov.firebaseio.com/phonebook.json';

    let loadButon = document.getElementById('btnLoad');
    let phoneBookList = document.getElementById('phonebook');
    let createButton = document.getElementById('btnCreate');
    

    loadButon.addEventListener('click', () => {
        fetch(baseURL)
            .then(res => res.json())
            .then(data => {
                Object.keys(data).forEach(x => {
                    let newEl = document.createElement('li');
                    newEl.innerHTML = `${data[x].person} : ${data[x].phone}`;
                    let deleteBtn = document.createElement('button');
                    deleteBtn.innerHTML = "DELETE";;
                    newEl.appendChild(deleteBtn);
                    phoneBookList.appendChild(newEl);
                    deleteBtn.addEventListener('click', () => {
                        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${x}.json`,
                        {
                            method: "DELETE"    
                        });
                    });
                });
            });
    });

    createButton.addEventListener('click', () => {
        let personBlank = document.getElementById('person').value;
        let phoneBlank = document.getElementById('phone').value;

        fetch(baseURL, {
            method: "POST",
            body: JSON.stringify({person : `${personBlank}` , phone : `${phoneBlank}`})
        });
    });
}

attachEvents();