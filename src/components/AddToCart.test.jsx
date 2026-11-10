import { beforeEach, describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProductCard from "./ProductCard";
import Cart from "./Cart";
import { useCart } from "../context/CartContext.jsx";
import { seedAuthenticatedUser, testProduct } from "../test/fixtures";
import { renderWithProviders } from "../test/renderWithProviders";

function CartHarness() {
  const { addToCart } = useCart();

  return (
    <>
      <ProductCard
        product={testProduct}
        onAddToCart={addToCart}
        onSelectProduct={() => {}}
      />
      <section aria-label="Cart panel">
        <Cart />
      </section>
    </>
  );
}

describe("Add to cart", () => {
  beforeEach(() => {
    seedAuthenticatedUser();
  });

  it("adds a product to the cart and updates the quantity", async () => {
    const user = userEvent.setup();

    renderWithProviders(<CartHarness />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    const cartRegion = screen.getByRole("region", { name: "Cart panel" });

    expect(
      await within(cartRegion).findByRole("heading", {
        name: "Cart (1 items)",
      }),
    ).toBeInTheDocument();

    const cartList = within(cartRegion).getByRole("list");

    expect(within(cartList).getByText(testProduct.title)).toBeInTheDocument();
    expect(within(cartList).getByText("1")).toBeInTheDocument();
    expect(
      within(cartList).getAllByText(`$${testProduct.price}`),
    ).toHaveLength(2);
    expect(within(cartRegion).getByText("Total")).toBeInTheDocument();

    await user.click(within(cartRegion).getByRole("button", { name: "+" }));

    expect(within(cartList).getByText("2")).toBeInTheDocument();
    expect(
      within(cartList).getByText(`$${testProduct.price}`),
    ).toBeInTheDocument();
    expect(within(cartList).getByText("$99.98")).toBeInTheDocument();
  });
});
