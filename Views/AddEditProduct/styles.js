import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#00AFCC',
  },
  horizontalView:{
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
  themedCancelButton:{
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F18149',
    padding: 0,
    borderWidth: 8,
    borderRadius: 50,
    borderColor: '#1B0036',
    marginVertical: 10
  },
  themedSaveItemButton:{
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#04C963',
    padding: 0,
    borderWidth: 8,
    borderRadius: 50,
    borderColor: '#1B0036',
    marginTop: 10
  },
  themedButtonText:{
    color: '#FAFAF9',
    fontSize: 30,
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
  picker: {
    backgroundColor: 'white',
    width: '78%',
    backgroundColor: 'white',
    fontSize: 15,
    paddingHorizontal: 10,
    marginLeft: 5,
    marginRight: 65,
    color: 'black'
  },
  label:{
    marginVertical: 10,
    fontSize: 20
  },
  input:{
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    paddingHorizontal: 10
  },
  biggerFontInput:{
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 30,
    paddingHorizontal: 10,
    width: '90%',
    textAlign: 'center'
  },
  moneyLabel:{
    position: 'absolute',
    fontSize: 35,
    zIndex: 1,
    textAlign: 'left',
    marginLeft: 20
  },
  addIcon:{
    height: 50,
    width: 50,
    marginLeft: 60    
  },
  scrollViewView: {
    flex: 1,
    width: '90%',
    marginTop: 25
  },
  scrollView: {
    height: '100%'
  }
})

export default styles;