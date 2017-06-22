import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements'
import Expo from 'expo'
import { StackNavigator } from 'react-navigation';
import { stronglifts, candito_squat } from 'weight-program-schema'

const predefinedPrograms = [stronglifts, candito_squat]

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

class ProgramList extends Component {
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

const routes = {
  ProgramList: { screen: ProgramList }
}

const App = StackNavigator(routes, {
  initialRouteName: 'ProgramList',
  initialRouteParams: { programs: predefinedPrograms },
  navigationOptions: { headerStyle: {marginTop: Expo.Constants.statusBarHeight} }
})

export default App;
