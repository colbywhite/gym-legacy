import React, { Component } from 'react';
import { ListItem } from 'react-native-elements'

export default class RestDay extends Component {
  render() {
    return (
      <ListItem
        title='Rest Day'
        leftIcon={{name:'battery-charging-full'}}
        hideChevron={true}
        />
    )
  }
}
