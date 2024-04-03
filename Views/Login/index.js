import { useEffect, useState } from 'react';
import { Text, BackHandler, View, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';

import carLinhosLogo from '../../assets/car-linhos-logo.png';

import {
    getUserByEmailAndPassword
  } from '../../services/dbservice';

export default function Home({ navigation }) {

    // Esse useEffect é utilizado para sobrescrever o comportamento no botão nativo de voltar do Android
    useEffect(() => {
        const backAction = () => {
            navigation.navigate('Home');
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [navigation]);

    async function login() {

        if (email == ''){
            Alert.alert('Email não informado!');
            return; 
        }

        if(password == ''){
            Alert.alert('Senha não informada!');
            return;
        }

        let user = await getUserByEmailAndPassword(email, password);        

        if (user == undefined)
            Alert.alert('Email e/ou senha incorretos!');
        else{
            navigation.navigate('MainMenu', { user: user });
        }
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Image style={styles.appLogo} source={carLinhosLogo}></Image>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} keyboardType='email-address' onChangeText={(text) => setEmail(text)}>

            </TextInput>
            <Text style={styles.label}>Senha</Text>
            <TextInput style={styles.input} keyboardType='default' onChangeText={(text) => setPassword(text)} secureTextEntry={true}>

            </TextInput>

            <TouchableOpacity style={styles.themedButton} onPress={() => login()}>
                <Text style={styles.themedButtonText}>ENTRAR</Text>
            </TouchableOpacity>
        </View>
    );
}