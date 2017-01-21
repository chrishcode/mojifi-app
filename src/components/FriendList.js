import * as NavigationState from '../modules/navigation/NavigationState';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';
import _ from 'lodash';
import Emoji from 'react-native-emoji';
const emojiName = require("emoji-name-map");

const timeline = [
  {title: 'Henrik Lindblom', emoji: 'coffee'},
  {title: 'Alexander Brandemyr', emoji: 'heart'},
  {title: 'Kenny Lindblom', emoji: 'fist'},
  {title: 'Kenny Lindblom', emoji: 'monkey'},
  {title: 'Kenny Lindblom', emoji: 'frog'},
  {title: 'Kenny Lindblom', emoji: 'smile'},
  {title: 'Kenny Lindblom', emoji: 'truck'},
  {title: 'Kenny Lindblom', emoji: 'computer'},
  {title: 'Kenny Lindblom', emoji: 'pig'},
  {title: 'Kenny Lindblom', emoji: 'apple'},
  {title: 'Kenny Lindblom', emoji: ''}
]

class FriendList extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      timelineDataSource: ds.cloneWithRows(timeline)
    }
  }
  bored(friend) {
    // this.props.dispatch(NavigationState.pushRoute({
    //   key: 'Color',
    //   title: 'hej'
    // }));
    this.props.boredyo({
      friend
    });
  }
    _renderFriendsRow(friend) {
    return (
      <TouchableOpacity style={styles.episodeRow} onPress={(event) => this.bored(friend)}>
        <View style={styles.episodeWrap}>
          <View style={styles.episodeInfo}>
            <View style={styles.topInfo}>
              <Text style={styles.title}>{friend.title}</Text>
              <Text style={styles.emoji}>{emojiName.get(friend.emoji)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    // renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
    return (
      <ListView
        style={{marginTop: 60}}
        dataSource={this.state.timelineDataSource} 
        renderRow={(friend) => { return this._renderFriendsRow(friend) }}
        renderFooter={() => 
        <View style={{alignItems: 'center', marginBottom: 20, marginTop: 20}}>
          <TouchableOpacity
            style={styles.sendBtn}
            activeOpacity={0.8}
            onPress={() => {console.log('yipppyyy')}}
            >
            <Text style={{fontSize: 14, fontFamily: 'Futura', color: this.props.color}}>Invite Friends</Text>
          </TouchableOpacity>
        </View>}
      />
    );
  }
}

const styles = StyleSheet.create({
  episodeRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 70,
    // backgroundColor: 'gray'
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
  episodeWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },

  episodeInfo: {
    flex: 1,
    flexDirection: "column",
    marginRight: 10,
  },

  topInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  title: {
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Futura",
    fontSize: 15,
    marginLeft: 10,
  },

  emoji: {
    color: "#ffffff",
    fontFamily: "Futura",
    fontSize: 28,
  },

  description: {
    color: "#8c8c8c",
    fontFamily: "Helvetica Neue",
    fontSize: 13,
    lineHeight: 18,
  },

  lastName: {
    marginLeft: 0,
  },

  episodeImage: {
    width: 50,
    height: 50,
    backgroundColor: 'powderblue',
    marginLeft: 10,
    marginRight: 15,
    borderRadius: 25,
  },

  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ffffff',
  },
});

module.exports = FriendList