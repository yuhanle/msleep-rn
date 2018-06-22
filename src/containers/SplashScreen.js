import React, { Component } from 'react'
import { 
  StyleSheet,
  StatusBar,
  View,
  Image
} from 'react-native'
import RNSplashScreen from 'react-native-splash-screen'
import { Actions } from 'react-native-router-flux'
import Toast from 'antd-mobile/lib/toast'
import { connect } from 'react-redux'
import { delay } from 'redux-saga'
import store from '../redux/store'
import Storage from '../common/storage'
import { SCENE_INDEX } from '../constants/scene'

function mapStateToProps(state) {
  return {
    user: state.user,
    music: state.music
  }
}

@connect(mapStateToProps)
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    console.log("启动页加载成功")
    
    this.timer = setTimeout(
      () => { 
        Actions.replace(SCENE_INDEX)
        RNSplashScreen.hide()
      }, 
      3000
    );
  }

  async componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Image 
          style={styles.animatedBox} 
          source={require("../../res/launch_screen.png")} 
        />
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  animatedBox: {
    height: '100%',
    width: '100%',
  }
});
