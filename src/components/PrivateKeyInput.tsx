import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nip19 } from 'nostr-tools';
import { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const BigInt = require('big-integer');

const isKeyValid = (privateKey: string) => {
  if (privateKey === '') return true;
  if (privateKey.match(/^[a-f0-9]{64}$/)) return true;
  try {
    if (nip19.decode(privateKey).type === 'nsec') return true;
    return true;
  } catch (_) {}
  return false;
};

const storePrivateKey = async (privateKey: string) => {
  try {
    await AsyncStorage.setItem('private_key', privateKey);
  } catch (e) {
    return false;
  }

  return true;
};

// return true if saved and false otherwise
const savePrivateKey = async (privateKey: string) => {
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

export const PrivateKeyInput = ({
  onPrivateKeySave,
  onPrivateKeySaveError,
}: PrivateKeyInputProps) => {
  const [privateKey, setPrivateKey] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('private_key').then((key) => {
      if (key) {
        setPrivateKey(key);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return null;

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
          inputMode="text"
          keyboardType="visible-password"
          onChangeText={(text) => {
            setPrivateKey(text);
          }}
          style={{
            paddingLeft: 10,
            color: 'white',
            minWidth: 200,
          }}>
          <Text style={{ color: 'white' }}>{privateKey}</Text>
        </TextInput>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
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
    </View>
  );
};
