import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Body, Text } from 'native-base';

export default class WeekSchedule extends Component {
  constructor(props) {
    super(props)
    const workouts = this.props.workouts
    this.state = {dayExpanded: workouts.map((w) => { return false})}
  }

  _onPress(e) {
    console.log('press', e)
    this.setState((previous) => {
      previous.dayExpanded[e] = !previous.dayExpanded[e]
      return previous
    })
  }

  render() {
    const workouts = this.props.workouts

    return (
      <Container>
        <Content>
          {workouts.map((workout, i) => {
            const isExpanded = this.state.dayExpanded[i]
            return (
              <Card key={i}>
                <CardItem button={true} onPress={this._onPress.bind(this, i)}>
                  <Body>
                      <Text>
                        {(workout === 'rest') ? workout : 'lift'}
                      </Text>
                  </Body>
                </CardItem>
                {(isExpanded) ?
                  <CardItem>
                    <Body>
                        <Text>
                          CONTENT
                        </Text>
                    </Body>
                  </CardItem>
                  : null
                }
              </Card>
            )
          })}
        </Content>
      </Container>
    )
  }
}
