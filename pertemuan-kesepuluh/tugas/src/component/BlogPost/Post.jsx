import React from "react";

const Post = (props) => {
    return (
        <div className="artikel">
           <div className="gambar-artikel">
             <img src="http://placeimg.com/80/80/tech" alt="Gambar Thumbnail Artikel"/>
            </div>
            <div className="konten-artikel">
                <div className="judul-artikel">{props.nama}</div>
                <p className="isi-artikel">NIM &emsp;&emsp;&nbsp;: {props.NIM}</p>
                <p className="isi-artikel">Alamat &emsp;: {props.alamat}</p>
                <p className="isi-artikel">No. HP &emsp;: {props.hp}</p>
                <p className="isi-artikel">Angkatan : {props.angkatan}</p>
                <p className="isi-artikel">Status &emsp;&ensp;: {props.status}</p>
                <button className="btn btn-sm btn-danger" onClick={() => props.hapusArtikel(props.idArtikel)}>Hapus</button>
            </div>
        </div>
    )
}

export default Post;