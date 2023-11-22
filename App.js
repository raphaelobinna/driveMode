import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {StyleSheet, View} from 'react-native';

import {DefaultTheme, Provider} from 'react-native-paper';

import {HomePage} from './components/screens/HomePage';
import {OptionPage} from './components/screens/OptionPage';
import {MessagePage} from './components/screens/MessagePage';
import {FavoritePage} from './components/screens/FavoritePage';
import {ProfilePage} from './components/screens/ProfilePage';
import 'react-native-gesture-handler';
import {ProfileSVG} from './ext-assets/profile';
import {FavoriteSVG} from './ext-assets/favourite';
import {MessageSVG} from './ext-assets/message';
import {WheelSVG} from './ext-assets/drive';
import {OptionSVG} from './ext-assets/option';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const BottomStack = createMaterialBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
  },
};

const BottomStackNavigator = () => {
  return (
    <BottomStack.Navigator
      initialRouteName={'Home'}
      activeColor={'rgba(102, 92, 209, 1)'}
      inactiveColor={'rgba(235, 235, 235, 1)'}
      barStyle={{
        backgroundColor: 'black',
        paddingTop: 7,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.2,
        position: 'absolute',
        overflow: 'hidden',
      }}
      shifting={false}
      labeled={false}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const renderIcons = () => {
            switch (route.name) {
              case 'Home':
                return focused ? <WheelSVG /> : <WheelSVG />;
              case 'Message':
                return focused ? <MessageSVG /> : <MessageSVG />;
              case 'Favorite':
                return focused ? <FavoriteSVG /> : <FavoriteSVG />;
              case 'Profile':
                return focused ? <ProfileSVG /> : <ProfileSVG />;
              case 'Options':
                return focused ? <OptionSVG /> : <OptionSVG />;
              default:
                break;
            }
          };
          return <View>{renderIcons()}</View>;
        },
      })}>
      <BottomStack.Screen name={'Home'} component={HomePage} />
      <BottomStack.Screen name={'Message'} component={MessagePage} />
      <BottomStack.Screen name={'Favorite'} component={FavoritePage} />
      <BottomStack.Screen name={'Profile'} component={ProfilePage} />
      <BottomStack.Screen name={'Options'} component={OptionPage} />
    </BottomStack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <MainStack.Screen
        name={'BottomTab'}
        component={BottomStackNavigator}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};

function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'MainStack'}>
          <RootStack.Screen name={'MainStack'} component={MainStackNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
