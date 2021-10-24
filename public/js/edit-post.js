const editPostHandler = async (event) => {

    event.preventDefault();

    const title = document.querySelector("#editPostTi").value.trim();
    const description = document.querySelector('#editPostDesc').value.trim();
    const post_id = document.querySelector('#editPost').dataset.post_id;

    if (title && description) {
        const response = await fetch(`/api/posts/edit/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: { '': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Update failed.');
        }
    }
};

document
    .querySelector('#editPost')
    .addEventListener('submit', editPostHandler);