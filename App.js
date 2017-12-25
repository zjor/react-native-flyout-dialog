import React from 'react';
import { Animated, StyleSheet, Text, View, Button, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

class FlyoutDialog extends React.Component {

  constructor(props) {
    super(props)

    const { height } = Dimensions.get('window')
    this._height = height

    this.state = {
      offset: new Animated.Value(height)
    }    
  }

  show() {
    Animated.timing(this.state.offset, {
      duration: 500,
      toValue: 0
    }).start();
  }

  _close() {  
    Animated.timing(this.state.offset, {
      duration: 500,
      toValue: this._height
    }).start();
  }

  render() {
    return (
      <Animated.View style={[dialogStyles.canvas, {transform: [{ translateY: this.state.offset }]}]}>
        <View style={dialogStyles.container}>
          <View style={dialogStyles.usernameRow}>
            <Image style={dialogStyles.avatar} source={require('./blank_avatar.png')} />
            <Text style={dialogStyles.username}>John Smith</Text>
          </View>
          <Text style={dialogStyles.message}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          </Text>
        </View>      

        <TouchableWithoutFeedback onPress={this._close.bind(this)}>
          <View style={dialogStyles.closeButton}>
            <Icon name="ios-close" style={dialogStyles.closeButtonIcon}/>
          </View>
        </TouchableWithoutFeedback>

      </Animated.View>
    )
  }
}

const dialogStyles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },  
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: 24
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 16,
    width: 48,
    height: 48,
    backgroundColor: 'red',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'    
  },  
  closeButtonIcon: {
    fontSize: 32,
    color: 'white'
  },  
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 16
  },
  username: {
    marginLeft: 16
  },
  avatar: {
    width: 48,
    height: 48,    
  },
  message: {
    margin: 24,
  }
})


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Show dialog"
          onPress={() => {this._dialog.show()}}
        />
        <FlyoutDialog ref={el => this._dialog = el}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
