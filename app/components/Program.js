import React, { Component } from 'react';
import { ListItem } from 'react-native-elements'

export default class Program extends Component {
  render() {
    const {data, navigate} = this.props
    return (
      <ListItem
        title={data.name}
        subtitle={`${data.schedule.type} program`}
        onPress={() => navigate('ProgramDetail', { program: data })}
        />
    )
  }
}
