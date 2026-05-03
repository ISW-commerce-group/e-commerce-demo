"use client";

import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const router = useRouter();

    const [shipping, setShipping] = useState({
        name: "",
        phone: "",
        street: "",
        apartment: "",
    });

    const [payment, setPayment] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const handlePurchase = (e: React.FormEvent) => {
        e.preventDefault();
        clearCart();
        router.push("/thank-you");
    };

    return (
        <div className="container grid">

            {/* LEFT — forms */}
            <div className="grid-wrapper-left">
                <div className="content sticky-up_80px">
                    <div className="checkout-form">

                        {/* Step 1 — Shipping */}
                        <div className="checkout-step">
                            <h5 className="margin-bottom-24px">1 Shipping details</h5>
                            <div className="flex-vertical-stretch-gap_16px">
                                <input
                                    className="text-field w-input"
                                    placeholder="Recipient Name"
                                    type="text"
                                    id="recipient-name"
                                    value={shipping.name}
                                    onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                                />
                                <input
                                    className="text-field w-input"
                                    placeholder="Recipient Phone Number"
                                    type="tel"
                                    id="recipient-phone"
                                    value={shipping.phone}
                                    onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                                />
                                <div className="flex margin-bottom-24px">
                                    <input
                                        className="text-field w-input"
                                        placeholder="Street"
                                        type="text"
                                        id="street"
                                        value={shipping.street}
                                        onChange={(e) => setShipping({ ...shipping, street: e.target.value })}
                                    />
                                    <input
                                        className="text-field w-input"
                                        placeholder="Apartment Number"
                                        type="text"
                                        id="apartment"
                                        value={shipping.apartment}
                                        onChange={(e) => setShipping({ ...shipping, apartment: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2 — Payment */}
                        <div className="checkout-step">
                            <h5 className="margin-bottom-24px">2 Payment</h5>
                            <p className="margin-bottom-12px black-90">
                                Pay by card. Your payment is secure.
                            </p>
                            <form onSubmit={handlePurchase} className="flex-vertical-stretch-gap_16px">
                                <input
                                    className="text-field w-input"
                                    placeholder="Card Number"
                                    type="text"
                                    id="card-number"
                                    maxLength={19}
                                    value={payment.cardNumber}
                                    onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                                />
                                <div className="flex">
                                    <input
                                        className="text-field w-input"
                                        placeholder="MM/YY"
                                        type="text"
                                        id="card-expiry"
                                        maxLength={5}
                                        value={payment.expiry}
                                        onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                                    />
                                    <input
                                        className="text-field w-input"
                                        placeholder="CVV Code"
                                        type="text"
                                        id="card-cvv"
                                        maxLength={4}
                                        value={payment.cvv}
                                        onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                                    />
                                </div>
                                <div className="control-width-of-the-button margin-bottom-24px">
                                    <button type="submit" className="primary_button w-inline-block">
                                        <div className="wrap-button_text">
                                            <div className="button_text">Make purchase</div>
                                            <div className="button_text hide-mobile">Make purchase</div>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            {/* RIGHT — order summary */}
            <div className="grid-wrapper-right">
                <div className="content">
                    <div className="wrapper-overflow_hidden margin-bottom-24px">
                        <div className="overline">order summary</div>
                    </div>

                    {items.map(({ product, quantity }) => (
                        <div key={product.id} className="flex margin-bottom-24px">
                            <div style={{ width: 80, height: 80, flexShrink: 0, position: "relative" }}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="80px"
                                />
                            </div>
                            <div style={{ flex: 1, marginLeft: 12 }}>
                                <h6>{product.name}</h6>
                                <p className="caption-small text-gray">Quantity ({quantity})</p>
                            </div>
                            <div>
                                <h6>${product.price * quantity}</h6>
                            </div>
                        </div>
                    ))}

                    <div className="border-b margin-botton-64" />

                    <div className="flex margin-bottom-24px">
                        <p className="subtitle weight-regular text-gray" style={{ flex: 1 }}>
                            Delivery
                        </p>
                        <p className="subtitle weight-regular">Free</p>
                    </div>

                    <div className="flex">
                        <p className="subtitle" style={{ flex: 1 }}>Total</p>
                        <p className="subtitle">${totalPrice}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}