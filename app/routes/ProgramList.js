import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'

class Program extends Component {
  render() {
    const data = this.props.data
    return (
      <ListItem
        title={data.name}
        subtitle={data.source}
        />
    )
  }
}

export default class ProgramList extends Component {
  static navigationOptions = {
    title: 'Weight Programs'
  };
  render() {
    const { params } = this.props.navigation.state;
    return <List>
      {params.programs.map((program, i) => (
          <Program data={program} key={i}/>
      ))}
    </List>
  }
}
