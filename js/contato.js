document.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;

    // Verifica se o formulário enviado é o de contato
    if (form.id === 'contact-form') {
    }

    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let message = document.getElementById('message');

    var data = {
        name: name.value,
        email: email.value,
        message: message.value
    }

    try {
        const response = await fetch('http://127.0.0.1:3001/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        console.log('Success: ', response.statusText);

        // Exibe a notificação
        const notificacao = document.getElementById('notificacao');
        notificacao.style.display = 'block';

        // Aguarda 3 segundos e oculta a notificação
        setTimeout(() => {
            notificacao.style.display = 'none';
        }, 3000);

        // Limpa os campo do form
        name.value = "";
        email.value = "";
        message.value = "";

    } catch (error) {
        console.error('Error: ', error);
    }

})

