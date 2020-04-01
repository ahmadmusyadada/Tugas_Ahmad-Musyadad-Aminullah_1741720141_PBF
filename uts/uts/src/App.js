import React from 'react';
import { reduxForm, Field } from 'redux-form';
import './App.css';
import image1 from './images/img01.jpeg'
import image2 from './images/img02.jpg'
import image3 from './images/img03.jfif'
import image4 from './images/img04.jpg'
import image5 from './images/img05.jpg'
import image6 from './images/img06.jfif'
import image7 from './images/img07.jpg'
import image8 from './images/img08.jpg'
import image9 from './images/img09.jpg'
import image10 from './images/img10.jpg'
import image11 from './images/img11.jpg'
import image12 from './images/img12.jpg'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

export default function AuthExample() {
  return (
    <Router>
      <div>
        <ul className="navbar">
          <li className="navbar2">
            <a><Link to="/home">Home Page</Link></a>
          </li>
          <li className="navbar2">
            <a><Link to="/category">Category Page</Link></a>
          </li>
          <li className="navbar3">
            <a><Link to="/login"><AuthButton/></Link></a>
          </li>
        </ul>       

        <Redirect exact from="/" to="/home" />
        
        <Switch>
          <Route path="/home">
            <PublicPage/>
          </Route>
          <Route path="/login">
            <LoginPage/>
          </Route>
          <Route path="/category">
            <Category/>
          </Route>
          <PrivateRoute path="/form">
            <ProtectedPage/>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb){
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb){
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton(){
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{"user"}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/home"));
        }}>
          Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in. Click Here</p>
  )
}

function PrivateRoute({children, ...rest}){
  return (
    <Route
      {...rest}
      render = {({location}) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to = {{
              pathname: "/login",
              state: {from: location}
            }}
          />
        )}
    />
  )
}

function PublicPage(){
  return <div id="wrapper">
  <div id="logo" class="container">
    <h1><a href="#">Vestibule</a></h1>
  </div>
  <div id="page" class="container">
    <div>
      <div class="entry">
        <p>Ini adalah <strong>Vestibule </strong>, web untuk membeli Film</p>
      </div>
    </div>
  </div>
  <div id="three-column" class="container">
  <div class="tbox1">
    <div class="box-style box-style01">
      <div class="content">
        <div class="image"><img src={image1} width="324" alt="" /></div>
        <h2>Black Widow</h2>
        <p>At birth the Black Widow (aka Natasha Romanova) is given to the KGB, which grooms her to become its ultimate operative. When the U.S.S.R. breaks up, the government tries to kill her as the action moves to present-day New York, where she is a freelance operative.</p>
        <Link to="/form" class="button">Buy</Link>
      </div>
    </div>
  </div>
  <div class="tbox2">
    <div class="box-style box-style02">
      <div class="content">
        <div class="image"><img src={image2} width="324"  alt="" /></div>
        <h2>21 Bridges</h2>
        <p>After uncovering a massive conspiracy, an embattled NYPD detective joins a citywide manhunt for two young cop killers. As the night unfolds, he soon becomes unsure of who to pursue -- and who's in pursuit of him. When the search intensifies, authorities decide to take extreme measures by closing all of Manhattan's 21 bridges to prevent the suspects from escaping.</p>
        <Link to="/form" class="button">Buy</Link>
      </div>
    </div>
  </div>
  <div class="tbox3">
    <div class="box-style box-style03">
      <div class="content">
        <div class="image"><img src={image3} width="324"  alt="" /></div>
        <h2>Spies in Disguise</h2>
        <p>Super spy Lance Sterling and scientist Walter Beckett are almost exact opposites. Lance is smooth, suave and debonair. Walter is not. But what Walter lacks in social skills he makes up for in smarts and invention, creating the awesome gadgets Lance uses on his epic missions. But when events take an unexpected turn, Walter and Lance suddenly have to rely on each other in a whole new way. And if this odd couple can't learn to work as a team, the whole world is in peril.</p>
        <Link to="/form" class="button">Buy</Link>
      </div>
    </div>
  </div>
</div>
</div>;
}

function ProtectedPage(){
  return (
    <div className="App">
      <div className="container">
        <p className="App-intro">Form</p>
        <BuyForm/>
      </div>
    </div>
  );
}

function LoginPage(){
  let history = useHistory();
  let location = useLocation();

  let {from} = location.state || {from: {pathname: "/home"}};
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      {/* <p>You must log in to view the page</p> */}
      <div className="div" align="center">
        <form>
          <div>
            <label><b>Username </b></label>
            <input type="text" placeholder="Enter Username" name="username"/>
            <label><b>Password </b></label>
            <input type="password" placeholder="Enter Password" name="password"/>
          </div>
        </form>
        <button onClick={login}>Log in</button>
      </div>
    </div>
  )
}

function Category(){
  let { path, url } = useRouteMatch();
  return(
    <div>
      <h2>Category</h2>
      <ul>
        <li>
          <Link to={`${url}/Scifi`}>Scifi</Link>
        </li>
        <li>
          <Link to={`${url}/Adventure`}>Adventure</Link>
        </li>
        <li>
          <Link to={`${url}/Action`}>Action</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select.</h3>
        </Route>
        <Route path={`${url}/Scifi`} component={Scifi}/>
        <Route path={`${url}/Adventure`} component={Adventure}/>
        <Route path={`${url}/Action`} component={Action}/>
      </Switch>
    </div>
  );
}

function Scifi(){
  return <div id="three-column" class="container">
  <div class="tbox1">
    <div class="box-style box-style01">
      <div class="content">
        <div class="image"><img src={image4} width="324"  alt="" /></div>
        <h2>Avengers: Infinity War</h2>
        <p>The Avengers must stop Thanos, an intergalactic warlord, from getting his hands on all the infinity stones. However, Thanos is prepared to go to any lengths to carry out his insane plan.</p>
        <Link to="/form" class="button">Buy</Link>
      </div>
    </div>
  </div>
  <div class="tbox2">
    <div class="box-style box-style02">
      <div class="content">
        <div class="image"><img src={image5} width="324"  alt="" /></div>
        <h2>Captain Marvel</h2>
        <p>Amidst a mission, Vers, a Kree warrior, gets separated from her team and is stranded on Earth. However, her life takes an unusual turn after she teams up with Fury, a S.H.I.E.L.D. agent.</p>
        <Link to="/form" class="button">Buy</Link>
      </div>
    </div>
  </div>
  <div class="tbox3">
    <div class="box-style box-style03">
      <div class="content">
        <div class="image"><img src={image6} width="324"  alt="" /></div>
        <h2>Avengers: Endgame</h2>
        <p>After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.</p>
        <Link to="/form" class="button">Buy</Link>
      </div>
    </div>
  </div>
</div>;
}

function Adventure(){
  return <div id="three-column" class="container">
  <div class="tbox1">
    <div class="box-style box-style01">
      <div class="content">
        <div class="image"><img src={image7} width="324"  alt="" /></div>
        <h2>Black Panther</h2>
        <p>After his father's death, T'Challa returns home to Wakanda to inherit his throne. However, a powerful enemy related to his family threatens to attack his nation.</p>
        <Link to="/form" class="button">Buy</Link>
      </div>
    </div>
  </div>
  <div class="tbox2">
    <div class="box-style box-style02">
      <div class="content">
        <div class="image"><img src={image8} width="324"  alt="" /></div>
        <h2>Spider-Man: Far From Home</h2>
        <p>As Spider-Man, a beloved superhero, Peter Parker faces four destructive elemental monsters while on holiday in Europe. Soon, he receives help from Mysterio, a fellow hero with mysterious origins.</p>
        <Link to="/form" class="button">Buy</Link>
      </div>
    </div>
  </div>
  <div class="tbox3">
    <div class="box-style box-style03">
      <div class="content">
        <div class="image"><img src={image9} width="324"  alt="" /></div>
        <h2>Wonder Woman</h2>
        <p>Princess Diana of an all-female Amazonian race rescues US pilot Steve. Upon learning of a war, she ventures into the world of men to stop Ares, the god of war, from destroying mankind.</p>
        <Link to="/form" class="button">Buy</Link>
      </div>
    </div>
  </div>
</div>;
}

function Action(){
  return <div id="three-column" class="container">
  <div class="tbox1">
    <div class="box-style box-style01">
      <div class="content">
        <div class="image"><img src={image10} width="324"  alt="" /></div>
        <h2>John Wick: Chapter 3 – Parabellum</h2>
        <p>After gunning down a member of the High Table -- the shadowy international assassin's guild -- legendary hit man John Wick finds himself stripped of the organization's protective services. Now stuck with a $14 million bounty on his head, Wick must fight his way through the streets of New York as he becomes the target of the world's most ruthless killers.</p>
        <Link to="/form" class="button">Buy</Link>
      </div>
    </div>
  </div>
  <div class="tbox2">
    <div class="box-style box-style02">
      <div class="content">
        <div class="image"><img src={image11} width="324"  alt="" /></div>
        <h2>Terminator: Dark Fate</h2>
        <p>DescriptionIn Mexico City, a newly modified liquid Terminator -- the Rev-9 model -- arrives from the future to kill a young factory worker named Dani Ramos. Also sent back in time is Grace, a hybrid cyborg human who must protect Ramos from the seemingly indestructible robotic assassin. But the two women soon find some much-needed help from a pair of unexpected allies -- seasoned warrior Sarah Connor and the T-800 Terminator.</p>
        <Link to="/form" class="button">Buy</Link>
      </div>
    </div>
  </div>
  <div class="tbox3">
    <div class="box-style box-style03">
      <div class="content">
        <div class="image"><img src={image12} width="324"  alt="" /></div>
        <h2>Fast &amp; Furious Presents: Hobbs &amp; Shaw</h2>
        <p>Brixton Lorr is a cybernetically enhanced soldier who possesses superhuman strength, a brilliant mind and a lethal pathogen that could wipe out half of the world's population. It's now up to hulking lawman Luke Hobbs and lawless operative Deckard Shaw to put aside their past differences and work together to prevent the seemingly indestructible Lorr from destroying humanity.</p>
        <Link to="/form" class="button">Buy</Link>
      </div>
    </div>
  </div>
</div>;
}

function BuyForm(){
  return <form className="form" action="/home">
    <div className="field">
      <div className="control">
      <Field name="firstName" component={renderField} type="text" label="First Name"/>
      </div>
    </div>

    <div className="field">
      <div className="control">
      <Field name="lastName" component={renderField} type="text" label="Last Name"/>
      </div>
    </div>

    <div className="field">
      <div className="control">
      <Field name="email" component={renderField} type="email" label="Email Address"/>
      </div>
    </div>

    <div className="field">
      <div className="control">
      <Field name="age" component={renderField} type="number" label="Age"/>
      </div>
    </div>

    <div className="field">
      <div className="control">
        <label className="label">Gender</label>
        <label className="radio">
          <Field name="gender" component="input" type="radio" value="male" />
          {' '}
          Male
        </label>
        <label className="radio">
          <Field name="gender" component="input" type="radio" value="female" />
          {' '}
          Female
        </label>
      </div>
    </div>

    <div className="field">
      <div className="control">
        <label className="label">Message</label>
        <Field className="textarea" name="message" component="textarea" />
      </div>
    </div>

    <div className="field">
      <div className="control">
        <button className="button is-link">Submit</button>
      </div>
    </div>
    </form>;
};

const validate = val => {
  const errors = {};
  if (!val.firstName) {
    console.log('First Name is required');
    errors.firstName = 'Required';
  }
  
  if (!val.lastName) {
    console.log('Last Name is required');
    errors.lastName = 'Required';
  }
  
  if (!val.email) {
    console.log('email is required');
    errors.email = 'Required';
  } else if (!/^.+@.+$/i.test(val.email)) {
    console.log('email is invalid');
    errors.email = 'Invalid email address';
  }
  
  if (!val.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(val.age))) {
    errors.age = 'Must be a number'
  } else if (Number(val.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors;
};
  
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className="control">
      <label className="field">{label}</label>
      <input className="input" {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

BuyForm = reduxForm({
  form: 'signIn',
  validate,
})(BuyForm);