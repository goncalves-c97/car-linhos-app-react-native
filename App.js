
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from './Views/Home/index';
import Products from './Views/Products/index';
import MainMenu from './Views/MainMenu/index';
import Login from './Views/Login/index';
import Register from './Views/Register/index';
import AddEditProduct from './Views/AddEditProduct/index';

/*
expo install react-navigation  
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view 
*/

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    Products,
    MainMenu,
    Login,
    Register,
    AddEditProduct
  })
);


export default function App() {
  return (
      <Routes/>      
  );
}

