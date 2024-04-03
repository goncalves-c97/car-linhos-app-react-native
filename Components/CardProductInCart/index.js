import {    
    Text,
    View,
    TouchableOpacity,
    Image,    
} from "react-native";
import styles from "./styles";

import GenericProductImage from "../../assets/generic_product.png";

import SpareParts from "../../assets/spare_parts.png";
import Tools from "../../assets/tools.png";
import CleanCare from "../../assets/clean_care.png";
import TireWheels from "../../assets/tires_wheels.png";
import Electronics from "../../assets/electronics.png";
import Miscellanelous from "../../assets/miscellanelous.png"


import Remove from '../../assets/remove.png';



export default function CardProductInCart({ product, remove}) {
    return (
        <View style={styles.cardHorizontalArea}>
            <View style={styles.imageArea}>
                {
                    product.category_id == 0 &&
                    <Image source={GenericProductImage} style={styles.productImage}></Image>
                }
                {
                    product.category_id == 1 &&
                    <Image source={SpareParts} style={styles.productImage}></Image>
                }
                {
                    product.category_id == 2 &&
                    <Image source={Tools} style={styles.productImage}></Image>
                }
                {
                    product.category_id == 3 &&
                    <Image source={CleanCare} style={styles.productImage}></Image>
                }
                {
                    product.category_id == 4 &&
                    <Image source={TireWheels} style={styles.productImage}></Image>
                }
                {
                    product.category_id == 5 &&
                    <Image source={Electronics} style={styles.productImage}></Image>
                }
                {
                    product.category_id > 5 &&
                    <Image source={Miscellanelous} style={styles.productImage}></Image>
                }
            </View>

            <View
                style={[styles.cardUser, styles.shadow]} >

                <View style={styles.cardHorizontalArea}>
                    <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                </View>

                <View style={styles.cardHorizontalArea}>
                    <Text style={styles.productName}>R$ {product.unit_price}</Text>                    
                </View>
                    <View style={styles.cardHorizontalArea}>
                        <TouchableOpacity onPress={() => remove(product.id)}>
                            <Image style={styles.optionImage} source={Remove}></Image>
                        </TouchableOpacity>               
                    </View>
            </View>
        </View>
    );
}