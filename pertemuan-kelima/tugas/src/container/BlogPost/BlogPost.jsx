import React, {Component} from "react";
import './BlogPost.css';
import Post from "../../component/BlogPost/Post";

class BlogPost extends Component{
    state = {               // Komponen state dari React untuk statefull component
        listArtikel: [],     // Variabel array yang digunakan untuk menyimpan data API
        insertArtikel: {
            id: 1,
            NIM: "",
            nama: "",
            alamat: "",
            hp: "",
            angkatan: "",
            status: ""
        }
    }

    ambilDataDariServerAPI = () => {
        fetch('http://localhost:3001/mahasiswa')    // Alamat URL API yang ingin kita ambil datannya
        .then(response => response.json())      // Ubah response data dari URL API menjadi sebuah data json
        .then(jsonHasilAmbilDariAPI => {        // Data json hasil ambil cari API kita masukkan ke dalam listArtikel pada state
            this.setState({
                listArtikel: jsonHasilAmbilDariAPI
            })
        })
    }

    componentDidMount(){                    // Komponen untuk mengecek ketika component telah di mounting, maka panggil API
        this.ambilDataDariServerAPI()       // Ambil data dari server API lokal
    }

    handleHapusArtikel = (data) => {
        fetch(`http://localhost:3001/mahasiswa/${data}`, {method: 'DELETE'})
        .then(res => {
            this.ambilDataDariServerAPI(console.log(this.ambilDataDariServerAPI))
        })
    }

    handleTambahArtikel = (event) => {
        let formInsertArtikel = {...this.state.insertArtikel};
        let timestamp = new Date().getTime();
        formInsertArtikel['id'] = timestamp;
        formInsertArtikel[event.target.name] = event.target.value;
        this.setState({
            insertArtikel: formInsertArtikel
        })
    }

    handleTombolSimpan = () => {
        fetch('http://localhost:3001/mahasiswa', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.insertArtikel)
        })
            .then((Response) => {
                this.ambilDataDariServerAPI();
            })
    }

    render(){
        return(
            <div className="post-artikel">
                <div className="form pb-2 border-bottom">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Nama</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" name="title" onChange={this.handleTambahArtikel}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">NIM</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="NIM" name="NIM" onChange={this.handleTambahArtikel}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="body" className="col-sm-2 col-form-label">Alamat</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="alamat" name="alamat" rows="2" onChange={this.handleTambahArtikel}></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">No HP</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="hp" name="hp" onChange={this.handleTambahArtikel}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Angkatan</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="angkatan" name="angkatan" onChange={this.handleTambahArtikel}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="status" name="status" onChange={this.handleTambahArtikel}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                </div>
                <h2>Daftar Artikel</h2>
                {
                    this.state.listArtikel.map(artikel => {     // Looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
                        return <Post key={artikel.id} idArtikel={artikel.id} NIM={artikel.NIM} nama={artikel.nama} alamat={artikel.alamat} hp={artikel.hp} angkatan={artikel.angkatan} status={artikel.status} hapusArtikel={this.handleHapusArtikel}/>   // Mappingkan data json dari API sesuai dengan kategorinya
                    })
                }
            </div>
        )
    }
}

export default BlogPost;