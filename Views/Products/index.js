import { react, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, BackHandler, Alert, StatusBar, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native'
import styles from './styles';

import {
    getProductsList
} from '../../services/dbservice'
import CardProduct from '../../Components/CardProduct';

export default function Home({ navigation }) {
    
    const user = navigation.getParam('user', null);
    const salesman = user.role == 'Vendedor';
    const [products, setProducts] = useState([]);

    // Esse useEffect é utilizado para sobrescrever o comportamento no botão nativo de voltar do Android
    useEffect(() => {

        loadProducts();
        const backAction = () => {
            navigation.navigate('MainMenu', { user: user });
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [navigation]);

    function goBack() {
        navigation.navigate('MainMenu', { user: user });
    }

    function inDevelopment(){
        Alert.alert('Em desenvolvimento...');
    }

    async function loadProducts() {
    
        let products = await getProductsList();
    
        if (products.length > 0) {
          setProducts(products);
        } else {
          Alert.alert("Não há produtos cadastrados!");
          setProducts([]);
        }
      }


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1B0036" />
            <Text style={styles.navigationBarText}>Lista de produtos</Text>
            <View style={styles.scrollViewView}>

                {
                    products.length > 0 &&
                    <ScrollView style={styles.scrollView}>
                        {
                            products.map((product, index) => (
                                <CardProduct product={product}
                                    user={user}
                                    edit={inDevelopment}
                                    remove={inDevelopment}
                                    addToCart={inDevelopment}
                                    key={index.toString()} />
                            ))}
                    </ScrollView>
                }

            </View>
            {salesman &&
                <>
                    {/* <TouchableOpacity style={styles.themedButton}>
                        <Text style={styles.themedButtonText}>VENDAS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.themedButton}>
                        <Text style={styles.themedButtonText}>PRODUTOS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.themedButton}>
                        <Text style={styles.themedButtonText}>CLIENTES</Text>
                    </TouchableOpacity> */}
                </>}

            {!salesman &&
                <>
                    {/* <TouchableOpacity style={styles.themedButton}>
                        <Text style={styles.themedButtonText}>MINHAS COMPRAS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.themedButton}>
                        <Text style={styles.themedButtonText}>NOVA COMPRA</Text>
                    </TouchableOpacity> */}
                </>}
            <TouchableOpacity style={styles.themedQuitButton} onPress={() => goBack()}>
                <Text style={styles.themedButtonText}>VOLTAR</Text>
            </TouchableOpacity>
        </View>
    );

}