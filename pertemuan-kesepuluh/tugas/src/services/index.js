import GetAPI from "./Get";
import PostAPI from "./Post";
import DeleteAPI from "./Delete";

// Daftar API - Get
const getNewsBlog = () => GetAPI('mahasiswa?_sort=id&_order=desc');

// Daftar API - Post
const postNewsBlog = (dataYgDikirim) => PostAPI('mahasiswa', dataYgDikirim);

// Daftar API - Delete
const deleteNewsBlog = (dataYgDihapus) => DeleteAPI('mahasiswa', dataYgDihapus);

const API = {
    getNewsBlog,
    postNewsBlog,
    deleteNewsBlog
}

export default API;