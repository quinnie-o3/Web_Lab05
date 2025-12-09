import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function Modal({ open, title = "Modal", children, onClose }) {
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    const modalRoot = document.body;
    modalRoot.appendChild(container);
    return () => {
      modalRoot.removeChild(container);
    };
  }, [container]);

  if (!open) return null;

  return createPortal(
    <div className="modal__backdrop">
      <div className="modal__content">
        <div className="modal__header">
          <h3>{title}</h3>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="modal__body">{children}</div>
        <button onClick={() => console.log("Button inside portal clicked")}>
          Portal Button
        </button>
      </div>
    </div>,
    container
  );
}
