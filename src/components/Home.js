import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';


class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: ''
        }
    }

    render(){
        return(
            <View>
                <Text style={style.title}>
                    Enter your name:
                </Text>
                <TextInput
                    style={style.textInput}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => {
                        this.setState({
                            name: text
                        })
                    }}
                    value={this.state.name}
                />
                <TouchableOpacity
                    onPress={()=> {
                        Actions.chat({
                            name: this.state.name
                        })
                    }}
                >
                    <Text style={style.button}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    title: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20
    },
    textInput: {
        height: 40,
        padding: 5,
        borderWidth: 2,
        borderColor: 'black',
        margin: 20
    },
    button: {
        marginLeft:20,
        fontSize: 20
    }
});

export default Home;