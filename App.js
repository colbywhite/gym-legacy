import React, { Component, PureComponent } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { List, ListItem, Grid, Col, Row } from 'react-native-elements'
import Expo from 'expo'
import { stronglifts, candito_squat } from 'weight-program-schema'

const programs = [stronglifts, candito_squat]

class Program extends Component {
  render() {
    const data = this.props.data
    return (
      <ListItem
        title={data.source}
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
