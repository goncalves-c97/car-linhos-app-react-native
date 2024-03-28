import { react, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, BackHandler, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import styles from './styles';

import {
    addUser,
    getRegisteredEmail
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

    function checkUserInputs(){

        console.log(selectedRole);
        if (selectedRole != 'Vendedor' && selectedRole != 'Comprador'){
            Alert.alert('Função inválida!');
            return false;
        }

        if(name == ''){
            Alert.alert('Nome não informado!');
            return false;
        }

        if(email == ''){
            Alert.alert('Email não informado!');
            return false;
        }
        else{
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            if(!emailRegex.test(email)){
                Alert.alert('Email inválido!');
                return false;
            }
        }

        if (password == ''){
            Alert.alert('Senha não preenchida!');
            return false;
        }
        else if (password != confirmPassword){
            Alert.alert('As senhas não conferem!');
            return false;
        }

        return true;
    }

    async function registerUser(){
        if(!checkUserInputs())
            return;

        if(await getRegisteredEmail(email)){
            Alert.alert('Já existe um cadastro com o email informado!');
            return;
        }
        
        let newUser = {
            name: name,
            email: email,
            password: password,
            role: selectedRole
        }

        if(!await addUser(newUser))
            Alert.alert('Houve algum erro para inserir o usuário!');
        else{
            Alert.alert('Usuário inserido com sucesso!');
            Alert.alert('Agora basta efetuar o login com os dados passados.');
            navigation.navigate('Login');
        }
    }

    const [selectedRole, setSelectedRole] = useState('Vendedor');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Função</Text>
            <Picker
                selectedValue={selectedRole}
                onValueChange={(itemValue) => setSelectedRole(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Vendedor" value="Vendedor" />
                <Picker.Item label="Comprador" value="Comprador" />
            </Picker>
            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} keyboardType='default' onChangeText={(text) => setName(text)}>

            </TextInput>

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} keyboardType='email-address' onChangeText={(text) => setEmail(text)}>

            </TextInput>

            <Text style={styles.label}>Senha</Text>
            <TextInput style={styles.input} keyboardType='default' onChangeText={(text) => setPassword(text)} secureTextEntry={true}>

            </TextInput>

            <Text style={styles.label}>Confirmar senha</Text>
            <TextInput style={styles.input} keyboardType='default' onChangeText={(text) => setConfirmPassword(text)} secureTextEntry={true}>

            </TextInput>

            <TouchableOpacity style={styles.themedButton} onPress={() => registerUser()}>
                <Text style={styles.themedButtonText}>REGISTRAR-SE</Text>
            </TouchableOpacity>
        </View>

    );

}