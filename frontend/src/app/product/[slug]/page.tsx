"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

type Props = {
    params: Promise<{ slug: string }>;
};

export default function ProductPage({ params }: Props) {
    const { slug } = use(params);
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const product = products.find((p) => p.slug === slug);
    if (!product) notFound();

    const category = categories.find((c) => c.slug === product.category);
    const relatedProducts = products.filter(
        (p) => p.category === product.category && p.id !== product.id
    );

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div>
            {/* ── PRODUCT MAIN ── */}
            <div className="container grid">

                {/* LEFT — image */}
                <div className="grid-wrapper-left">
                    <div className="relative sticky-up_80px">
                        <div className="img_category-fix_height">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="img_100x100-fit_cover"
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT — info */}
                <div className="grid-wrapper-right">
                    <div className="content">

                        {/* Breadcrumb */}
                        <div className="wrapper-overflow_hidden margin-bottom-24px">
                            <div className="overline">
                                <Link href="/category" className="text-gray">
                                    Shop
                                </Link>
                                {category && (
                                    <>
                                        {" / "}
                                        <Link href={`/category/${category.slug}`} className="text-gray">
                                            {category.name}
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Name */}
                        <div className="wrapper-overflow_hidden margin-botton-16">
                            <h1>{product.name}</h1>
                        </div>

                        {/* Price */}
                        <div className="wrapper-overflow_hidden margin-bottom-24px">
                            <p className="subtitle weight-regular">
                                ${product.price}
                            </p>
                        </div>

                        <div className="border-b margin-botton-64" />

                        {/* Description */}
                        {product.description && (
                            <div className="wrapper-overflow_hidden margin-botton-64">
                                <p className="black-90">{product.description}</p>
                            </div>
                        )}

                        {/* Delivery note */}
                        <div className="wrapper-overflow_hidden margin-bottom-24px">
                            <p className="caption-small text-gray">
                                Same-day delivery available · Delivered personally, without boxes
                            </p>
                        </div>

                        {/* Add to cart button */}
                        <div className="control-width-of-the-button">
                            <button
                                onClick={handleAddToCart}
                                className="primary_button w-inline-block"
                                style={{ width: "100%", cursor: "pointer" }}
                            >
                                <div className="wrap-button_text">
                                    <div className="button_text">
                                        {added ? "Added! ✓" : "Add to cart"}
                                    </div>
                                    <div className="button_text hide-mobile">
                                        {added ? "Added! ✓" : "Add to cart"}
                                    </div>
                                </div>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* ── RELATED PRODUCTS ── */}
            {relatedProducts.length > 0 && (
                <div>
                    <div className="container">
                        <div className="content">
                            <div className="wrapper-overflow_hidden margin-bottom-24px">
                                <div className="overline">you may also like</div>
                            </div>
                            <h2>Related products</h2>
                        </div>
                    </div>
                    <div className="container">
                        <div className="grid-wrapper-copy">
                            {relatedProducts.map((related) => (
                                <ProductCard key={related.id} product={related} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}