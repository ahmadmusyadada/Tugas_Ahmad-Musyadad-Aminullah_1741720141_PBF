import GetAPI from "./Get";
import PostAPI from "./Post";
import DeleteAPI from "./Delete";

// Daftar API - Get
const getNewsBlog = () => GetAPI('posts?_sort=id&_order=desc');

// Daftar API - Post
const postNewsBlog = (dataYgDikirim) => PostAPI('posts', dataYgDikirim);

// Daftar API - Delete
const deleteNewsBlog = (dataYgDihapus) => DeleteAPI('posts', dataYgDihapus);

const API = {
    getNewsBlog,
    postNewsBlog,
    deleteNewsBlog
}

export default API;