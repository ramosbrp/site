document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    var data = {
        name: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        message: document.getElementById('mensagem').value
    }

    try {
        const response = await fetch('https://backend-site-98a38bb92184.herokuapp.comsend-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        // const responseData = await response.json();
        console.log('Success: ', response.statusText);

        // Exibe a notificação
        const notificacao = document.getElementById('notificacao');
        notificacao.style.display = 'block';

        // Aguarda 3 segundos e oculta a notificação
        setTimeout(() => {
            notificacao.style.display = 'none';
        }, 3000);

        document.getElementById('nome').value = "";
        document.getElementById('email').value = "";
        document.getElementById('mensagem').value = "";

    } catch (error){
            console.error('Error: ', error);
    }
    
})