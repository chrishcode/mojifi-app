import * as CounterState from './CounterState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ListView,
  processColor
} from 'react-native';
import FriendList from '../../components/FriendList';
import Login from '../../components/FriendList';
var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

const CounterView = React.createClass({
  propTypes: {
    counter: PropTypes.number.isRequired,
    userName: PropTypes.string,
    userProfilePhoto: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      showPickerBackground: true,
    };
  },

  togglePickerBackground() {
    this.setState({
        showPickerBackground: !this.state.showPickerBackground
    });
  },
  increment() {
    this.props.dispatch(CounterState.increment());
  },
  reset() {
    this.props.dispatch(CounterState.reset());
  },
  random() {
    this.props.dispatch(CounterState.random());
  },
  goBack() {
    this.props.dispatch(NavigationState.popRoute());
  },
  bored(friend) {
    // console.log(friend);
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Color',
      title: '',
      color: this.props.color,
      authenticatedUserId: this.state.authenticatedUser.id,
      name: friend.friend.name,
      userId: friend.friend.userId,
      emoji: friend.friend.emoji
    }));
  },
  authenticateUser() {
    var user = this.state.user;
    // console.log(user);
    // https://graph.facebook.com/v2.8/10211483639342780?fields=name,friends&access_token=EAAY7qidii84BAJBZCplRj0JWMKQvBIPsbLSKCfwY3VcEZABru7JDEnCdk8tRrp5wVZB4NZCVZAP86RJRQUQZCLM1dlJxqMgF2II04Tdp2vSc7Y8k3IJVyMqe0Lfr1NtDz5y2KZCDA8i0oocuVQM9nvZCFUYRmmxQqpknPjZAd6IvvhxWfZBCrymHAYFL9xBCFhpkIZD
    fetch('https://graph.facebook.com/v2.8/' + user.userId + '?fields=name,friends&access_token=' + user.token)
      .then((response) => response.json())
      .then((responseJson) => {
        user = responseJson;
        console.log(user);

        var friends = [
          {
            "name": "Peter Asplund",
            "id": "616272871"
          },
          {
            "name": "Sebastian Marcusson",
            "id": "10152327800288346"
          }
        ];
        // var friends = user.friends.data;
        var userFriendsIds = [];
        // foreach(user.friends.data as friend);
        for (i = 0; i < friends.length; i++) {
          userFriendsIds.push(friends[i].id);
        }
        console.log(userFriendsIds);
        // return responseJson;

        fetch('http://127.0.0.1:8000/api/users', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name,
            fbId: user.id,
            fbFriends: userFriendsIds
          })
        })
        .then((response) => response.json())
        .then((responseJson) => { 
          this.setState({
            authenticatedUser: responseJson
          });
          console.log(this.state.authenticatedUser);

          fetch('http://127.0.0.1:8000/api/users/' + this.state.authenticatedUser.id + '/mojifications')
          .then((response) => response.json())
          .then((responseJson) => {
            // console.log(responseJson);
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
            this.setState({
              userMojifications: ds.cloneWithRows(responseJson),
            });
            console.log(this.state.userMojifications);
            // return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
        })
        .catch((error) => { 
          console.error(error); 
        });
      })
      .catch((error) => {
        console.error(error);
    })

  },

  renderUserInfo() {
    if (!this.props.userName) {
      return null;
    }

    return (
      <View style={styles.userContainer}>
        <Image
          style={styles.userProfilePhoto}
          source={{
            uri: this.props.userProfilePhoto,
            width: 80,
            height: 80
          }}
        />
        <Text style={styles.linkButton}>
          Welcome, {this.props.userName}!
        </Text>
      </View>
    );
  },
    _renderPickerBackground() {
        if (this.state.showPickerBackground) {
          var _this = this;
            return (
                <View style={{zIndex: 1, height: 680, width: 375, position: 'absolute',backgroundColor: this.props.color, flex: 1, justifyContent: 'center',alignItems: 'center',marginTop: 0,}} >
                  <Text style={{fontSize: 14, fontWeight: '400', fontFamily: 'Montserrat Alternates', color: '#ffffff'}}>An emoji is worth a thousand words.</Text>
        <Text style={{fontSize: 14,fontWeight: '400', fontFamily: 'Montserrat Alternates', color: '#ffffff', marginTop: 5, marginBottom: 20,}}>Share them with your friends.</Text>
                  <FBLogin style={{ marginBottom: 10, }}
                    ref={(fbLogin) => { this.fbLogin = fbLogin }}
                    permissions={["email","user_friends"]}
                    loginBehavior={FBLoginManager.LoginBehaviors.Native}
                    onLogin={function(data){
                      console.log("Logged in!");
                      console.log(data);
                      _this.setState({ 
                        user : data.credentials,
                        showPickerBackground: false
                      });
                      // console.log(_this.state.user);
                      _this.authenticateUser();
                    }}
                    onLogout={function(){
                      console.log("Logged out.");
                      _this.setState({ user : null });
                    }}
                    onLoginFound={function(data){
                      console.log("Existing login found.");
                      console.log(data);
                      _this.setState({ user : data.credentials });
                    }}
                    onLoginNotFound={function(){
                      console.log("No user logged in.");
                      _this.setState({ user : null });
                    }}
                    onError={function(data){
                      console.log("ERROR");
                      console.log(data);
                    }}
                    onCancel={function(){
                      console.log("User cancelled.");
                    }}
                    onPermissionsMissing={function(data){
                      console.log("Check permissions!");
                      console.log(data);
                    }}
                  />
                </View>
            );
        } else {
            return null;
        }
    },
  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
      : null;


    if (this.state.userMojifications) {
      return (
        <View style={{flex: 1, marginTop: -65, backgroundColor: this.props.color}}>
          <FriendList userMojifications={this.state.userMojifications} color={this.props.color} boredyo={(friend) => this.bored(friend)} />
        </View>
      )
    }

    return (
      <View style={{flex: 1, marginTop: -65, backgroundColor: this.props.color}}>
        {this._renderPickerBackground()}
      </View>
    );
  }
});

const circle = {
  borderWidth: 0,
  borderRadius: 40,
  width: 80,
  height: 80
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -65,
  },
  text: {
    color: '#ffffff'
  },
  sendBtn: {
    width: 200,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  userProfilePhoto: {
    ...circle,
    alignSelf: 'center'
  },
  counterButton: {
    ...circle,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  counter: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    padding: 5
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  }
});

export default CounterView;
