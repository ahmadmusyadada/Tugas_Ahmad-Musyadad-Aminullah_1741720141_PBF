import React from "react";

const Post = (props) => {
    return (
        <div className="artikel">
           <div className="gambar-artikel">
             <img src="http://placeimg.com/80/80/tech" alt="Gambar Thumbnail Artikel"/>
            </div>
            <div className="konten-artikel">
                <div className="judul-artikel">{props.nama}</div>
                <p className="isi-artikel">NIM      : {props.NIM}</p>
                <p className="isi-artikel">Alamat   : {props.alamat}</p>
                <p className="isi-artikel">No. HP   : {props.hp}</p>
                <p className="isi-artikel">Angkatan : {props.angkatan}</p>
                <p className="isi-artikel">Status   : {props.status}</p>
                <button className="btn btn-sm btn-danger" onClick={() => props.hapusArtikel(props.idArtikel)}>Hapus</button>
            </div>
        </div>
    )
}

export default Post;