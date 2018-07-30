/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native'
import Voice from 'react-native-voice';

export default class App extends Component {

  constructor ( props ) {
    super( props );
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;

    this.state = {
      speechMode: false,
      lang: 'de-DE',
      lang_list: {
        'Swiss' : 'de-CH',
        'German': 'de-DE',
        'English': 'en-US'
      },
      text: ': )'
    }

    const { width } = Dimensions.get('window');
    this.windowWidth = width;
  }

  PressButton = () => {
    var { speechMode, text }  = this.state
    text = speechMode ? this.state.text : ': )';
    speechMode = !speechMode;
    this.setState( { speechMode, text } );
    if ( !this.state.speechMode ) {
      Voice.start(this.state.lang);
    } else {
      Voice.stop();
    }
  }

  onSpeechPartialResults = ( data ) => {
    if ( !this.state.speechMode ) {
      return;
    }
    this.setState( { text: data.value })
  }

  onSpeechEnd = (e) => {

  }

  onSpeechVolumeChanged(e) {

  }

  renderLangSelector () {
    var views = []
    for ( k in this.state.lang_list ) {
      const v = this.state.lang_list[k];
      const backgroundColor = v==this.state.lang ? '#EFE' : '#999';
      views.push(<TouchableOpacity style={ [styles.options, { backgroundColor }] } key={ 'sel_lang_' + k } 
        onPress={ _ => { this.setState({ lang: v }) } }>
        <Text>{ k }</Text>
      </TouchableOpacity>)
    }
    return views;
  }

  render () {
    return (
      <View style={styles.container}>
      
        <View style={ { flexDirection: 'row', margin: 10, marginBottom: 30 } }>
          { this.renderLangSelector() }
        </View>
        <TouchableOpacity style={ [styles.button, { backgroundColor: !this.state.speechMode ? '#CEF' : '#FA9' }] } onPress={ _ => this.PressButton() } >
          { !this.state.speechMode ? <Text>Press To Speech</Text> : <Text>Press To Stop</Text> }
        </TouchableOpacity>

        <View style={ { marginTop: 10, borderTopWidth: 1, padding: 20, borderTopColor: '#FFF', width: this.windowWidth } } >
          <Text style={ { fontSize: 24 } }>{ this.state.text } </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEDEDE',
  },
  options: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
  },
  button: {
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#CEF',
    padding: 20,
  }
});
