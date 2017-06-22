import React, { Component } from 'react';
import { Text } from 'react-native';
import { List, ListItem } from 'react-native-elements'
// TODO: * calculate a schedule with rest days included
// * then display them in seven-day increments (swipe to go between the weeks)
// * then make each day expandable to see the workout for that day
class SingleDay extends Component {
  render() {
    const workout = this.props.workout
    return (
      <ListItem
        title={workout.name}
        hideChevron={true}
        />
    )
  }
}

export default class ProgramDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.program.name} Detail`
  })
  render() {
    const { program } = this.props.navigation.state.params;
    return (
      <List>
       {program.workouts.map((workout, i) => (
         <SingleDay workout={workout} key={i}/>
       ))}
      </List>
    )
  }
}
