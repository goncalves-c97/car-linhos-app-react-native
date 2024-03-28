import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#00AFCC',
  },
  appLogo:{
    height: '50%',
    width: '100%',
    marginVertical: 50
  },
  themedButton:{
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f18149',
    padding: 0,
    borderWidth: 8,
    borderRadius: 50,
    borderColor: '#1B0036'
  },
  themedButtonText:{
    color: '#FAFAF9',
    fontSize: 35,
    fontWeight: 'bold'
  }
})

export default styles;