import React, {Component} from 'react';
import './mainPage.css';
import HomePost from "../component/HomePost";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth";

class mainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            listArtikel: [],
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
            var desertRef = firebase.storage().refFromURL(data.url);

            desertRef.delete().then(function() {
                console.log("Success delete")
            }).catch(function(error) {
                console.log("Uh-oh, an error occurred!");
            });
            return data.uid !== idArtikel;
        })
        this.setState({listArtikel: newState});
    }

    handleEditArtikel = (idArtikel) => {
        const {listArtikel} = this.state;
        
        listArtikel.find(data => {
            return (this.refs.judulArtikelEdit.value = data.title,
            this.refs.isiArtikelEdit.value = data.body,
            this.refs.uidEdit.value = data.uid,
            this.refs.imageSource.src = data.url)
        })
    }

    handleTombolSimpan = () => {
        let title = this.refs.judulArtikel.value;
        let body = this.refs.isiArtikel.value;
        let uid = this.refs.uid.value;
        let image = this.refs.image.value;

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
                    listArtikel.push({uid, title, body, url});
                    this.setState({listArtikel});
                })
            });
        }

        this.refs.judulArtikel.value = "";
        this.refs.isiArtikel.value = "";
        this.refs.uid.value = "";
        this.refs.image.value = "";
    }

    handleTombolEdit = () => {
        let title = this.refs.judulArtikelEdit.value;
        let body = this.refs.isiArtikelEdit.value;
        let uid = this.refs.uidEdit.value;
        let url = this.refs.imageSource.src;
        let newImage = this.refs.imageEdit.value;

        if (title && body && newImage){
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
                        return (data.title = title,
                        data.body = body,
                        data.uid = uid,
                        data.url = url)
                    })
                    this.setState({listArtikel});
                })
            });
        } else {
            const {listArtikel} = this.state;
            listArtikel.find(data => {
                return (data.title = title,
                data.body = body,
                data.uid = uid,
                data.url = url)
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

    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };

    render(){
        const { isAuthenticated, isLoggingOut, logoutError } = this.props;

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
                            <a>You are not logged in. 
                                <Link to="/login"> Click here</Link>
                            </a>
                            )}
                    </li>
                </ul>
                <div className="post-artikel">
                    <h2>List Artikel</h2>
                    {this.state.filterValue == ""}
                    <select id="kategory" name="kategory" ref="kategory">
                        <option value="">None</option>
                        <option value="Music Video">Music Video</option>
                        <option value="Concert">Concert</option>
                        <option value="Live">Live</option>
                    </select>
                    <button onClick={this.handleChange}>OK</button>
                    {
                        (this.state.filterValue == "") ? (
                            this.state.listArtikel.map(artikel => {
                                return <HomePost key={artikel.uid} judul={artikel.title} isi={artikel.body} image={artikel.url} kategory={artikel.category} linkyt={artikel.linkyt} linkdownload={artikel.linkdownload} idArtikel={artikel.uid}/>
                            })
                         ) : (
                        this.state.listArtikel.filter(data => data.category === this.state.filterValue).map(artikelFiltered => {
                            return <HomePost key={artikelFiltered.uid} judul={artikelFiltered.title} isi={artikelFiltered.body} image={artikelFiltered.url} kategory={artikelFiltered.category} linkyt={artikelFiltered.linkyt} linkdownload={artikelFiltered.linkdownload} idArtikel={artikelFiltered.uid}/>
                        }))
                    }
                </div>
            </div>
        )
    }
    handleChange = () => {
        this.setState({ filterValue: this.refs.kategory.value });
    };
}

function AuthButton(){
    
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError
    };
}

export default connect(mapStateToProps)(mainPage);