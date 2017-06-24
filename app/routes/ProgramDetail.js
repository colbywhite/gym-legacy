import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import SwipeALot from 'react-native-swipe-a-lot'
import { schedule_calculator } from 'weight-program-schema'

// TODO: * calculate a schedule with rest days included
// * then make each day expandable to see the workout for that day
class WeekSchedule extends Component {
  render() {
    const workouts = this.props.workouts
    return (
      <List>
        {workouts.map((day, i) => {
          return (<ListItem
            title={day === 'rest' ? day : 'lift'}
            key={i}
            hideChevron={true}
            />
          )
        })}
      </List>
    )
  }
}

const spliceIntoChunks = (arr, chunkLength) => {
  var results = [],
    numChunks = Math.ceil(arr.length / chunkLength)
    i = 0,
    j = chunkLength - 1;
  while(results.length < numChunks) {
    results.push(arr.slice(i, j+1))
    i += chunkLength
    j += chunkLength
  }
  return results;
}

export default class ProgramDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.program.name} Detail`
  })
  render() {
    const { program } = this.props.navigation.state.params,
      sked = schedule_calculator(program),
      weeks = spliceIntoChunks(sked, 7)
    return (
      <SwipeALot>
        {weeks.map((week, i) => {
          return (<WeekSchedule key={i} workouts={week} />)
        })}
      </SwipeALot>
    )
  }
}
