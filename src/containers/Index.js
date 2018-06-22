import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  BVLinearGradient,
  Animated,
  Easing,
  LayoutAnimation
} from 'react-native';
import { View } from 'react-native-animatable';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import PlayerCtrl from '../components/PlayerCtrl';
import MenuList from '../components/MenuList';
import mochaData from '../common/mochaData';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Video from 'react-native-video';

function mapStateToProps(state) {
  return {
    user: state.user,
    partner: state.partner
  }
}

@connect(mapStateToProps)
export default class Index extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      weather_icon: require('../../res/icon_wind128.png'),
      weather_colors: ['#005F8C', '#f0f0f0', '#005F8C'],
      weather_old_colors: ['#005F8C', '#f0f0f0', '#005F8C'],
      cloud_icon1: require('../../res/icon_cloud_one.png'),
      cloud_icon2: require('../../res/icon_cloud_two.png'),
      cloud_icon3: require('../../res/icon_cloud_three.png'),
      file_link: '',
      pause: true,
      playMusicName: '自然风声',
      playMusicDes: '聆听大自然最质朴的声音',
      playIndex: 0,
      isPlay: false,
      hasUserInfo: false,
      isBottomSheetVisiable: false,

      listArray: mochaData,
    }

    this.animatedValue = new Animated.Value(0)
    this.fadeInOpacity = new Animated.Value(1)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  componentDidMount () {
    this.animate()
  }

  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 100000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  //切换声音事件
  _menuClick (index) {
    this._switchMusic(index)
    this._onMenuList(false);
    this.setState({ pause: false })
  }

  _switchMusic (index) {
    if (index == this.state.playIndex) return
    var item = this.state.listArray[index]
    var old_colors = this.state.weather_colors
    
    this.setState({
      playIndex: index,
      weather_icon: item.musicImg,
      playMusicName: item.musicName,
      playMusicDes: item.musicDes,
      weather_old_colors: old_colors,
      file_link: item.musicUrl
    })

    Animated.timing(
      this.fadeInOpacity, 
      {
        toValue: 0.8,
        duration: 300,
        easing: Easing.ease
    }).start(() => {
      this.setState({
        weather_colors: [item.musicBgStart, item.musicBgEnd, item.musicBgStart],
      })

      Animated.timing(
        this.fadeInOpacity, 
        {
          toValue: 1,
          duration: 600,
          easing: Easing.ease,
      }).start()
    })
  }

  //菜单目录动画完成回调
  onMenuListStateChanged (expand) {
    this.setState({
      isBottomSheetVisiable: expand
    })
  }

  onProgress (e) {
    // console.log(e)
  }

  onLoad (e) {
    console.log(e)
  }

  onError (e) {
    console.log('播放错误')
    console.log(e)
  }

  onBuffer (e) {
    console.log(e)
  }

  onTimedMetadata (e) {
    console.log(e)
  }

  //底部控制栏
  _onLike () {

  } 

  _onPre () {
    console.log("上一首")
    var targetIndex = this.state.playIndex - 1
    if (targetIndex < 0) {
      targetIndex = this.state.listArray.length - 1
    }

    this._switchMusic(targetIndex)
  }

  _onNext () {
    console.log("下一首")
    var targetIndex = this.state.playIndex + 1
    if (targetIndex > this.state.listArray.length - 1) {
      targetIndex = 0
    }

    this._switchMusic(targetIndex)
  }

  _onPuase () {
    if (this.state.file_link.length == 0) {
      this.setState({
        file_link: this.state.listArray[0].musicUrl
      })
    }

    this.setState({
      pause: !this.state.pause
    })
  }

  //显示隐藏列表
  _onMenuList (expand) {
    if (expand) {
      this.setState({
        isBottomSheetVisiable: expand
      })
    }

    this.refs.menuListView.xxx(expand)
  }

  render() {
    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-600, 300, -600]
    })
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.2, 1, 0.2]
    })

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Animated.View style={[styles.animatedBox, { opacity: this.fadeInOpacity }]}>
          <LinearGradient colors={this.state.weather_colors} locations={[0, 0.8, 1]} style={ styles.gradientBox }>
            <Animated.Image style={[ styles.animatedCloud, { marginLeft: movingMargin, opacity } ]} source={this.state.cloud_icon1}/>
          </LinearGradient>
        </Animated.View>
        <View style={styles.middleBox}>
          <Image style={styles.stateImage} source={this.state.weather_icon}/>
          <Text style={styles.stateTitle}>
            {this.state.playMusicName}
          </Text>
          <Text style={styles.stateDesc}>
            {this.state.playMusicDes}
          </Text>
        </View>
        <PlayerCtrl 
          style={styles.player} 
          pause={this.state.pause}
          onLike={() => this._onLike()}
          onPre={() => this._onPre()}
          onPuase={() => this._onPuase()}
          onNext={() => this._onNext()}
          onList={() => this._onMenuList(true)}
        />
        <MenuList 
          ref="menuListView" 
          style={[styles.menuList, { display: this.state.isBottomSheetVisiable == true ? 'flex' : 'none' }]} 
          listArray={this.state.listArray} 
          playIndex={this.state.playIndex}
          pause={this.state.pause}
          onPress={(index) => this._menuClick(index)}
          onMenuListStateChanged={(expand) => this.onMenuListStateChanged(expand)}
        />
        {
          this.state.file_link ? 
          <Video
            source={{uri: this.state.file_link, cache: { size: 50, expiresIn: 3600 }}}
            ref={(ref) => {
                this.player = ref
            }} 
            volume={1.0}
            paused={this.state.pause}
            resizeMode="cover"
            repeat={true}
            playInBackground
            playWhenInactive={false}
            progressUpdateInterval={250.0}
            ignoreSilentSwitch={"ignore"}
            onLoadStart={(e) => this.onLoad(e)}
            onLoad={(e) => this.onLoad(e)}
            onProgress={(e) => this.onProgress(e)}
            onError={(e) => this.onError(e)}
            onBuffer={this.onBuffer}
            onTimedMetadata={this.onTimedMetadata}
            style={{width: 0, height: 0}}
        /> : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  animatedBox: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  gradientBox: {
    height: '100%',
    width: '100%',
  },
  animatedCloud: {
    position: 'absolute',
  },
  middleBox: {
    flex: 1,
    alignItems: 'center',
    marginTop: '50%',
  },
  stateImage: {
    maxWidth: 120,
    marginBottom: 10,
  },
  stateTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  stateDesc: {
    fontSize: 16,
    color: '#eeeeee',
    margin: 12,
  },
  player: {
    position: 'absolute',
    left: 0,
    bottom: 40,
    width: '100%',
    height: 40,
    ...ifIphoneX({
      bottom: 60,
    })
  },
  menuList: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }
});