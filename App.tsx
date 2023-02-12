import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [isUriInputVisibile, setIsUriInputVisibile] = useState(false);
  const [uri, setUri] = useState('https://google.com/');

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#3f3f46',
          height: StatusBar.currentHeight + 20,
        }}
      />
      <WebView
        source={{ uri: uri }}
        onMessage={(event) => {
          alert(event.nativeEvent.data);
        }}
        style={{ height: '100%' }}
      />
      {isUriInputVisibile && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Hello World</Text>
        </View>
      )}
      <View
        style={{
          backgroundColor: '#3f3f46',
          alignContent: 'center',
          justifyContent: 'space-between',
          paddingVertical: 5,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsUriInputVisibile((prev) => !prev);
          }}>
          <View
            style={{
              borderColor: 'white',
              borderWidth: 1,
              borderRadius: 10,
              padding: 5,
              width: 48,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons name="magnify" color="white" size={32} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
