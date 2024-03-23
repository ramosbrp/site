document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    var data = {
        name: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        message: document.getElementById('mensagem').value
    }

    try {
        const response = await fetch('https://backend-site-98a38bb92184.herokuapp.com/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const responseData = await response.json();
        console.log('Success: ', responseData);
    } catch (error){
            console.error('Error: ', error);
    }
    
})