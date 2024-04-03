import { StyleSheet } from 'react-native';

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
    marginVertical: 10
  },
  themedAddItemButton:{
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
    paddingLeft: 90
  },
  scrollViewView: {
    flex: 1,
    width: '90%',
    marginTop: 10
  },
  scrollView: {
    height: '100%'
  },
  picker: {
    backgroundColor: 'white',
    width: '90%',
    backgroundColor: 'white',
    fontSize: 15,
    paddingHorizontal: 10,
    color: 'black'
  },
  label:{
    marginVertical: 10
  },
  horizontalView:{
    flexDirection: 'row',
    backgroundColor: '#1B0036'
  },
  icon:{
    height: 40,
    width: 40,
    marginRight: 70
  },
  cartQuantity:{
    position: 'absolute',
    backgroundColor: 'red',
    textAlign: 'right',
    borderRadius: 5,
    padding: 2,
    color: '#FAFAF9',
    fontWeight: 'bold',
    marginLeft: 420,
    marginTop: 18
  },
  totalView:{
    width: '90%',
    alignItems: 'center',        
    flexDirection: 'row',
    backgroundColor: 'white',    
    justifyContent: 'center',
  },
  total:{
    fontWeight: 'bold',    
    fontSize: 20,
  }
})

export default styles;