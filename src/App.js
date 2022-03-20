import Header from "./Component/Layout/Header";
import Meals from './Component/Meals/Meals';
import Cart from './Component/Cart/Cart';
import CartProvider from './store/CartProvider';
import { useState } from 'react';

function App() {
  const [ cartIsShown, SetCartIsShown] = useState(false);

  const showCartHandler = () => {
    SetCartIsShown(true);
  }

  const hideCartHandler = () => {
    SetCartIsShown(false);
  }

  return (
    <CartProvider>
      { cartIsShown && <Cart onClose={hideCartHandler}/> }
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
