import Link from "next/link"
import { Product } from "@/types/product"

type Props = {
    product: Product
    }

    export default function ProductCard({ product }: Props) {
    return (
        <Link
        href={`/product/${product.slug}`}
        className="wrapper_link-card_product w-inline-block"
        >
        <div className="card-product">
            <div className="label">
            <h6>{product.name}</h6>

            <div className="display-flex_horizontal_center text-gray">
                <p className="margin-right-4px caption">Price</p>
                <p className="caption">${product.price}</p>
            </div>
            </div>

            <div className="card_img">
            <img
                src={product.image}
                alt={product.name}
                className="img_100x100-fit_cover"
            />
            </div>
        </div>
        </Link>
    )
}