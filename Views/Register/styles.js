import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00AFCC',
  },
  label:{
    fontSize: 25,
    marginBottom: 15
  },
  input:{
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    paddingHorizontal: 10,
    marginBottom: 20
  },
  themedButton:{
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f18149',
    padding: 0,
    borderWidth: 8,
    borderRadius: 50,
    borderColor: '#1B0036',
    marginTop: 50
  },
  themedButtonText:{
    color: '#FAFAF9',
    fontSize: 35,
    fontWeight: 'bold'
  },
  picker: {
    backgroundColor: 'white',
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'black'
  },
})

export default styles;