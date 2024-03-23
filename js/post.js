document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    let data = {
        name: document.getElementById('name').value,
        comment: document.getElementById('comment').value
    }

    try{
        const response = await fetch('https://backend-site-98a38bb92184.herokuapp.com/submit-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        const responseData = await response.json();
        console.log('Success: ', responseData);
    
    } catch (error){
        console.error('Error: ', error)
    }

})