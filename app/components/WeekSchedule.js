import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'

// TODO: * calculate a schedule with rest days included
// * then make each day expandable to see the workout for that day
export default class WeekSchedule extends Component {
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
