/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TextInput,
  Navigator,
  TouchableHighlight, 
  Dimensions,
  Alert,
  BackAndroid
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});


class ReactToDo extends Component {
  renderScene(route, navigator) {
  _navigator = navigator;
    if(route.name == 'Login') {
      return <Login navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'Home') {
      return <Home navigator={navigator} {...route.passProps}  />
    }
  }
  
  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'Login' }}
        renderScene={ this.renderScene } />
    )
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username:'', password:''};
  }
  
  _navigate(name) {
	/*
	if(this.state.username==''){
		Alert.alert( '', 'Please enter username');
		return;
	} else if(this.state.password==''){
		Alert.alert( '', 'Please enter password');
		return;
	}
	*/
	
    this.props.navigator.push({
      name: 'Home',
      passProps: {
        username: this.state.username
      }
    })
  }
	
  render() {
    return (
      <View style={ styles.container }>
		<View style={{alignItems:'center', marginTop:100}}>
			<Image source={require('./images/user.png')} style={{width:150, height:150, opacity:0.5}} />
		</View>
		<View style={{width: width*.8, justifyContent: 'center', marginTop:50, marginLeft: width*.1}}>
			<Text style={ styles.heading }>Sign In</Text>
			<TextInput autoCapitalize="none" placeholder="Username" autoCorrect={false} style={styles.singleLine} onChangeText={(username) => this.setState({username})}
    value={this.state.username} />
			<TextInput autoCapitalize="none" placeholder="Password" autoCorrect={false} style={styles.singleLine} secureTextEntry={true} onChangeText={(password) => this.setState({password})}
    value={this.state.password} />
			<TouchableHighlight style={ styles.button } onPress={ () => this._navigate('YOYOYOYOYO') }>
			  <Text style={ styles.buttonText }>Sign In</Text>
			</TouchableHighlight>
			<Text style={ styles.linkText }>Forgot Password?</Text>
		</View>
      </View>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
	var peopleData = [{name: 'Nikhil', stepsWalked: 15001},{name: 'Kiran', stepsWalked: 12050},{name: 'Yogesh', stepsWalked: 11920},{name: 'Harsh', stepsWalked: 10043},{name: 'Viraj', stepsWalked: 9087},{name: 'Mandar', stepsWalked: 9077},{name: 'Amol', stepsWalked: 5001},{name: 'Sagar', stepsWalked: 5001},{name: 'Tushar', stepsWalked: 4098},{name: 'Kishor', stepsWalked: 300}];
	this.state = {data : ds.cloneWithRows(peopleData)};
  }

  renderRow(rowData){
    return (
		<View style={{flex:1}}>
		  <View style={{flex:1, flexDirection:'row', marginBottom:10, marginRight:10, marginLeft:10, backgroundColor: '#ffffff'}}>
			<View style={{width: width*.2}}>
				<Image
				  source={require('./images/user_square.png')}
				  style={{width: 80, height:80, marginLeft: 5, marginBottom:5, marginRight:5, marginTop:5, borderWidth: 1}} />
			</View>
			<View style={{width: width*.8, padding: 15}}>
				<Text style={{fontSize:20, fontWeight:'bold'}}>{rowData.name}</Text>
				<Text style={{fontSize:22, fontWeight:'bold', color:'#da333a', marginTop:10}}>{rowData.stepsWalked} Steps</Text>
			</View>
		  </View>
		</View>
    );
  }

  render() {
    return (
		<View style={{flex:1, backgroundColor:'#dddddd'}}>
		<View style={{justifyContent: 'center',height: 60, backgroundColor:'#da333a', padding:10, marginBottom:10}}>
				<Text style={{fontSize:24, color:'#ffffff', textAlign:'center'}}>Top steppers this week</Text>
			</View>
      <ListView
        dataSource={this.state.data}
        renderRow={this.renderRow}
        style={styles.container}
      />
	  </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1
  },
  thumb: {
    backgroundColor: '#ffffff',
    marginBottom: 5,
    elevation: 1
  },
  txt: {
    margin: 10,
    fontSize: 18,
	fontWeight: 'bold', 
    textAlign: 'left'
  },
  singleLine: { fontSize: 18, padding: 4, marginBottom:10 },
  button: {
    height:60,
    justifyContent: 'center',
    backgroundColor: '#da333a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize:20,
	color:'#ffffff',
  },
  heading:{
	fontSize:22, justifyContent:'center', marginBottom:20, textAlign:'left', fontWeight: 'bold', 
  },
  linkText:{
	color:'#428bca', textAlign:'right', marginTop:10, fontSize: 18
  }
});

AppRegistry.registerComponent('ReactToDo', () => ReactToDo);