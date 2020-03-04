import React, {Component} from "react";
import './BlogPost.css';
import Post from "./Post";

class BlogPost extends Component{
    state = {               // Komponen state dari React untuk statefull component
        listArtikel: []     // Variabel array yang digunakan untuk menyimpan data API
    }

    componentDidMount(){                                            // Komponen untuk mengecek ketika component telah di mounting, maka panggil API
        fetch('http://localhost:3001/posts')         // Alamat URL API yang ingin kita ambil datanya
        .then(response => response.json())                          // Ubah response data dari URL API menjadi sebuah data json
        .then(jsonHasilAmbilDariAPI => {                            // Data json hasil ambil dari API kita masukkan ke dalam listArtikel pada state
            this.setState({listArtikel: jsonHasilAmbilDariAPI})
        })
    }

    render(){
        return(
            <div className="post-artikel">
                <h2>Daftar Artikel</h2>
                {
                    this.state.listArtikel.map(artikel => {     // Looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
                        return <Post key={artikel.id} judul={artikel.title} isi={artikel.body}/>   // Mappingkan data json dari API sesuai dengan kategorinya
                    })
                }
            </div>
        )
    }
}

export default BlogPost;