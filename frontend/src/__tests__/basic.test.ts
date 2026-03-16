import { categories } from "../data/categories";

describe("categories data", () => {
  test("exports a non-empty category list", () => {
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  test("each category has valid required properties", () => {
    categories.forEach((category) => {
      expect(category.id).toBeDefined();
      expect(category.id.trim().length).toBeGreaterThan(0);
      expect(category.name).toBeDefined();
      expect(category.name.trim().length).toBeGreaterThan(0);
      expect(category.slug).toBeDefined();
      expect(category.slug.trim().length).toBeGreaterThan(0);
      expect(category.image).toBeDefined();
      expect(category.image.trim().length).toBeGreaterThan(0);
    });
  });
});
