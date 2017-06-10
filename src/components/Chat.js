import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import Backend from '../Backend';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        Backend.loadMessages((message) => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, message)
                }
            })
        })
    }

    componentWillUnmount() {
        Backend.closeChat();
    }

    render(){
        return(
            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => {
                    Backend.sendMessage(message);
                }}
                user={{
                    _id: Backend.getUid(),
                    name: this.props.name
                }}
            />
        );
    }
}
Chat.defaultProps = {
    name: 'Ivan'
};

Chat.propTypes = {
    name: React.PropTypes.string
};
export default Chat;