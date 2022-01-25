export const generateSearchCategories = (data) => {
  const categories = data.map((c) => ({
    id: c.significanceIndex,
    title: `${c.category.charAt(0).toUpperCase()}${c.category.slice(1)}`,
    value: c.category,
  }));

  const uniqueCategories = [
    ...new Map(
      categories.map((category) => [category["value"], category])
    ).values(),
  ];

  return uniqueCategories;
};
