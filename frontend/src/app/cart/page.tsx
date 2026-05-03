"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <div className="container">
                <div className="content">
                    <div className="wrapper-overflow_hidden margin-bottom-24px">
                        <div className="overline">your cart</div>
                    </div>
                    <h1 className="margin-botton-64">Your cart is empty</h1>
                    <div className="control-width-of-the-button">
                        <Link href="/category" className="primary_button w-inline-block">
                            <div className="wrap-button_text">
                                <div className="button_text">Shop now</div>
                                <div className="button_text hide-mobile">Shop now</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container grid">

            {/* LEFT — cart items */}
            <div className="grid-wrapper-left">
                <div className="content">
                    <div className="wrapper-overflow_hidden margin-bottom-24px">
                        <div className="overline">your cart</div>
                    </div>
                    <h1 className="margin-botton-64">Shopping Cart</h1>

                    <div className="flex-vertical-stretch-gap_16px">
                        {items.map(({ product, quantity }) => (
                            <div key={product.id} className="flex margin-bottom-24px">

                                {/* Image */}
                                <div style={{ width: 100, height: 100, flexShrink: 0 }}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="img_100x100-fit_cover"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>

                                {/* Info */}
                                <div className="content" style={{ flex: 1, marginLeft: 16 }}>
                                    <h6>{product.name}</h6>
                                    <p className="subtitle weight-regular text-gray">
                                        ${product.price}
                                    </p>

                                    {/* Quantity controls */}
                                    <div className="display-flex_horizontal_center" style={{ gap: 12, marginTop: 8 }}>
                                        <button
                                            onClick={() => updateQuantity(product.id, quantity - 1)}
                                            className="menu-button-lower-desktop"
                                            aria-label="Decrease quantity"
                                        >
                                            −
                                        </button>
                                        <span className="subtitle weight-regular">{quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(product.id, quantity + 1)}
                                            className="menu-button-lower-desktop"
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Subtotal + remove */}
                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                    <p className="subtitle weight-regular">
                                        ${product.price * quantity}
                                    </p>
                                    <button
                                        onClick={() => removeFromCart(product.id)}
                                        className="caption-small text-gray"
                                        style={{ marginTop: 8, background: "none", border: "none", cursor: "pointer" }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-b margin-botton-64" />

                    <Link href="/category" className="caption-small text-gray">
                        ← Continue shopping
                    </Link>
                </div>
            </div>

            {/* RIGHT — order summary */}
            <div className="grid-wrapper-right">
                <div className="content sticky-up_80px">
                    <div className="wrapper-overflow_hidden margin-bottom-24px">
                        <div className="overline">order summary</div>
                    </div>

                    <div className="flex margin-bottom-24px">
                        <p className="subtitle weight-regular text-gray" style={{ flex: 1 }}>
                            Subtotal
                        </p>
                        <p className="subtitle weight-regular">${totalPrice}</p>
                    </div>

                    <div className="flex margin-bottom-24px">
                        <p className="subtitle weight-regular text-gray" style={{ flex: 1 }}>
                            Delivery
                        </p>
                        <p className="subtitle weight-regular">Free</p>
                    </div>

                    <div className="border-b margin-botton-64" />

                    <div className="flex margin-bottom-24px">
                        <p className="subtitle" style={{ flex: 1 }}>Total</p>
                        <p className="subtitle">${totalPrice}</p>
                    </div>

                    <div className="control-width-of-the-button">
                        <Link href="/checkout" className="primary_button w-inline-block">
                            <div className="wrap-button_text">
                                <div className="button_text">Proceed to checkout</div>
                                <div className="button_text hide-mobile">Proceed to checkout</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}