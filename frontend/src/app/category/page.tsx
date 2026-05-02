import CategoryCard from "@/components/CategoryCard"
import { categories } from "@/data/categories"

export default function AllCategoriesPage() {
    return (
        <div>
            <div className="container">
                <div className="content">
                    <h1>Shop</h1>
                </div>
            </div>
            <div className="container">
                <section className="shop_category">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className={
                                index % 2 === 0
                                    ? "grid-wrapper-right"
                                    : "grid-wrapper-left"
                            }
                        >
                            <CategoryCard
                                category={category}
                                invert={index % 2 !== 0}
                            />
                        </div>
                    ))}
                </section>
            </div>
        </div>
    )
}