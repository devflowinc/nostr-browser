import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nip19 } from 'nostr-tools';
import { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export const isKeyValid = (privateKey: string) => {
  if (privateKey === '') return true;
  if (privateKey.match(/^[a-f0-9]{64}$/)) return true;
  try {
    if (nip19.decode(privateKey).type === 'nsec') return true;
  } catch (_) {}
  return false;
};

export const storePrivateKey = async (privateKey: string) => {
  try {
    await AsyncStorage.setItem('private_key', privateKey);
  } catch (e) {
    return false;
  }

  return true;
};

// return true if saved and false otherwise
export const savePrivateKey = async (privateKey: string) => {
  if (!isKeyValid(privateKey)) return;

  let hexOrEmptyKey = privateKey;

  try {
    let { type, data } = nip19.decode(privateKey);
    if (type === 'nsec' && typeof data === 'string') hexOrEmptyKey = data;
  } catch (_) {
    return false;
  }

  return await storePrivateKey(hexOrEmptyKey);
};

export interface PrivateKeyInputProps {
  onPrivateKeySave: (privateKey: string) => void;
  onPrivateKeySaveError: () => void;
}

export const PrivateKeyInput = ({ onPrivateKeySave, onPrivateKeySaveError }: PrivateKeyInputProps) => {
  const [privateKey, setPrivateKey] = useState('');

  return (
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
        <AntDesign
          name="key"
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
            setPrivateKey(text);
          }}
          style={{
            paddingLeft: 10,
            paddingRight: 100,
          }}>
          <Text style={{ color: 'white' }}>{privateKey}</Text>
        </TextInput>
      </View>
      <TouchableOpacity
        onPress={() => {
          savePrivateKey(privateKey).then((saved) => {
            saved ? onPrivateKeySave(privateKey) : onPrivateKeySaveError();
          });
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
      <TouchableOpacity
        onPress={() => {
          savePrivateKey(privateKey).then((saved) => {
            saved ? onPrivateKeySave(privateKey) : onPrivateKeySaveError();
          });
        }}>
        <Entypo
          name="cycle"
          size={24}
          color="white"
          style={{
            marginTop: 3,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
