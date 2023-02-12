import React, { useEffect } from 'react'
import {AsyncStorage} from 'react-native';
import {nip19, generatePrivateKey, getPublicKey} from 'nostr-tools'


function Options(){
    let [key, setKey] = React.useState(''); // sets the private key

    useEffect(() => {
        
        AsyncStorage.getItem('privateKey').then((result) => {
            if (result.privateKey){
                setKey(nip19.nsecEncode(result.privateKey));
            } else {
                let key = generatePrivateKey();
                AsyncStorage.setItem({privateKey: key});
                setKey(key);
            }
        }
    }
}

