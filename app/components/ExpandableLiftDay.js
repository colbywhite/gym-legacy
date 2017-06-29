import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements'

export default class ExpandableLiftDay extends Component {
  render() {
    return (
      <View>
        <ListItem
          title={'Lift'}
          leftIcon={{name:'fitness-center'}}
          rightIcon={{name:'expand-more'}}
          onPress={this.props.onPress}
          />
        {this.props.expanded &&
          <ListItem
            title={'Lift Harder'}
            hideChevron={true}
          />
        }
      </View>
    )
  }
}
