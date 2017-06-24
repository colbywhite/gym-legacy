import React, { Component } from 'react';
import { Container, Content, Card } from 'native-base';
import Program from '../components/Program'

export default class ProgramList extends Component {
  static navigationOptions = {
    title: 'Weight Programs'
  };
  render() {
    const { programs } = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          {programs.map((program, i) => {
            return (
            <Card key={i}>
              <Program data={program} navigate={navigate} />
            </Card>
            )
          })}
        </Content>
      </Container>
    )
  }
}
