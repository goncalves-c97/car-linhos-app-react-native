import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00AFCC',
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
    marginVertical: 20
  },
  themedQuitButton:{
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C22542',
    padding: 0,
    borderWidth: 8,
    borderRadius: 50,
    borderColor: '#1B0036',
    marginVertical: 20
  },
  themedButtonText:{
    color: '#FAFAF9',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  greetMessage:{
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1B0036',
    textAlign: 'center'
  }
})

export default styles;