import React, {PropTypes} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import * as NavigationState from '../../modules/navigation/NavigationState';
const { EmojiOverlay } = require('react-native-emoji-picker');
import Emoji from 'react-native-emoji';
const emojiName = require("emoji-name-map");

const color = () => Math.floor(255 * Math.random());

/**
 * Sample view to demonstrate navigation patterns.
 * @TODO remove this module in a live application.
 */
const ColorView = React.createClass({
  propTypes: {
    index: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      background: `rgba(${color()},${color()},${color()}, 1)`,
      showPicker: false,
      selectedEmoji: emojiName.get("smile"),
      showPickerBackground: false,
    };
  },
  togglePickerBackground() {
    this.setState({
        showPickerBackground: !this.state.showPickerBackground
    });
  },
  _renderPickerBackground() {
        if (this.state.showPickerBackground) {
            return (
                <View style={{zIndex: 1, height: 680, width: 375, position: 'absolute',backgroundColor: this.props.color, flex: 1, justifyContent: 'center',alignItems: 'center',marginTop: -290,}} >
                  <EmojiOverlay 
                    style={{backgroundColor: 'transparent', height: 300, marginLeft: 0, paddingLeft: 10, paddingRight: 10}} 
                    visible={this.state.showPicker}
                    onTapOutsize={() => this.setState({showPicker: false})}
                    horizontal={true}
                    onEmojiSelected={this._emojiSelected}
                    hideClearButton={true}
                    rows={5}/>
                </View>
            );
        } else {
            return null;
        }
    },
  _emojiSelected(emoji) {
    this.togglePickerBackground();
    this.setState({
      selectedEmoji: emoji,
      showPicker: false,
    });
  },
  sendMojification() {
   // this.props.dispatch(NavigationState.popRoute());
   console.log('mojification sent');
   console.log(this.props);
  },
  onNextPress() {
    const index = this.props.index;
    this.props.dispatch(NavigationState.pushRoute({
      key: 'Counter',
    }));
  },

  render() {
    const index = this.props.index;
    const text = `View #${index}`;
    return (
      <View style={{paddingTop: 200, backgroundColor: this.props.color, flex: 1, justifyContent: 'center',alignItems: 'center',marginTop: -65,}} >
        {this._renderPickerBackground()}
        <Text style={styles.name}>{this.props.name}</Text>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => this.setState({showPicker: true, showPickerBackground: true})}>
          <Text style={{fontSize: 40}}>{this.state.selectedEmoji}</Text>
        </TouchableHighlight>

        <View style={{marginTop: 200}}>
          <TouchableOpacity
            style={styles.sendBtn}
            activeOpacity={0.8}
            onPress={() => {this.sendMojification()}}>
            <Text style={{fontSize: 14, fontWeight: '900', fontFamily: 'Montserrat Alternates', color: this.props.color}}>Send Mojification</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#AD0096',
    marginTop: -65,
  },
  text: {
    color: '#ffffff'
  },
  name: {
    fontWeight: '900',
    color: "#ffffff",
    fontFamily: "Montserrat Alternates",
    fontSize: 18,
    marginTop: -247,
    marginBottom: 247,
  },
  sendBtn: {
    width: 200,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }
});

export default ColorView;
