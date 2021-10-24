const newCommentHandler = async (event) => {

    event.preventDefault();

    const description = document.querySelector('#commentDesc').value.trim();
    const post_id = document.querySelector('#commentDesc').dataset.post_id;

    if (description) {

        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ description, post_id }),
            headers: { 'Content-Type': 'application/json ' },
        });

        if (response.ok) {
            location.reload();
        } else {
            alert('Comment failed.')
        }
    }
};

document
    .querySelector('#newComment')
    .addEventListener('submit', newCommentHandler);