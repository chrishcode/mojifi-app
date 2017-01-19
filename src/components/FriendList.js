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

const timeline = [
  {title: 'Henrik Lindblom', emoji: 'coffee'},
  {title: 'Alexander Brandemyr', emoji: 'heart'},
  {title: 'Kenny Lindblom', emoji: 'cow'}
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
              <Text style={styles.timestamp}>{friend.emoji}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <ListView
        style={{marginTop: 60}}
        dataSource={this.state.timelineDataSource} 
        renderRow={(friend) => { return this._renderFriendsRow(friend) }}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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
    height: 100,
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
    color: "#000000",
    fontFamily: "Helvetica Neue",
    fontSize: 13,
  },

  timestamp: {
    color: "#ffffff",
    fontFamily: "Helvetica Neue",
    fontSize: 13,
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
    backgroundColor: '#f5f4f4',
  },
});

module.exports = FriendList