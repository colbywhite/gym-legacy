import React, { Component } from 'react';
import SwipeALot from 'react-native-swipe-a-lot'
import WeekSchedule from '../components/WeekSchedule'
import { schedule_calculator } from 'weight-program-schema'
import { spliceIntoChunks } from '../lib/utils'

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
