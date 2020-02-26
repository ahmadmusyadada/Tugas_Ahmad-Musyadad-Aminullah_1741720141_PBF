import React from 'react';
import './StateFullComponent.css';

class StateFullComponent extends React.Component{
    render(){
        return (
            <div className="div" align="center">
                <h1>Tugas Pertemuan keempat</h1>
                <form>
                    <div className="container">
                        <label><b>Username </b></label>
                        <input type="text" placeholder="Enter Username" name="username"/>
                        <label><b>Password </b></label>
                        <input type="password" placeholder="Enter Password" name="password"/>

                        <button type="submit">Login</button>
                        <input type="checkbox" defaultChecked/>Remember me
                    </div>
                    <div className="container">
                        <button type="button" className="cancelbtn">Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default StateFullComponent;