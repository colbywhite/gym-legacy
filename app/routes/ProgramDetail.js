import React, { Component } from 'react';
import { Text } from 'react-native';

export default class ProgramDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.program.name} Detail`
  })
  render() {
    const { program } = this.props.navigation.state.params;
    return (
      <Text>
       {program.name} - {program.schedule.type}
      </Text>
    )
  }
}
