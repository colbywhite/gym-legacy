import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import Program from '../components/Program'

export default class ProgramList extends Component {
  static navigationOptions = {
    title: 'Weight Programs'
  };
  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return <List>
      {params.programs.map((program, i) => (
          <Program data={program} key={i} navigate={navigate}/>
      ))}
    </List>
  }
}
