import Link from "next/link"
import { notFound } from "next/navigation"
import { products } from "@/data/products"
import { categories } from "@/data/categories"
import ProductCard from "@/components/ProductCard"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }))
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params

    const product = products.find((p) => p.slug === slug)

    if (!product) {
        notFound()
    }

    const category = categories.find((c) => c.slug === product.category)

    const relatedProducts = products.filter(
        (p) => p.category === product.category && p.id !== product.id
    )

    return (
        <div>
            <div className="container grid">
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
                            <p className="subtitle weight-regular">
                                ${product.price}
                            </p>
                        </div>
                        <div className="border-b margin-botton-64" />
                        {product.description && (
                            <div className="wrapper-overflow_hidden margin-botton-64">
                                <p className="black-90">{product.description}</p>
                            </div>
                        )}
                        <div className="control-width-of-the-button">
                            <a href="#" className="primary_button w-inline-block">
                                <div className="wrap-button_text">
                                    <div className="button_text">Add to cart</div>
                                    <div className="button_text hide-mobile">Add to cart</div>
                                </div>
                            </a>
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
    )
}