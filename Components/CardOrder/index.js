import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from './styles'; // Importing the styles object from the external file

export default function CardOrder({ order }) {
    return (
        <View style={styles.cardHorizontalArea}>
            <View style={[styles.cardUser, styles.shadow]}>
                <Text style={styles.usernameLabel}>Código da venda: </Text>
                <Text style={styles.value}>{order.id}</Text>
                <Text style={styles.usernameLabel}>Nome do comprador: </Text>
                <Text style={styles.value}>{order.username}</Text>
                <Text style={styles.label}>Produtos comprados:</Text>
                <Text style={styles.value}>{order.productnames}</Text>
                <Text style={styles.usernameLabel}>Data e hora da venda: </Text>
                <Text style={styles.value}>{order.date_time}</Text>
                <Text style={styles.totalPrice}>Preço total da compra:</Text>
                <Text style={styles.value}>R$ {order.totalprice}</Text>
            </View>
        </View>
    );
}
