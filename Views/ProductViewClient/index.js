import { useEffect } from 'react';
import { Text, View, TouchableOpacity, BackHandler, Alert, ScrollView } from 'react-native';
import styles from './styles';

import CardProductInCart from '../../Components/CardProductInCart';

import {
    addOrder,
} from '../../services/dbservice'

export default function Home({ navigation }) {
    const user = navigation.getParam('user', null);
    const productsInCart = navigation.getParam('productsInCart', null);
    // Esse useEffect é utilizado para sobrescrever o comportamento no botão nativo de voltar do Android
    useEffect(() => {
    }, [navigation]);

    function goBack() {
        navigation.navigate('Products', { user: user, productsInCart: productsInCart });
    }

    function getProductIndexById(products, productId) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === productId) {
                return i; // Return the index of the product
            }
        }
        return -1; // Return -1 if product not found
    }

    async function eraseProductFromCart(product_id) {
        Alert.alert('Apagar produto', 'Deseja realmente apagar o produto?', [
            {
                text: 'Não',
                onPress: () => null,
                style: 'cancel',
            },
            {
                text: 'Sim', onPress: async () => {
                    let productIndexToDelete = getProductIndexById(productsInCart, product_id);

                    if (productIndexToDelete !== -1) {
                        productsInCart.splice(productIndexToDelete, 1);
                        navigation.navigate('ProductViewClient', { productsInCart: productsInCart, user: user });
                        Alert.alert("Produto removido com sucesso!");
                    } else {
                        Alert.alert("Product não encontrado.");
                    }
                }
            },
        ]);
    }

    async function finalizarCompra() {
        console.log('Finalizando a compra');
        
        let result = await addOrder(productsInCart, user, calcTotal());

        if (result) {
            // Alert.alert('Parabéns pela compra fictícia!');
            // Alert.alert('Seu produto nunca irá chegar =)');

            Alert.alert(
                "Parabéns pela compra fictícia!",
                "Seu produto nunca irá chegar =)",
                [
                  {
                    text: "OK",
                    onPress: () => {

                    }
                  }
                ],
                { cancelable: false }
              );

            productsInCart.splice(0, productsInCart.length);
        }
        else
            Alert.alert('Houve algum problema para registrar a compra!');

        navigation.navigate('Products', { user });
    }

    function calcTotal() {
        var total = 0;
        for (var i = 0; i < productsInCart.length; i++) {
            total += productsInCart[i]["unit_price"];
        }
        return total;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewView}>
                {
                    productsInCart != null &&
                    <View style={styles.scrollView}>
                        {
                            productsInCart.map((product, index) => (
                                <CardProductInCart
                                    product={product}
                                    remove={eraseProductFromCart}
                                    key={index.toString()}
                                />
                            ))
                        }

                    </View>
                }
            </ScrollView>
            <View style={styles.totalView}>
                <Text style={styles.total}>Total: R$ {calcTotal()}</Text>
            </View>

            <TouchableOpacity style={styles.themedButton} onPress={() => finalizarCompra(productsInCart)}>
                <Text style={styles.themedButtonText}>Finalizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.themedQuitButton} onPress={() => goBack()}>
                <Text style={styles.themedButtonText}>VOLTAR</Text>
            </TouchableOpacity>
        </View>
    );
}