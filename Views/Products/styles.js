import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  navigationBarText: {
    width: '100%',
    backgroundColor: '#1B0036',
    color: '#FAFAF9',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingBottom: 10,
    paddingLeft: 50
  },
  scrollViewView: {
    flex: 1,
    width: '90%'
  },
  scrollView: {
    height: '100%',
    marginTop: 20
  }
})

export default styles;