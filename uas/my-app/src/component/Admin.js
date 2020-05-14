import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";
import '../container/mainPage.css';
import AdminPost from "./AdminPost";
import firebase from "firebase";

class Admin extends Component {
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };
    
    constructor(props){
        super(props);

        this.state = {
            listArtikel: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    ambilDataDariFirebase = () => {
        let ref = firebase.database().ref("/");
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        })
    }

    simpanDataKeFirebase = () => {
        firebase.database().ref("/").set(this.state);
    }

    componentDidMount() {
        this.ambilDataDariFirebase();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state){
            this.simpanDataKeFirebase();
        }
    }

    handleHapusArtikel = (idArtikel) => {
        const {listArtikel} = this.state;
        const newState = listArtikel.filter(data => {
            if (data.uid == idArtikel){
                var desertRef = firebase.storage().refFromURL(data.url);
                desertRef.delete().then(function() {
                    console.log("Success delete")
                }).catch(function(error) {
                    console.log("Uh-oh, an error occurred!");
                });
            }
            
            return data.uid !== idArtikel;
        })
        this.setState({listArtikel: newState});
    }

    handleEditArtikel = (idArtikel) => {
        const {listArtikel} = this.state;
        
        listArtikel.find(data => {
            if (data.uid == idArtikel){
                return ( this.refs.judulArtikelEdit.value = data.title,
                    this.refs.isiArtikelEdit.value = data.body,
                    this.refs.uidEdit.value = data.uid,
                    this.refs.imageSource.src = data.url)
            }
        })
    }

    handleTombolSimpan = () => {
        let title = this.refs.judulArtikel.value;
        let body = this.refs.isiArtikel.value;
        let uid = this.refs.uid.value;
        let image = this.refs.image.value;
        let category = this.refs.kategory.value;
        let linkyt = this.refs.linkyt.value;
        let linkdownload = this.refs.linkdownload.value;

        if (title && body && image){
            const uid = new Date().getTime().toString();
            
            const storage = firebase.storage();
            const {image} = this.state;
                const uploadTask = storage.ref(`images/${image.name}`).put(image);
                uploadTask.on('state_changed', 
                (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                // this.setState({progress});
                }, 
                (error) => {
                    // error function ....
                console.log(error);
                }, 
            () => {
                // complete function ....
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    const {listArtikel} = this.state;
                    listArtikel.push({uid, title, body, category, url, linkyt, linkdownload});
                    this.setState({listArtikel});
                })
            });
        }

        this.refs.judulArtikel.value = "";
        this.refs.isiArtikel.value = "";
        this.refs.uid.value = "";
        this.refs.image.value = "";
        this.refs.linkyt.value = "";
        this.refs.linkdownload.value = "";
    }

    handleTombolEdit = () => {
        let title = this.refs.judulArtikelEdit.value;
        let body = this.refs.isiArtikelEdit.value;
        let uid = this.refs.uidEdit.value;
        let url = this.refs.imageSource.src;
        let newImage = this.refs.imageEdit.value;
        let kategory = this.refs.kategoryEdit.value;
        let uidData;

        const {listArtikel} = this.state;
            listArtikel.find(data => {
                if (data.uid == uid){
                    return (uidData = data.uid)
                }
            })

        if (uid != uidData) {
            window.alert("Anda belum memilih data yang di edit!");
        } else if (title && body && newImage){
            const storage = firebase.storage();
            const {image} = this.state;

            var desertRef = firebase.storage().refFromURL(url);

            desertRef.delete().then(function() {
                console.log("Success delete")
            }).catch(function(error) {
                console.log("Uh-oh, an error occurred!");
            })

                const uploadTask = storage.ref(`images/${image.name}`).put(image);
                uploadTask.on('state_changed', 
                (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                // this.setState({progress});
                }, 
                (error) => {
                    // error function ....
                console.log(error);
                }, 
            () => {
                // complete function ....
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    const {listArtikel} = this.state;
                    listArtikel.find(data => {
                        if (data.uid == uid){
                            return (data.title = title,
                                data.body = body,
                                data.uid = uid,
                                data.category = kategory,
                                data.url = url)
                        }
                    })
                    this.setState({listArtikel});
                })
            });
        } else {
            const {listArtikel} = this.state;
            listArtikel.find(data => {
                if (data.uid == uid){
                    return (data.title = title,
                        data.body = body,
                        data.uid = uid,
                        data.category = kategory,
                        data.url = url)
                }
            })
            this.setState({listArtikel});
        }

        this.refs.judulArtikelEdit.value = "";
        this.refs.isiArtikelEdit.value = "";
        this.refs.uidEdit.value = "";
        this.refs.imageEdit.value = "";
        this.refs.imageSource.src = "";
    }

    handleChange = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({image}));
        }
      }

    render(){
        const {
            isLoggingOut, logoutError, isAuthenticated
        } = this.props;

        return(
            <div>
                <ul className="navbar">
                        <li className="navbar2">
                            <a><Link to="/" >Home Page</Link></a>
                        </li>
                        { isAuthenticated && 
                            <li className="navbar2">
                                <a><Link to="/admin">Admin Page</Link></a>
                            </li>
                        }
                        
                        <li className="navbar3">
                                {isAuthenticated ? (
                                <p>
                                    Welcome!{"user"}
                                    <button
                                    onClick={this.handleLogout}>Logout</button>
                                    { isLoggingOut && <p>Logging Out....</p> }
                                    { logoutError && <p>Error logging out</p> }
                                </p>
                                ) : (
                                <p>You are not logged in. 
                                    <Link to="/login"> Click here</Link>
                                </p>
                                )}
                        </li>
                    </ul>
                <div className="post-artikel">
                    <div className="form pb-2 border-bottom">
                        <div className="form-group row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Judul</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="title" name="title" ref="judulArtikel"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="body" className="col-sm-2 col-form-label">Isi Artikel</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" id="body" name="body" rows="3" ref="isiArtikel"></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="linkyt" className="col-sm-2 col-form-label">Link Youtube</label>
                            <div className="col-sm-10">
                                <input type="url" className="form-control" id="linkyt" name="linkyt" ref="linkyt"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="linkdownload" className="col-sm-2 col-form-label">Link Download</label>
                            <div className="col-sm-10">
                                <input type="url" className="form-control" id="linkdownload" name="linkdownload" ref="linkdownload"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="body" className="col-sm-2 col-form-label">Gambar Artikel</label>
                            <div className="col-sm-10">
                                <input type="file" id="image" name="image" ref="image" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="kategory" className="col-sm-2 col-form-label">Kategori Artikel</label>
                            <select id="kategory" name="kategory" ref="kategory">
                                <option value="Music Video">Music Video</option>
                                <option value="Concert">Concert</option>
                                <option value="Live">Live</option>
                            </select>
                        </div>
                        <input type="hidden" name="uid" ref="uid"/>
                        <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>Simpan</button>
                    </div>

                    <div className="form pb-2 border-bottom">
                        <div className="form-group row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Judul</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="titleEdit" name="titleEdit" ref="judulArtikelEdit"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="body" className="col-sm-2 col-form-label">Isi Artikel</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" id="bodyEdit" name="bodyEdit" rows="3" ref="isiArtikelEdit"></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="body" className="col-sm-2 col-form-label">Gambar Artikel</label>
                            <div className="col-sm-10">
                                <img src="" id="imageSource" name="imageSource" ref="imageSource" alt="" width="700px"/>
                                <input type="file" id="imageEdit" name="imageEdit" ref="imageEdit" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="kategory" className="col-sm-2 col-form-label">Kategory Artikel</label>
                            <select id="kategoryEdit" name="kategoryEdit" ref="kategoryEdit">
                                <option value="Music Video">Music Video</option>
                                <option value="Concert">Concert</option>
                                <option value="Live">Live</option>
                            </select>
                        </div>
                        <input type="hidden" name="uidEdit" ref="uidEdit"/>
                        <button type="submit" className="btn btn-primary" onClick={this.handleTombolEdit}>Edit</button>
                    </div>

                    <h2>List Artikel</h2>
                    {
                        this.state.listArtikel.map(artikel => {
                            return <AdminPost key={artikel.uid} judul={artikel.title} isi={artikel.body} image={artikel.url} kategory={artikel.category} linkyt={artikel.linkyt} linkdownload={artikel.linkdownload} idArtikel={artikel.uid} hapusArtikel={this.handleHapusArtikel} editArtikel={this.handleEditArtikel}/>
                        })
                    }
                </div>    
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(Admin);