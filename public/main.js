const output = document.querySelector("#output");
const button = document.querySelector("#get-posts-btn");
const postForm = document.querySelector("#add-post-form");

async function showPosts() {
    try {
        const res = await fetch('http://localhost:8000/api/posts');
        if (!res.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await res.json();
        output.innerHTML = '';

        posts.forEach((post) => {
            const postEl = document.createElement('div');
            postEl.textContent = post.title;
            output.appendChild(postEl);
        });
    } catch (error) {
        console.log('error fetching posts:', error);
    }
}

async function addPost(event) {
    event.preventDefault();
    const formData = new FormData(postForm);
    const title = formData.get('title');

    try {
        const res = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        });

        if (!res.ok) {
            throw new Error('Failed to add post');
        }

        const newPost = await res.json();

        const postEl = document.createElement('div');
        postEl.textContent = newPost.title;
        output.appendChild(postEl);
    } catch (error) {
        console.log('error addPost:', error);
    }
}

button.addEventListener('click', showPosts);
postForm.addEventListener('submit', addPost);
