import React, {Component} from 'react';
import { Text, View } from 'react-native';

class pHScreen extends Component {
    componentDidMount(){
        console.log('hello pH')
      } 
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>pH</Text>
            </View>
        );
    }
}

export default pHScreen;