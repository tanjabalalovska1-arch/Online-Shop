export const testProduct = {
  id: 101,
  title: "Olive Wood Board",
  price: 49.99,
  thumbnail: "/test-product.png",
  category: "kitchen-accessories",
};

export const testUser = {
  id: 1,
  name: "Test User",
  email: "test@example.com",
  password: "secret123",
};

export function seedAuthenticatedUser() {
  localStorage.setItem("olive-users", JSON.stringify([testUser]));
  localStorage.setItem(
    "olive-current-user",
    JSON.stringify({
      id: testUser.id,
      name: testUser.name,
      email: testUser.email,
    }),
  );
}
