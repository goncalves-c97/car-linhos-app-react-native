import { useEffect, useState } from 'react';
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

export default function Products({ navigation }) {
    var cartProducts = navigation.getParam('productsInCart', null);
    const user = navigation.getParam('user', null);
    const salesman = user.role == 'Vendedor';
    const [productsInCart, setProductsInCart] = useState([])
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
        navigation.navigate('AddEditProduct', { user: user, product_id: product_id, productsInCart: productsInCart });
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
        let productSelected = products.find(x => x.id == product_id);           
        
        setProductsInCart([...productsInCart, productSelected]);
    }

    useEffect(() => {        
        setCartQuantity(productsInCart.length);        
    }, [productsInCart]);
    

    useEffect(() =>{        
        if(cartProducts != [] && cartProducts != null){
            if(productsInCart.length == 0){
                setProductsInCart(cartProducts)    
            }
        }
    })

    function productsInCartView(){
        navigation.navigate('ProductViewClient', {productsInCart: productsInCart, user: user});
    }
    
    if(!salesman)  {
        return (
        
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#1B0036" />
                <View style={styles.horizontalView}>
                    <Text style={styles.navigationBarText}>Lista de Produtos</Text>                
                    <TouchableOpacity onPress={() => productsInCartView()}>
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
                            <Picker.Item label={category.name} value={category.id} key={index.toString()} />
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
                <TouchableOpacity style={styles.themedQuitButton} onPress={() => goBack()}>
                    <Text style={styles.themedButtonText}>VOLTAR</Text>
                </TouchableOpacity>
            </View>
        );
    }
    else{
        return (
        
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#1B0036" />
                <View style={styles.horizontalView}>
                    <Text style={styles.navigationBarText}>Lista de Produtos</Text>
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
                            <Picker.Item label={category.name} value={category.id} key={index.toString()} />
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
                <TouchableOpacity style={styles.themedQuitButton} onPress={() => goBack()}>
                    <Text style={styles.themedButtonText}>VOLTAR</Text>
                </TouchableOpacity>
            </View>
        );
    }
}