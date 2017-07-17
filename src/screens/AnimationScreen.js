import React, { Component } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

export const ANIMATION_SCENE_NAME = 'ANIMATION_SCENE';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class AnimationScreen extends Component {

  constructor(props){
        super(props)
        this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
        this.spin()
  }

  spin() {
      this.spinValue.setValue(0)
      Animated.timing(
          this.spinValue,
          {
              toValue: 1,
              duration: 4000,
              easing: Easing.linear,
              useNativeDriver: true
          }
      ).start(() => this.spin())
  }

  static navigationOptions = {
    title: 'Animation',
  };

  render() {
    const marginLeft = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300]
    })

    const spin = this.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

      return (
          <View style={styles.container}>
              <Animated.Image
                  style={{
                      width: 227,
                      height: 200,
                      transform: [{rotate: spin}]}}
                  source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
              />
          </View>
      );
  }

}
