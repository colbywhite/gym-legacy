import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'

class Program extends Component {
  render() {
    const data = this.props.data
    const navigate = this.props.navigate
    return (
      <ListItem
        title={data.name}
        subtitle={`${data.schedule.type} program`}
        onPress={() => navigate('ProgramDetail', { program: data })}
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
    const { navigate } = this.props.navigation;
    return <List>
      {params.programs.map((program, i) => (
          <Program data={program} key={i} navigate={navigate}/>
      ))}
    </List>
  }
}
