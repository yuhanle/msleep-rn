import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  Animated,
  Easing,
  SafeAreaView
} from 'react-native'
import PropTypes from 'prop-types'
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default class MenuList extends Component {
	static propTypes = {
		listArray: PropTypes.array,
		playIndex: PropTypes.number,
		pause: PropTypes.bool,
	  onPress: PropTypes.func,
	  onMenuListStateChanged: PropTypes.func,
	  style: PropTypes.any,
	  pause: PropTypes.bool
	}

	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this.listValueY = new Animated.Value(0)
	}

	xxx(expand) {
		// this.listValueY.setValue(0)
    Animated.timing(
      this.listValueY, 
      {
        toValue: expand == true ? 1 : 0,
        duration: 300,
        easing: Easing.linear
    }).start((finished) => {
    	if (finished) {
    		this.props.onMenuListStateChanged(expand)
    	}
    })
	}

	_onPressButton () {
		this.xxx(false)
	}

	render() {
		const valueY = this.listValueY.interpolate({
      inputRange: [0, 1],
      outputRange: [-280, 0]
    })

		return (
			<Animated.View style={[styles.container, this.props.style ]}>
					<View 
						style={{height: '100%', width: '100%'}} 
						onStartShouldSetResponder={() => true} 
						onResponderGrant={(evt) => {
							this._onPressButton(false)
						}}
					>
					</View>
					<Animated.View style={[styles.menuBox, { bottom: valueY }]}>
						{
						this.props.listArray ? this.props.listArray.map((menu, index) => {
							return (
									<TouchableOpacity style={{width: '100%'}} key={index.toString()} onPress={() => this.props.onPress(index)}>
										<View style={styles.item}>
											<Image 
												style={this.props.playIndex == index && !this.props.pause ? styles.mlimgPlaying : styles.mlimg} 
												source={ this.props.playIndex == index && !this.props.pause ? require('../../res/icon_voice.png') : menu.musicImgSmall } 
											/>
											<Text style={this.props.playIndex == index && !this.props.pause ? styles.mltitlePlaying : styles.mltitle}>{menu.musicName}</Text>
											<Text style={this.props.playIndex == index && !this.props.pause ? styles.mldescPlaying : styles.mldesc}>-</Text>
											<Text style={this.props.playIndex == index && !this.props.pause ? styles.mldescPlaying : styles.mldesc}>{menu.musicDes}</Text>
										</View>
									</TouchableOpacity>
								)
							}) : null
						}
					</Animated.View>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%',
		height: '100%',
  },
  menuBox: {
  	position: 'absolute',
  	width: '100%',
		backgroundColor: '#ffffff',
		...ifIphoneX({
			paddingBottom: 40
		})
  },
	item: {
		width: '100%',
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	mlimg: {
		width: 20,
		height: 20,
		margin: 10,
	},
	mltitle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#666666',
		margin: 10,
	},
	mldesc: {
		fontSize: 14,
		color: '#8a8a8a',
		margin: 10,
	},
	mlimgPlaying: {
		width: 20,
		height: 20,
		margin: 10,
	},
	mltitlePlaying: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'red',
		margin: 10,
	},
	mldescPlaying: {
		fontSize: 14,
		color: 'red',
		margin: 10,
	}
})
