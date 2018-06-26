import React from "react";
import {
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
  ListView,
  TextInput
} from "react-native";
import service from "../helpers/service";

export default class CountryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      country: '',
      allCountries: [],
      countries: []
    };
  }

  reset = () => {
//    this.setState({ country: ''})
  };

  handleCountrySearchChange = value => {
    this.setState({
      countries: this.state.allCountries.filter(
        country =>
          country.name.toUpperCase().indexOf(value.toUpperCase()) !== -1
      )
    });
  };

  componentWillMount() {
    var self = this;
    return service.getAllCountries().then(function(response) {
      self.setState({
        isLoading: false,
        allCountries: response.data,
        countries: response.data
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <Text>Loading...</Text>;
    }

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Search country"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.handleCountrySearchChange}
          />

          <TouchableOpacity style={styles.submitButton} onPress={this.reset()}>
            <Text style={styles.submitButtonText}> Reset </Text>
          </TouchableOpacity>

          <View>
          <Text style={styles.result}>{this.state.countries.length} countries</Text>
          <Text style={styles.result}>Result : </Text>
          </View>
          <ListView
            dataSource={dataSource.cloneWithRows(this.state.countries)}
            renderRow={rowData => (
              <View>
                <Text>{rowData.name}</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  result: {
    fontSize: 50
  },
  button: {
    paddingLeft: 15,
    width: 100,
    height: 50
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});
