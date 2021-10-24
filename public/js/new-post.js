const newPostHandler = async (event) => {

    event.preventDefault();

    const postTitle = document.querySelector('#title').value.trim();
    const postDescrip = document.querySelector('#description').value.trim();

    if (postTitle && postDescrip) {

        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({ postTitle, postDescrip }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Post failed.');
        }
    }
};

document
    .querySelector('#newPost')
    .addEventListener('submit', newPostHandler);