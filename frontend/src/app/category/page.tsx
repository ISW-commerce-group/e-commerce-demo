
import { products } from "@/data/products"
import ProductCard from "@/components/ProductCard"

type Props = {
    params: {
        slug: string
    }
    }

export default function CategoryPage({ params }: Props) {
    const filteredProducts = products.filter(
        (product) => product.category === params.slug
    )

    return (
        <div>
        <div className="container grid">

            {/* HERO LEFT */}

            <div className="grid-wrapper-left">
            <div className="relative sticky-up_80px">
                <div
                className="hero_baground flex-vertical-center"
                style={{
                    backgroundImage:
                    "url(https://cdn.prod.website-files.com/6400d82951450087c6d1eba8/643432f353b60dfd4b4ecece_flowers.webp)",
                }}
                >
                <div className="content">
                    <h1 className="text-white z_index-1">
                    {params.slug.replace("-", " ")}
                    </h1>
                </div>
                </div>

                <div className="overlay_absolute"></div>
            </div>
            </div>

            {/* PRODUCTS RIGHT */}

            <div className="grid-wrapper-right">
            <div className="grid-wrapper-copy">
                {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
            </div>

        </div>
        </div>
    )
}