import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    cardUser:{
        backgroundColor: "#FAFAF9",
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        marginVertical: 3,
        borderColor:'#1B0036',
        borderWidth:2.5
    },
    productImage:{
        height: 90,
        width: 90
    },
    optionImage:{
        height: 30,
        width: 30,
        marginLeft: 10
    },
    productName:{
        flex: 0.7,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5,
        flexWrap: "wrap",
        paddingLeft: 10,
        height: 50,
        paddingRight: 10
    },
    imageArea: {
        backgroundColor: '#FAFAF9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginVertical: 3
    },
    cardHorizontalArea:{
        marginTop: 30,
        marginBottom: 10,
        flexDirection: 'row',
        flex: 1,
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
    usernameLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#1B0036',
        width: '100%',
        color:'white'
    },
    username: {
        fontSize: 16
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#1B0036',
        width: '100%',
        color:'white'
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#1B0036',
        width: '100%',
        color:'white'
    },
    value: {
        padding: 6,
        fontSize: 18
    }
})

export default styles;

