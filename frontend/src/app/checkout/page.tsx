import React from "react";
import Image from 'next/image';

export default function CheckoutPage() {
  return (
    <div className="container grid">
        <div className="grid-wrapper-left">
            <div className="content sticky-up_80px">
                <div className="checkout-form">
                    <div className="checkout-step">
                        <h5 className="margin-bottom-24px">1 Shipping details</h5>
                        <form id="email-form" name="email-form" data-name="Email Form" method="get" className="flex-vertical-stretch-gap_16px" data-wf-page-id="6400d829514500b4d3d1eb7f" data-wf-element-id="e224ee31-0292-9c87-8851-6edd6b8989ed">
                            <input className="text-field w-input" name="email-2" data-name="Email 2" placeholder="Recipient Name" type="email" id="email-2"/>
                            <input className="text-field w-input" name="email-2" data-name="Email 2" placeholder="Recipient Phone Number" type="email" id="email-2"/>
                            <div className="flex margin-bottom-24px">
                                <input className="text-field w-input" name="email-2" data-name="Email 2" placeholder="Street" type="email" id="email-2"/>
                                <input className="text-field w-input" name="email-2" data-name="Email 2" placeholder="Apartment Number" type="email" id="email-2"/>
                            </div>
                        </form>

                            
                         
                    </div>
                    <div className="checkout-step checkout-step--disabled">
                         <h5 className="margin-bottom-24px">2 Payment</h5>
                         <p className="margin-bottom-12px scroll?anim-text black-90 ">Pay by card. Your payment is secure.</p>
                         <form id="email-form" name="email-form" data-name="Email Form" method="get" className="flex-vertical-stretch-gap_16px" data-wf-page-id="6400d829514500b4d3d1eb7f" data-wf-element-id="e224ee31-0292-9c87-8851-6edd6b8989ed">
                            <input className="text-field w-input" name="email-2" data-name="Email 2" placeholder="Card Number" type="email" id="email-2"/>
                            <div className="flex">
                                <input className="text-field w-input" name="email-2" data-name="Email 2" placeholder="MM/YY" type="email" id="email-2"/>
                                <input className="text-field w-input" name="email-2" data-name="Email 2" placeholder="CVV Code" type="email" id="email-2"/>
                            </div>
                            <a data-w-id="e224ee31-0292-9c87-8851-6edd6b8989ef" href="#" className="margin-bottom-24px primary_button w-inline-block">
                                
                                <div className="wrap-button_text ">
                                    <div className="button_text">Make purchase</div>
                                    <div className="button_text hide-mobile">Make purchase</div>
                                </div>
                            </a>
                         </form>
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="grid-wrapper-right">
            <div className="content">
                <div className="wrapper-overflow_hidden margin-bottom-24px">
                    <div data-w-id="56a9b6ec-a780-a3e9-f83a-81986785e658" className="overline-scroll_animat overline">order summary</div>
                </div>
                <div className="flex">
                    
                    <div className="card-producto">
                        <div className="card-producto-image-container"> 
                            <img 
                            src="https://regalos.teleglobos.com.mx/cdn/shop/products/arreglo-floral-de-rosa-fucsia-lisianthus-crema-alstromelia-blanca-clavellina-rosada-y-aquilea-gi026-ponch-caprico-718039.jpg?v=1691635822.jpg" 
                            alt="Ramo de Flores Blancas y Verdes" 
                            className="border border-gray-200 rounded-sm p-4 bg-[#f9f9f9] max-w-[250px]"
                            />
                        </div>
                
                    </div>
                    <div>
                        <h6 className="margin-top-16px margin-top-24px">Snowfall</h6>
                        <p>Quantity (1)</p>
                    </div>

                    <div>
                        <h6 className="margin-top-16px margin-top-24px">$100</h6>
                    </div>
                
                </div>
                
                
            </div>
        </div>
    </div>
  );
}
