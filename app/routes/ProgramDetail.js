import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import SwipeALot from 'react-native-swipe-a-lot'

// TODO: * calculate a schedule with rest days included
// * then make each day expandable to see the workout for that day
class WeekSchedule extends Component {
  render() {
    const workouts = this.props.workouts
    return (
      <List>
        {workouts.map((workout, i) => {
          return (<ListItem
            title={workout.name}
            key={i}
            hideChevron={true}
            />
          )
        })}
      </List>
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
      <SwipeALot>
        <WeekSchedule workouts={program.workouts} />
        <WeekSchedule workouts={program.workouts} />
        <WeekSchedule workouts={program.workouts} />
      </SwipeALot>
    )
  }
}
