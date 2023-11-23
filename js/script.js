document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    var data = {
        name: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        message: document.getElementById('mensagem').value
    }

    fetch('http://127.0.0.1:3000/send-email', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success', data);
    })
    .catch((error) => {
        console.error('Error', error);
    })
    console.log(data);
})