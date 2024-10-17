const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts/?_limit=5';

class DataHandler  {
    constructor() {
        this.data = new Map();
    }

    async fetchPosts() {
        return await fetch(POSTS_URL)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong!');
                }
            })
            .then((response) => {
                response.forEach((post) => {
                    this.data.set(post.id, 
                        {
                            userId: post.userId, 
                            title: post.title, 
                            body: post.body
                        }
                    );
                });
            })
            .catch((error) => {
                console.error(error.message);
            });
    }

    listPosts() {
        if (!this.isEmpty()) {
            return new Map([...this.data].sort((a, b) => {
                return a[1].title.localeCompare(b[1].title);
            }));
        }

        return null;
    }

    getPost(id) {
        return this.data.get(id) || null;  
    }

    clearPosts() {
        if (!this.isEmpty()) {
            this.data.clear();
        } 
    }

    isEmpty() {
        return this.data.size === 0;
    }
}