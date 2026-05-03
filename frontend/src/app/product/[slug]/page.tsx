"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

type Props = {
    readonly params: Promise<{ slug: string }>;
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
            <div className="container grid">
                <div className="grid-wrapper-left">
                    <div className="relative sticky-up_80px">
                        <div className="img_category-fix_height" style={{position:"relative"}}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                style={{objectFit:"cover"}}
                                sizes="(max-width: 991px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid-wrapper-right">
                    <div className="content">
                        <div className="wrapper-overflow_hidden margin-bottom-24px">
                            <div className="overline">
                                <Link href="/category" className="text-gray">Shop</Link>
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

                        <div className="wrapper-overflow_hidden margin-botton-16">
                            <h1>{product.name}</h1>
                        </div>

                        <div className="wrapper-overflow_hidden margin-bottom-24px">
                            <p className="subtitle weight-regular">${product.price}</p>
                        </div>

                        <div className="border-b margin-botton-64" />

                        {product.description && (
                            <div className="wrapper-overflow_hidden margin-botton-64">
                                <p className="black-90">{product.description}</p>
                            </div>
                        )}

                        <div className="wrapper-overflow_hidden margin-bottom-24px">
                            <p className="caption-small text-gray">
                                Same-day delivery available &middot; Delivered personally, without boxes
                            </p>
                        </div>

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