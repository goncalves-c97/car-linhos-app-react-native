import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({

    cardUser:{
        backgroundColor: "#FAFAF9",
        flexDirection: 'column',
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    },
    productImage:{
        height: 90,
        width: 90
    },
    productName:{
        flex: 0.7,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5,
        flexWrap: "wrap",
        paddingLeft: 5,
        height: 50
    },
    imageArea: {
        backgroundColor: '#FAFAF9',
        alignItems: 'flex-start',
        padding: 10
    },
    cardHorizontalArea:{    
        flexDirection: 'row',
        flex: 1
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },


})

export default styles;

