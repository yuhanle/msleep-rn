import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View
} from 'react-native'
import PropTypes from 'prop-types'

export default class PlayerCtrl extends Component {
	static propTypes = {
	  onLike: PropTypes.func,
	  onPre: PropTypes.func,
	  onNext: PropTypes.func,
	  onPuase: PropTypes.func,
	  onList: PropTypes.func,
	  style: PropTypes.any,
	}

	render() {
		return (
			<View style={[styles.container, this.props.style ]}>
				<TouchableOpacity onPress={this.props.onLike}>
					<Image style={styles.ctrlbtn} source={require('../../res/icon_like.png')} />
				</TouchableOpacity>
				<TouchableOpacity onPress={this.props.onPre}>
					<Image style={styles.ctrlbtn} source={require('../../res/icon_pre.png')} />
				</TouchableOpacity>
				<TouchableOpacity onPress={this.props.onPuase}>
					{
						!this.props.pause ? 
						<Image style={[ styles.ctrlbtn, { width: 40, height: 40 } ] } source={require('../../res/icon_pause.png')}/> :
						<Image style={[ styles.ctrlbtn, { width: 40, height: 40 } ] } source={require('../../res/icon_play.png')}/>
					}
				</TouchableOpacity>
				<TouchableOpacity onPress={this.props.onNext}>
					<Image style={styles.ctrlbtn} source={require('../../res/icon_next.png')} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.props.onList()}>
					<Image style={styles.ctrlbtn} source={require('../../res/icon_list.png')} />
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
  },
	ctrlbtn: {
		width: 30,
		height: 30,
	}
})
