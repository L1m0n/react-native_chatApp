import React, {Component} from 'react';
import Home from './components/Home';
import Chat from './components/Chat';
import {Router, Scene} from 'react-native-router-flux';

class App extends Component {
    render(){
        return(
            <Router>
                <Scene key="root" style={{paddingTop: 60}}>
                    <Scene key="home" component={Home} title="Home" />
                    <Scene key="chat" component={Chat} title="Chat" />
                </Scene>
            </Router>
        );
    }
}

export default App;