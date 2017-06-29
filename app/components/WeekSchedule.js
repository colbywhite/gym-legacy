import React, { Component } from 'react';
import { View } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import RestDay from './RestDay'

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
          if (day === 'rest') {
            return ( <RestDay key={i} /> )
          }
          return (
            <View key={i}>
              <ListItem
                key={i}
                title={'lift'}
                leftIcon={{name:'fitness-center'}}
                rightIcon={{name:'expand-more'}}
                onPress={this._toggleDaysExpansion.bind(this, i)}
                />
              {expansionStates[i] &&
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
