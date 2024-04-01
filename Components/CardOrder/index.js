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
                
                <Text>ID dos produtos: {order.productids}</Text>

                <Text>ID do usuário: {order.userid}</Text>

                <Text>Preço total: R$ {order.totalprice}</Text>
            
            </View>
 
        </View>
    );
}