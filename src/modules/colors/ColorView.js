import React, {PropTypes} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
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
      selectedEmoji: emojiName.get("smile")
    };
  },
  _emojiSelected(emoji) {
    this.setState({
      selectedEmoji: emoji,
      showPicker: false,
    });
  },
  onNextPress() {
    const index = this.props.index;
    this.props.dispatch(NavigationState.pushRoute({
      key: `Color_${index + 1}`,
      title: `Color Screen #${index + 1}`
    }));
  },

  render() {

    const index = this.props.index;
    const text = `View #${index}`;
    return (
      <View style={{backgroundColor: this.props.color, flex: 1, justifyContent: 'center',alignItems: 'center',marginTop: -65,}} >
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => this.setState({showPicker: true})}>
          <Text style={{fontSize: 40}}>{this.state.selectedEmoji}</Text>
        </TouchableHighlight>

        <EmojiOverlay 
          style={{backgroundColor: 'transparent', height: 500, marginLeft: -10, paddingLeft: 15, paddingRight: 15}} 
          visible={this.state.showPicker}
          onTapOutsize={() => this.setState({showPicker: false})}
          horizontal={true}
          onEmojiSelected={this._emojiSelected}
          hideClearButton={true}/>
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
});

export default ColorView;
