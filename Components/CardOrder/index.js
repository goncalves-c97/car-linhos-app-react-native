import {
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import styles from "./styles";


export default function CardOrder({order}) {
    return (
        <View style={styles.cardHorizontalArea}>
            <View
                style={[styles.cardUser, styles.shadow]} >                 
  
                <Text>Nome do comprador: {order.username}</Text>

                <Text>Produtos comprados:</Text>
                <ScrollView><Text>{order.productnames}</Text></ScrollView>

                <Text>Preço total da compra: R${order.totalprice}</Text>
            
            </View>
 
        </View>
    );
}