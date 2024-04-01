import { react, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, BackHandler, Alert } from 'react-native';
import styles from './styles';
import carLinhosLogo from '../../assets/car-linhos-logo.png';

import {
    createTables,
    checkMocks
} from '../../services/dbservice';

export default function Home({ navigation }) {

    let tablesCreated = false;

    async function checkTablesAndMocks() {
        if (!tablesCreated) {
            console.log("Verificando tabelas...");
            tablesCreated = await createTables();
            console.log("Tabelas OK: ", tablesCreated);

            let mockEnabled = true;

            if (mockEnabled) {
                console.log("Verificando mocks...");
                let mocksCreated = await checkMocks();
                console.log("Mocks OK: ", mocksCreated);
            }
            else
                console.log("Mocks desabilitados");
        }
    }

    useEffect(
        () => {
            checkTablesAndMocks();
        }, []);

    // Esse useEffect é utilizado para sobrescrever o comportamento no botão nativo de voltar do Android
    useEffect(() => {
        const backAction = () => {
            Alert.alert('Sair do Aplicativo', 'Deseja realmente sair?', [
                {
                    text: 'Não',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'Sim', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [navigation]);

    function loginView() {
        console.log('Chamando tela de login');
        navigation.navigate('Login');
    }

    function registerView() {
        console.log('Chamando tela de registro de usuário');
        navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.appLogo} source={carLinhosLogo}></Image>
            <TouchableOpacity style={styles.themedButton} onPress={() => loginView()}>
                <Text style={styles.themedButtonText}>ENTRAR</Text>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity style={styles.themedButton} onPress={() => registerView()}>
                <Text style={styles.themedButtonText}>REGISTRAR-SE</Text>
            </TouchableOpacity>
        </View>
    );

}