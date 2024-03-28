import { react, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native'
import styles from './styles';

export default function Home({ navigation }) {

    // Esse useEffect é utilizado para sobrescrever o comportamento no botão nativo de voltar do Android
    useEffect(() => {
        const backAction = () => {
            Alert.alert('Deslogar', 'Deseja realmente deslogar?', [
                {
                    text: 'Não',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'Sim', onPress: () => navigation.navigate('Login') },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [navigation]);

    function logOff() {
        Alert.alert('Deslogar', 'Deseja realmente deslogar?', [
            {
                text: 'Não',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'Sim', onPress: () => navigation.navigate('Login') },
        ]);
    }

    function productsView(){
        navigation.navigate('Products', { user: user });
    }

    const user = navigation.getParam('user', null);
    const salesman = user.role == 'Vendedor';

    return (
        <View style={styles.container}>
            <Text style={styles.greetMessage}>Bem-vindo(a), {user.name}!</Text>
            {salesman &&
                <>
                    <TouchableOpacity style={styles.themedButton}>
                        <Text style={styles.themedButtonText}>VENDAS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.themedButton} onPress={ () => productsView() }>
                        <Text style={styles.themedButtonText}>PRODUTOS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.themedButton}>
                        <Text style={styles.themedButtonText}>CLIENTES</Text>
                    </TouchableOpacity>
                </>}

            {!salesman &&
                <>
                    <TouchableOpacity style={styles.themedButton}>
                        <Text style={styles.themedButtonText}>MINHAS COMPRAS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.themedButton} onPress={ () => productsView() }>
                        <Text style={styles.themedButtonText}>NOVA COMPRA</Text>
                    </TouchableOpacity>
                </>}
            <TouchableOpacity style={styles.themedQuitButton} onPress={() => logOff()}>
                <Text style={styles.themedButtonText}>SAIR</Text>
            </TouchableOpacity>
        </View>
    );

}