import { notFound } from "next/navigation"
import { products } from "@/data/products"
import { categories } from "@/data/categories"
import ProductCard from "@/components/ProductCard"

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return categories.map((category) => ({
        slug: category.slug,
    }))
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params

    const category = categories.find((c) => c.slug === slug)

    if (!category) {
        notFound()
    }

    const filteredProducts = products.filter(
        (product) => product.category === slug
    )

    return (
        <div>
            <div className="container grid">
                <div className="grid-wrapper-left">
                    <div className="relative sticky-up_80px">
                        <div
                            className="hero_baground flex-vertical-center"
                            style={{ backgroundImage: `url(${category.image})` }}
                        >
                            <div className="content">
                                <h1 className="text-white z_index-1">
                                    {category.name}
                                </h1>
                            </div>
                        </div>
                        <div className="overlay_absolute"></div>
                    </div>
                </div>
                <div className="grid-wrapper-right">
                    {filteredProducts.length > 0 ? (
                        <div className="grid-wrapper-copy">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="content">
                            <p className="subtitle weight-regular">
                                No products available in this category yet.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}