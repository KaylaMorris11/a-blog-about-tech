const commentHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#comment-description').value.trim();
  
    if (description) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post.');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post.');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentHandler);
  