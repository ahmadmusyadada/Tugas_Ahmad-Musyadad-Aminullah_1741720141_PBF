import React, {Component} from "react";
import './BlogPost.css';
import Post from "./Post";

class BlogPost extends Component{
    render(){
        return(
            <div class="post-artikel">
                <h2>Daftar Artikel</h2>
                <Post/>
            </div>
        )
    }
}

export default BlogPost;