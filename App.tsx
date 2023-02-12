import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { PrivateKeyInput } from './src/PrivateKeyInput';

export default function App() {
  const [isUriInputVisibile, setIsUriInputVisibile] = useState(false);
  const [isPrivateKeyInputVisibile, setIsPrivateKeyInputVisibile] = useState(false);
  const [uri, setUri] = useState('https://startpage.com/');
  const [uriToRender, setUriToRender] = useState(uri);
  const [isWebViewReady, setIsWebViewReady] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#3f3f46',
          height: StatusBar.currentHeight + 20,
        }}
      />
      <WebView
        source={{ uri: uriToRender }}
        onMessage={(event) => {
          alert(event.nativeEvent.data);
        }}
        style={{ height: '100%' }}
        onLoadEnd={() => {
          setIsWebViewReady(true);
        }}
        onLoadStart={() => {
          setIsWebViewReady(false);
        }}
      />
      {!isWebViewReady && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flexWrap: 'wrap',
            alignContent: 'center',
            width: '100%',
            height: '100%',
          }}
          size="large"
        />
      )}

      <View
        style={{
          backgroundColor: '#3f3f46',
          alignContent: 'center',
          justifyContent: 'space-between',
          paddingVertical: 5,
          paddingHorizontal: 20,
        }}>
        {isUriInputVisibile && (
          <View
            style={{
              paddingBottom: 10,
              borderColor: 'white',
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 5,
              paddingVertical: 3,
              flex: 0,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Ionicons
                name="globe-outline"
                size={24}
                color="white"
                style={{
                  marginTop: 3,
                }}
              />
              <TextInput
                inputMode="url"
                keyboardType="url"
                onChangeText={(text) => {
                  setUri(text);
                }}
                style={{
                  paddingLeft: 10,
                  paddingRight: 100,
                }}>
                <Text style={{ color: 'white' }}>{uri}</Text>
              </TextInput>
            </View>
            <TouchableOpacity
              onPress={() => {
                setUriToRender(uri);
                setIsUriInputVisibile((prev) => !prev);
              }}>
              <Ionicons
                name="checkmark-outline"
                size={24}
                color="white"
                style={{
                  marginTop: 3,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        {isPrivateKeyInputVisibile && (
          <PrivateKeyInput onPrivateKeySave={() => {}} onPrivateKeySaveError={() => {}} />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
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
          <TouchableOpacity
            onPress={() => {
              setIsPrivateKeyInputVisibile((prev) => !prev);
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
              <MaterialCommunityIcons name="eye-outline" color="white" size={32} />
            </View>
          </TouchableOpacity>
        </View>
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
