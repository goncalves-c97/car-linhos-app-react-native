import { react, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, BackHandler, Alert, StatusBar, ScrollView, Image } from 'react-native';
import styles from './styles';

import{
    getOrdersList
} from '../../services/dbservice'

import CardOrder from '../../Components/CardOrder';

export default function Home({ navigation }) {
    
    const user = navigation.getParam('user', null);
    const salesman = user.role == 'Vendedor';    
    const [orders, setOrders] = useState([]);    

    // Esse useEffect é utilizado para sobrescrever o comportamento no botão nativo de voltar do Android
    useEffect(() => {
        loadOrders();
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

    function inDevelopment() {
        Alert.alert('Em desenvolvimento...');
    }
    
    async function loadOrders() {

        let orders = await getOrdersList(user.name);
        console.log("orders ", orders)
        if (orders.length > 0) {
            setOrders(orders);
        } else {
            Alert.alert("Não há pedidos cadastrados!");
            setOrders([]);
        }
    }
    
    if(!salesman)  {
        return (
        
            <View style={styles.container}>                               
                <View style={styles.scrollViewView}>    
                    {
                        orders.length > 0 &&
                        <ScrollView style={styles.scrollView}>
                            {
                                orders.map((order, index) => (
                                    <CardOrder order={order}
                                        user={user}
                                        key={index.toString()} />
                                ))}
                        </ScrollView>
                    }
    
                </View>
                
                <TouchableOpacity style={styles.themedQuitButton} onPress={() => goBack()}>
                    <Text style={styles.themedButtonText}>VOLTAR</Text>
                </TouchableOpacity>
            </View>
        );
    }    
}