import { react, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, BackHandler, Alert, StatusBar, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

import {
    getCategoriesList,
    getProductsList,
    removeProduct
} from '../../services/dbservice'

import CardProduct from '../../Components/CardProduct';

import Cart from '../../assets/shopping_cart.png';

export default function Home({ navigation }) {

    const user = navigation.getParam('user', null);
    const salesman = user.role == 'Vendedor';
    const [productsInCart, setProductsInCart] = useState([]);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState('0');
    const [cartQuantity, setCartQuantity] = useState(0);

    // Esse useEffect é utilizado para sobrescrever o comportamento no botão nativo de voltar do Android
    useEffect(() => {

        loadProducts();
        loadCategories();
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

    async function filterProducts(productCategory) {
        setFilteredCategory(productCategory);
        let products = await getProductsList();
        let productCategoryInteger = parseInt(productCategory);

        if (productCategoryInteger == 0)
            setProducts(products);
        else
            setProducts(products.filter(x => x.category_id == productCategoryInteger));
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

    async function loadCategories() {

        let categories = await getCategoriesList();

        if (categories.length > 0) {
            setCategories(categories);
        } else {
            Alert.alert("Não há categorias de produtos cadastrados!");
            setCategories([]);
        }
    }

    async function editProduct(product_id) {
        navigation.navigate('AddEditProduct', { user: user, product_id: product_id });
    }

    async function eraseProduct(product_id) {
        Alert.alert('Apagar produto', 'Deseja realmente apagar o produto?', [
            {
                text: 'Não',
                onPress: () => null,
                style: 'cancel',
            },
            {
                text: 'Sim', onPress: async () => {
                    let eraseResult = await removeProduct(product_id);

                    if (eraseResult) {
                        Alert.alert("Produto apagado com sucesso!");
                        filterProducts(filteredCategory);
                    }
                    else
                        Alert.alert("Houve algum problema para apagar o produto!");
                }
            },
        ]);
    }

    async function addToCart(product_id){
        console.log(product_id);
        let productSelected = products.filter(x => x.id == product_id);
        console.log(productSelected);
        setProductsInCart([...productsInCart, productSelected]);
    }

    useEffect(() => {
        setCartQuantity(productsInCart.length);
        console.log("Carrinho: ", productsInCart);
    }, [productsInCart]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1B0036" />
            <View style={styles.horizontalView}>
                <Text style={styles.navigationBarText}>Lista de produtos</Text>
                <TouchableOpacity>
                    <Image style={styles.icon} source={Cart}></Image>
                </TouchableOpacity>
                <Text style={styles.cartQuantity}>{cartQuantity}</Text>
            </View>
            <Text style={styles.label}>Filtrar por categoria: </Text>
            <Picker
                selectedValue={filteredCategory}
                onValueChange={(itemValue) => filterProducts(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Todas" value="0" />
                {
                    categories.map((category, index) => (
                        <Picker.Item label={category.name} value={category.id} />
                    ))}
            </Picker>
            <View style={styles.scrollViewView}>

                {
                    products.length > 0 &&
                    <ScrollView style={styles.scrollView}>
                        {
                            products.map((product, index) => (
                                <CardProduct product={product}
                                    user={user}
                                    edit={editProduct}
                                    remove={eraseProduct}
                                    addToCart={addToCart}
                                    key={index.toString()} />
                            ))}
                    </ScrollView>
                }

            </View>
            {
                salesman &&
                <TouchableOpacity style={styles.themedAddItemButton} onPress={() => editProduct(0)}>
                    <Text style={styles.themedButtonText}>ADICIONAR ITEM</Text>
                </TouchableOpacity>
            }
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