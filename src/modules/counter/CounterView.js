import * as CounterState from './CounterState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  processColor
} from 'react-native';
import FriendList from '../../components/FriendList';

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
    console.log(friend);
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Color',
      title: '',
      color: this.props.color,
      name: friend.friend.title,
      emoji: friend.friend.emoji
    }));
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
            return (
                <View style={{zIndex: 1, height: 680, width: 375, position: 'absolute',backgroundColor: this.props.color, flex: 1, justifyContent: 'center',alignItems: 'center',marginTop: 0,}} >
                  <TouchableOpacity
                    style={styles.sendBtn}
                    activeOpacity={0.8}
                    onPress={() => {this.togglePickerBackground()}}>
                    <Text style={{fontSize: 14, fontWeight: '900', fontFamily: 'Montserrat Alternates', color: this.props.color}}>Sign in with Facebook</Text>
                  </TouchableOpacity>
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

    return (
      <View style={{flex: 1, marginTop: -65, backgroundColor: this.props.color}}>
        {this._renderPickerBackground()}
        <FriendList color={this.props.color} boredyo={(friend) => this.bored(friend)} />
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
