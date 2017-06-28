import React, { Component } from 'react';
import { View } from 'react-native';
import { List, ListItem } from 'react-native-elements'

// TODO: * calculate a schedule with rest days included
// * then make each day expandable to see the workout for that day
export default class WeekSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {expansionStates: props.workouts.map((w) => false)}
  }

  _toggleDaysExpansion(index) {
    var states = this.state.expansionStates.slice()
    states[index] = !states[index];
    this.setState({expansionStates: states})
  }

  render() {
    const workouts = this.props.workouts,
      expansionStates = this.state.expansionStates
    return (
      <List>
        {workouts.map((day, i) => {
          const isRestDay = day === 'rest'
          return (
            <View key={i}>
              <ListItem
                title={isRestDay ? day : 'lift'}
                rightIcon={{name:'expand-more'}}
                hideChevron={isRestDay}
                onPress={this._toggleDaysExpansion.bind(this, i)}
                />
              {!isRestDay && expansionStates[i] &&
                <ListItem
                  title={`Day ${i+1}`}
                  hideChevron={true}
                />
              }
            </View>
          )
        })}
      </List>
    )
  }
}
