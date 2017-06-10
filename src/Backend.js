import firebase from 'firebase';

class Backend {
    uid = '';
    messagesRef = null;

    // initialize Firebase Backend
    constructor() {
        const config = {
            apiKey: "AIzaSyBfpWk1iKYNUfC3CgGfDhadDPpFvTdE6SU",
            authDomain: "todo-app-174b0.firebaseapp.com",
            databaseURL: "https://todo-app-174b0.firebaseio.com",
            projectId: "todo-app-174b0",
            storageBucket: "todo-app-174b0.appspot.com",
            messagingSenderId: "710647446608"
        };
        firebase.initializeApp(config);
        /*firebase.initializeApp({
            apiKey: 'AIzaSyBfpWk1iKYNUfC3CgGfDhadDPpFvTdE6SU',
            authDomain: 'todo-app-174b0.firebaseapp.com',
            databaseUrl: 'https://todo-app-174b0.firebaseio.com',
            storageBucket: 'todo-app-174b0.appspot.com'
        });*/
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setUid(user.uid);
            } else {
                firebase.auth().signInAnonymously().catch((error) => {
                    alert(error.message);
                })
            }
        })
    }
    setUid(value) {
        this.uid = value;
    }
    getUid() {
        return this.uid;
    }
    loadMessages(callback) {
        this.messagesRef = firebase.database().ref('messages');
        this.messagesRef.off();
        const onRecive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: message.user.name
                }
            });
        };
        this.messagesRef.limitToLast(20).on('child_added', onRecive);
    }
    sendMessage(message) {
        for (let i = 0; i < message.length; i++) {
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            })
        }
    }
    closeChat() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }
}

export default new Backend();