document.getElementById('comment-form').addEventListener('submit', (e) => {
    e.preventDefault();

    let data = {
        name: document.getElementById('name').value,
        comment: document.getElementById('comment').value
    }

    fetch('https://backend-site-98a38bb92184.herokuapp.com/submit-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
    console.log('ok')
            console.log('Success: ', data);
        })
        .catch((error) => {
            console.error('Error:', error)
        })


})