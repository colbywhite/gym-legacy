import React, { Component } from 'react';
import { CardItem, Body, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Program extends Component {
  render() {
    const {data, navigate} = this.props
    return (
      <CardItem
        button={true}
        onPress={() => navigate('ProgramDetail', { program: data })}>
        <Body style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{data.name}</Text>
          <Icon name='chevron-right' />
        </Body>
      </CardItem>
    )
  }
}
