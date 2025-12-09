import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart, removeItem, selectCart, selectCartTax } from "./store";

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Headphones", price: 150 },
  { id: 3, name: "Mouse", price: 50 },
];

export default function Cart() {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector(selectCart);
  const tax = useSelector(selectCartTax);

  return (
    <div className="cart">
      <h3>Products</h3>
      <div className="cart__products">
        {products.map((product) => (
          <div key={product.id} className="cart__product">
            <div>
              <strong>{product.name}</strong>
              <p>${product.price}</p>
            </div>
            <div className="cart__actions">
              <button onClick={() => dispatch(addItem(product))}>Add</button>
              <button onClick={() => dispatch(removeItem({ id: product.id }))}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3>Cart</h3>
      {items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <ul className="cart__list">
          {items.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} — ${item.price * item.quantity}
            </li>
          ))}
        </ul>
      )}

      <div className="cart__totals">
        <p>
          <strong>Subtotal:</strong> ${totalAmount.toFixed(2)}
        </p>
        <p>
          <strong>Tax (10%):</strong> ${tax.toFixed(2)}
        </p>
        <p>
          <strong>Total w/ Tax:</strong> ${(totalAmount + tax).toFixed(2)}
        </p>
      </div>

      <button onClick={() => dispatch(clearCart())} disabled={items.length === 0}>
        Clear Cart
      </button>
    </div>
  );
}
