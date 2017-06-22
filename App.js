import Expo from 'expo'
import { StackNavigator } from 'react-navigation';
import WPS from 'weight-program-schema'
import routes from './app/config/routes'

const App = StackNavigator(routes, {
  initialRouteName: 'ProgramList',
  initialRouteParams: { programs: WPS.programs },
  navigationOptions: { headerStyle: {marginTop: Expo.Constants.statusBarHeight} }
})

export default App;
