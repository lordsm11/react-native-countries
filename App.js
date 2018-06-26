import React from 'react';
import { Button, StyleSheet, StatusBar, Text, View, ListView, Image } from 'react-native';
import service from "./helpers/service";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      somme: 0, 
      isLoading: true 
    };
  }

  componentWillMount() {
    var self = this;
    return service.getAllCountries()
                .then(function(response){
                  self.setState({isLoading: false, countries: response.data})
                });
  }

  sum = (e) => {
    e.preventDefault(); 
    this.setState({ sommxe: this.state.somme + 1})
  }

  substract = (e) => {
    e.preventDefault(); 
    this.setState({ somme: this.state.somme - 1})
  }

  reset = (e) => {
    e.preventDefault(); 
    this.setState({ somme: 0})
  }

  render() {
    if(this.state.isLoading) {
      return <Text >Loading...</Text>
    }
    const dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 != r2});
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.bloc2}>
          <View style={styles.button}><Button title="Add" onPress={this.sum}/></View>
          <View style={styles.button}><Button title="Sub" onPress={this.substract}/></View>
          <View style={styles.button}><Button  title="Reset" onPress={this.reset}/></View>
        </View>
        <ListView
          dataSource={dataSource.cloneWithRows(this.state.countries)}
          renderRow={(rowData) =>
            <View>
               <Text>{rowData.name}</Text>
          </View>} 
          />
        <View>
        <Text style={styles.bloc3}>{this.state .somme}</Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  bloc1: {
    paddingBottom: 15,
  },
  bloc2: {
    flex: 1,
    flexDirection: 'row',
  },
  bloc3: {
    fontSize: 250,
  },
  button: {
    paddingLeft: 15,
    width: 100,
    height: 50,
  }
});