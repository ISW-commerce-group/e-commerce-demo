import Link from "next/link"
import { Category } from "@/types/category"

type Props = {
    category: Category
    invert?: boolean
}

export default function CategoryCard({ category, invert }: Props) {
    const cardClass = invert
        ? "shop-card-category-invert"
        : "shop-card-category"

    return (
        <div className={cardClass}>
        {!invert && (
            <div className="card-category">
            <div className="content-card">
                <h3 className="align-center">{category.name}</h3>

                <Link
                href={`/category/${category.slug}`}
                className="link-icon-right w-inline-block"
                >
                <div className="weight-bold">Shop now</div>
                </Link>
            </div>
            </div>
        )}

        <Link
            href={`/category/${category.slug}`}
            className="card_category-img w-inline-block"
        >
            <div className="img_category-fix_height">
            <img
                src={category.image}
                alt={category.name}
                className="img_100x100-fit_cover"
            />
            </div>
        </Link>

        {invert && (
            <div className="card-category">
            <div className="content-card">
                <h3 className="align-center">{category.name}</h3>

                <Link
                href={`/category/${category.slug}`}
                className="link-icon-left w-inline-block"
                >
                <div className="weight-bold">Shop now</div>
                </Link>
            </div>
            </div>
        )}
        </div>
    )
}