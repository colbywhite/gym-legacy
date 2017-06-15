import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { List, ListItem, Grid, Col, Row } from 'react-native-elements'
import Expo from 'expo'

const programs = [
  { name:"StrongLift 5x5", type:"MWF", duration:"Optionally Indefinite" },
  { name:"Candito Squat", type:"5-2", duration:"9 wks" }
]

class Program extends Component {
  render() {
    const data = this.props.data
    return (
      <ListItem
        title={data.name}
        hideChevron={true}
        />
    )
  }
}

export default class App extends Component {
  render() {
    return (
        <List style={{marginTop: Expo.Constants.statusBarHeight}}>
          {programs.map((program, i) => (
              <Program data={program} key={i}/>
          ))}
        </List>
    );
  }
}
