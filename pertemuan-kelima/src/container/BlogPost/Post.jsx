import React from "react";

const Post = (props) => {
    return (
        <div class="artikel">
           <div class="gambar-artikel">
             <img src="http://placeimg.com/80/80/tech" alt="Gambar Thumbnail Artikel"/>
            </div>
            <div class="konten-artikel">
                <div class="judul-artikel">{props.judul}</div>
                <p class="isi-artikel">{props.isi}</p>
            </div>
        </div>
    )
}

export default Post;