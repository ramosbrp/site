document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    let data = {
        name: document.getElementById('name').value,
        comment: document.getElementById('comment').value,
    }

    try {
        const response = await fetch('https://backend-site-98a38bb92184.herokuapp.com/submit-comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const responseData = await response.json();
        console.log('Success: ', responseData.message);

        // Exibe a notificação
        const notificacao = document.getElementById('notificacao');
        notificacao.style.display = 'block';

        // Aguarda 3 segundos e oculta a notificação
        setTimeout(() => {
            notificacao.style.display = 'none';
        }, 3000);

        document.getElementById('name').value = "";
        document.getElementById('comment').value = "";
        await inserirComentarios(responseData);

    } catch (error) {
        console.error('Error: ', error)
    }

});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('https://backend-site-98a38bb92184.herokuapp.com/get-comments?post_id=1')


        const responseData = await response.json();
        console.log('Success: ', responseData.message);

        inserirComentarios(responseData.results);

    } catch (error) {
        console.error('Erro ao carregar comentários: ', error);
    }
});

const inserirComentarios = (responseData) => {
    const containerComentarios = document.getElementById('container-comentarios');

    if (!Array.isArray(responseData)) {
        responseData = [responseData];
    }
    responseData.forEach(comentario => {
        const comentarioDiv = document.createElement('div');
        comentarioDiv.classList.add('comentario');

        const nome = document.createElement('h4');
        nome.textContent = comentario.nome; // Assumindo que 'nome' é a propriedade do objeto
        comentarioDiv.appendChild(nome);

        const data = document.createElement('span');
        data.textContent = new Date(comentario.data).toLocaleDateString('pt-BR', {
            day: '2-digit', month: 'long', year: 'numeric'
        });
        data.classList.add('data-comentario');
        comentarioDiv.appendChild(data);

        const textoComentario = document.createElement('p');
        textoComentario.textContent = comentario.comentario;
        comentarioDiv.appendChild(textoComentario);

        containerComentarios.appendChild(comentarioDiv);
    });
}