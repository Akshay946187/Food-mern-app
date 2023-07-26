import './App.css';
import Home from './screns/Home'
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Login from './screns/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screns/Signup';
import {CartProvider} from './components/ContextReduser'
import Cart from './screns/Cart';


function App() {

  return (
    <CartProvider>
    <Router>

      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/createuser' element={<Signup/>}></Route>
        
      </Routes>
    
      
    </Router>
    </CartProvider>
  );
}

export default App;


// mongoimport --uri mongodb+srv://aki748434:akshay@cluster0.ghlgpx1.mongodb.net/GoFood --collection food_items --jsonArray --file "C:\Users\aki74\Desktop\fsdReact\bolg\foodData2.json"