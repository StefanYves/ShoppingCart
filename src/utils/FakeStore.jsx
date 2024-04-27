import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CartPage from "../components/CartPage";

const FakeStore = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };
  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    async function getCategories() {
      const response = await fetch(
        "https://fakestoreapi.com/products/category/jewelery",
        {
          mode: "cors",
        }
      );
      try {
        if (response.ok) {
          const allProducts = await response.json();
          if (allProducts) {
            setMyProducts(allProducts);
          } else {
            throw new Error();
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    getCategories();
  }, []);

  return (
    <div className="relative h-screen overflow-y-hidden">
      <nav className="bg-cyan-500 p-4 w-full rounded-full">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">FakeStore</h1>
          <button
            className="flex select-none border-none items-center gap-3 rounded-lg bg-gradient-to-tr from-cyan-500 to-pink-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={toggleCart}
          >
            <img
              className="w-10 mr-2"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACUElEQVR4nO2ZPWtUQRSGn9WAEsS0foUQNRo/QCTY5A8YCaKVnaCSqBERCQh2VoKNjQgWFhqMJhJEghEri5hSrGwUAgG/BRcNgkXErBx4L1wk7JJ1ztw7kAem2b3znvMus3PPmYEVykc/8AGo1RnfgRfACaBCSfnYwMS/Y7SsZt7nkny3xPeW9CZgEPip545TQg7JjJnoa/DsaRl5ReKsAb7JzC4SZ1RGhkicQRkZJ3F2yMjXsu5ezWzZ3STOAxk5S+KckZExEqdbRj6v/E9KxPgyazSPMRPCyFAJjMyGMLI79z+JzV3FvhJCzF6GXyS4k3isUxW+CGwNJTohI1YVx+KUYj4PKXpeoveJx4xHT7RXop+IQ5eW1DzQGlK4ouKxpiDeXFWs2x7ijyQ+gC+r1MVarF6PABckfg9fDirOW6+yaJ8CWN8fo5K47BWgkuvjtznFaAN+AX+Adhx5LCO2x3twTvrPcOaiAo046b+U/jGc2V/ngO9/2SPtKrCWCFtjVQE7A2tfl+5NIjGpgHbQHYoWVdem20MkhhXwTkDNI9J8TUR6FHTOYTccJiKrdY8Sugv8DWwgMk8Cm1gEblAAl5TALRLngIy8IXFa1PTUdMuVNJMycpLEGZCRaRJnfa5cuQZ0aGtOkqPAQsBteLpIM4cDGlkANhZlZERJ2Etys8ZUg3uVsTpz7BK2ELKq1ZLJaM/1FktRrTPnBwWRvU+2LCOp+SbmuJOdd00pMRtP9dlEwDlRrrGz05X8sOWzPeAcYmBr/aGWjA37VRsl1Mwc/gIXmFSH9pqNAQAAAABJRU5ErkJggg=="
            />{" "}
            <p>({totalItemsInCart})</p>
          </button>
        </div>
      </nav>
      {showCart && (
        <div
          className="fixed top-0 right-0 h-full w-full bg-black bg-opacity-50 z-40"
          onClick={toggleCart}
        ></div>
      )}
      {showCart && (
        <div className="fixed top-0 right-0 h-full w-1/6 bg-white z-50">
          <CartPage
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        </div>
      )}
      <div className="grid gap-5 grid-cols-4 grid-rows-5">
        {myProducts.map((product, index) => (
          <div
            key={index}
            className=" w-auto mt-10 flex items-center justify-center border"
          >
            <ProductCard
              key={index}
              id={product.id}
              price={product.price}
              title={product.title}
              image={product.image}
              addToCart={addToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FakeStore;
