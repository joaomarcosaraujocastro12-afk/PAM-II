import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Scrollvie } from 'react-native';

export default function App() {
  return (
    <Scrollview style={container}>
        <Text>some text</Text>
    <View>
       <Text>Abra o arquivo app.js para cameçar a trabalhar no seu app!</Text>
    </View>
    </Scrollview>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
