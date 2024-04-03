import { useEffect, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, BackHandler, Alert, StatusBar, TextInput, Image, ScrollView } from 'react-native';
import Dialog from 'react-native-dialog';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

import Add from '../../assets/add.png';

import CardProduct from '../../Components/CardProduct';

import {
    addCategory,
    addProduct,
    getCategoriesList,
    getProductsList,
    updateProduct
} from '../../services/dbservice'

export default function Home({ navigation }) {

    const [dialogVisible, setDialogVisible] = useState(false);
    const [inputText, setInputText] = useState('');

    const showDialog = () => {
        setDialogVisible(true);
    };

    const handleCancel = () => {
        setInputText('');
        setDialogVisible(false);
    };

    const handleAdd = async () => {
        setDialogVisible(false);

        if (categories.findIndex((x) => x.name == inputText) == -1) {
            let result = await addCategory(inputText);

            if(result){
                Alert.alert("Nova categoria adicionada com sucesso!");
                await loadCategories();
            }
            else
                Alert.alert("Houve algum problema para inserir a nova categoria!");
        }
        else
            Alert.alert("já existe uma categoria com o nome informado!");

        setInputText('');
    };

    const user = navigation.getParam('user', null);    
    const product_id = navigation.getParam('product_id', null);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [productToAddEdit, setProductToAddEdit] = useState([]);

    const pickerRef = useRef();

    const [category, setCategory] = useState(0);
    const [name, setName] = useState('');
    const [unit_price, setUnitPrice] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        console.log("useEffect 1");

        try {
            if (productToAddEdit.length > 0) {

                let categoryMatch = categories.filter(x => x.id == productToAddEdit[0].category_id);

                setCategory(categoryMatch[0].id);
                setName(productToAddEdit[0].name);
                setUnitPrice(productToAddEdit[0].unit_price.toString());
                setStock(productToAddEdit[0].stock.toString());
            }
        }
        catch {

        }
    }, [productToAddEdit, categories]);

    // Esse useEffect é utilizado para sobrescrever o comportamento no botão nativo de voltar do Android
    useEffect(() => {
        console.log("useEffect 2");

        loadItems();

        const backAction = () => {
            navigation.navigate('Products', { user: user });
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [navigation]);

    useEffect(() => {
        if (products != undefined) {
            console.log("useEffect 3");

            console.log(product_id);

            if (product_id > 0) {
                setProductToAddEdit(products.filter(x => x.id == product_id));
            }
            else {
                setProductToAddEdit([{ id: 0, name: '', unit_price: '', stock: '', category_id: 0 }]);
            }
        }
    }, [products]);

    async function loadItems() {

        await loadProducts();
        await loadCategories();
    }

    function goBack() {
        navigation.navigate('Products', { user: user });
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

    function setCategoryOverride(category) {
        productToAddEdit[0].category_id = category;
        setCategory(category);
    }

    function setNameOverride(newName) {
        productToAddEdit[0].name = newName;
        setName(newName);
    }

    function setUnitPriceOverride(newUnitPrice) {
        productToAddEdit[0].unit_price = newUnitPrice;
        setUnitPrice(newUnitPrice);
    }

    function setStockOverride(newStock) {
        productToAddEdit[0].stock = newStock;
        setStock(newStock);
    }

    function checkInputs() {
        if (category == 0) {
            Alert.alert("Categoria não selecionada!");
            return false;
        }

        if (name == '') {
            Alert.alert("Nome do produto não preenchido!");
            return false;
        }

        if (unit_price == '') {
            Alert.alert("Preço unitário não preenchido!");
            return false;
        }
        else {
            try {
                const doubleValue = +unit_price;

                if (doubleValue <= 0) {
                    Alert.alert("O produto não pode ser de graça!");
                    return false;
                }
            }
            catch {
                Alert.alert("O valor informado não é válido!");
                return false;
            }
        }

        if (stock == '') {
            Alert.alert('Quantidade em estoque não preenchida!');
        }
        else {
            try {
                const doubleValue = +stock;

                if (doubleValue < 0) {
                    Alert.alert("O valor em estoque não pode ser negativo!");
                    return false;
                }
            }
            catch {
                Alert.alert("A quantidade em estoque informada não é válida!");
                return false;
            }
        }

        return true;
    }

    async function saveProduct() {
        if (!checkInputs())
            return;

        productToAddEdit[0].unit_price = +productToAddEdit[0].unit_price;
        productToAddEdit[0].stock = +productToAddEdit[0].stock;

        let result = false;

        if (productToAddEdit[0].id > 0)
            result = await updateProduct(productToAddEdit[0]);
        else
            result = await addProduct(productToAddEdit[0]);

        if (result) {
            Alert.alert("Produto salvo com sucesso!");
            goBack();
        }
        else
            Alert.alert("Houve algum problema para salvar o produto. Tente novamente.");
    }

    return (
        <View style={styles.container}>
            <View>
                <Dialog.Container visible={dialogVisible}>
                    <Dialog.Title>Adicionar categoria</Dialog.Title>
                    <Dialog.Description>
                        Digite o nome da categoria a ser adicionada
                    </Dialog.Description>
                    <Dialog.Input
                        placeholder="Nome da categoria..."
                        onChangeText={(text) => setInputText(text)}
                        value={inputText}
                    />
                    <Dialog.Button label="Cancelar" onPress={handleCancel} />
                    <Dialog.Button label="Adicionar" onPress={handleAdd} />
                </Dialog.Container>
            </View>
            <StatusBar barStyle="light-content" backgroundColor="#1B0036" />
            {
                product_id == 0 &&
                <Text style={styles.navigationBarText}>Adicionar produto</Text>
            }
            {
                product_id > 0 &&
                <Text style={styles.navigationBarText}>Editar produto</Text>
            }
            <Text style={styles.label}>Categoria do produto </Text>
            <View style={styles.horizontalView}>
                <TouchableOpacity onPress={() => showDialog()}>
                    <Image style={styles.addIcon} source={Add}></Image>
                </TouchableOpacity>
                <Picker
                    ref={pickerRef}
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategoryOverride(itemValue)}
                    style={styles.picker}>
                    <Picker.Item label="Selecione uma categoria..." value={0} />
                    {
                        categories.map((category, index) => (
                            <Picker.Item label={category.name} value={category.id} />
                        ))}
                </Picker>
            </View>

            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} keyboardType='default' value={name} onChangeText={(text) => setNameOverride(text)}>

            </TextInput>

            <Text style={styles.label}>Preço unitário</Text>
            <View style={styles.horizontalView}>
                <Text style={styles.moneyLabel}>R$</Text>
                <TextInput style={styles.biggerFontInput} keyboardType='numeric' value={unit_price} onChangeText={(text) => setUnitPriceOverride(text)}>

                </TextInput>
            </View>

            <Text style={styles.label}>Quantidade em estoque</Text>
            <TextInput style={styles.biggerFontInput} keyboardType='numeric' value={stock} onChangeText={(text) => setStockOverride(text)}>

            </TextInput>

            <View style={styles.scrollViewView}>

                <ScrollView style={styles.scrollView}>
                    {
                        productToAddEdit.length == 1 &&
                        productToAddEdit.map((product, index) => (
                            <CardProduct product={product}
                                user={user}
                                edit={noFunction}
                                remove={noFunction}
                                addToCart={noFunction}
                                key={index.toString()} />
                        ))}
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.themedSaveItemButton} onPress={() => saveProduct()}>
                <Text style={styles.themedButtonText}>SALVAR ITEM</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.themedCancelButton} onPress={() => goBack()}>
                <Text style={styles.themedButtonText}>CANCELAR</Text>
            </TouchableOpacity>
        </View>
    );

}