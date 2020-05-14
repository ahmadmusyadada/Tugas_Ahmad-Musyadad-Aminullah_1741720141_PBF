import React from "react";

const AdminPost = (props) => {
    return (
        <div className="artikel">
            <div className="konten-artikel">
                <div className="judul-artikel">{props.judul}</div>
                <div className="gambar-artikel">
                    <img src={props.image} alt="Gambar thumbnail"/>
                </div>
                <p className="isi-artikel">
                    {props.isi}
                    <br/>
                    Watch it on <a href={props.linkyt} target="_blank">YouTube</a>
                    <br/>
                    <a href={props.linkdownload} target="_blank">Download</a>
                </p>
                <p className="kategory">Kategori: {props.kategory}</p>
                <button className="btn btn-sm btn-danger"
                    onClick={() => {if (window.confirm('Apakah yakin menghapus artikel ini?'))
                                        props.hapusArtikel(props.idArtikel)}}>Hapus</button>
                <button className="btn btn-sm btn-warning"
                    onClick={() => {props.editArtikel(props.idArtikel)}}>Edit</button>
            </div>
        </div>
    )
}

export default AdminPost;