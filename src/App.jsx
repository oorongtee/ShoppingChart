import {data} from './Data.jsx' 
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);


  //從data中找到符合productId的商品，並將其加入購物車
  //如果購物車中已經有這個商品，則不加入購物車
  //如果購物車中沒有這個商品，則將商品加入購物車
  //先尋找商品id相符，再將該商品丟到購物車裡
  const handleAddProduct = (productId) => {
    const productInCart = cart.find(item => item.product.id === productId);
    if (!productInCart) {
      const productToAdd = data.find(product => product.id === productId);
      setCart([...cart, { product: productToAdd, quantity: 1 }]);
    }
  }

  //增加購物車內某一商品：將購物車裡面符合id的商品，數量+1
  const handleIncreaseQuantity = (productId) => {
    setCart(cart.map(item => item.product.id === productId ? {...item, quantity: item.quantity + 1} : item));
  }

  //減少購物車內某一商品：將購物車裡面符合id的商品，數量-1。如果數量==0，則要刪除該商品
  //要不斷更新為新的購物車，所以要設定舊的狀態與新的狀態
  const handleDecreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const productIndex = newCart.findIndex(item => item.product.id === productId);
      if (newCart[productIndex].quantity === 0) {
        newCart.splice(productIndex, 1);
      }
      return newCart;
    });
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);


  return (
<div className="App">
{/*Header*/}
  <header className="bg-sky-800 text-white">
    <div className="px-6 py-3 flex flex-col md:flex-row justify-between text-center container mx-auto">
      <div>
        <a href="https://www.ubereats.com/tw/" className="text-2xl font-bold text-emerald-300">Uber eat 真棒!!!</a>
      </div>
      <div className="flex flex-col md:flex-row">
    
        <button className="rounded border border-black bg-teal-400 px-12 py-3 text-lg text-black hover:bg-transparent hover:text-indigo-600" onClick={() => handleAddProduct(data[0].id)}>紅柚翡翠</button>
        <button className="rounded border border-black bg-teal-400 px-12 py-3 text-lg text-black hover:bg-transparent hover:text-indigo-600" onClick={() => handleAddProduct(data[1].id)}>蘋果紅萱</button>
        <button className="rounded border border-black bg-teal-400 px-12 py-3 text-lg text-black hover:bg-transparent hover:text-indigo-600" onClick={() => handleAddProduct(data[2].id)}>龜記濃乳茶</button>
      </div>
    </div>
  </header>

{/*店家名稱*/}
  <div className="px-6 py-3 flex flex-col md:flex-row justify-between text-center container mx-auto">
    <div>
      <p href="#" className="text-2xl font-bold text-black-300">龜記茗品-內湖康寧店</p>
    </div>
  </div>
  
{/*商品*/}
  {cart.map((item, index) => (
        <div key={index} className="flex justify-center items-center">
          <div className="m-4 w-3/5 rounded-lg shadow-lg flex">
            <div className="w-1/3">
              <img src={item.product.url} className="rounded-t-lg object-cover h-full w-full"/>
            </div>

            <div className="p-4 w-1/3 text-center">
              <p className="text-5xl">{item.product.title}</p>
              <p className="mt-2 text-xl">{item.product.description}</p>
              <p className="mt-2 text-sm">${item.product.price}</p>
            </div>

            <div className="mt-4 flex justify-end p-4 w-1/3 items-center">
              <button type="button" className="rounded-lg bg-blue-700 w-10 h-10 text-white hover:bg-blue-200 hover:text-blue-700 flex items-center justify-center" onClick={() => handleIncreaseQuantity(item.product.id)}>+</button>
              <p className="mt-2 text-xl w-10 h-10 flex items-center justify-center">{item.quantity}</p>
              <button type="button" className="rounded-lg bg-blue-700 w-10 h-10 text-white hover:bg-blue-200 hover:text-blue-700 flex items-center justify-center" onClick={() => handleDecreaseQuantity(item.product.id)}>-</button>
            </div>
          </div>
        </div>
      ))}


{/*Total prize*/}
    <div className="px-6 py-3 flex flex-col md:flex-row justify-between text-center container mx-auto">
      <div>
        <p href="#" className="text-2xl font-bold text-emerald-300">小記</p>
      </div>
      <div className="flex flex-col md:flex-row">
        <p className="text-xl">{total}</p>
      </div>
    </div>
</div>
  )
}

export default App
