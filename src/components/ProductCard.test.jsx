import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProductCard from "./ProductCard";
import { testProduct } from "../test/fixtures";
import { renderWithProviders } from "../test/renderWithProviders";

describe("ProductCard", () => {
  it("renders the product details and actions", () => {
    renderWithProviders(
      <ProductCard
        product={testProduct}
        onAddToCart={vi.fn()}
        onSelectProduct={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: testProduct.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(`$${testProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText("Kitchen Accessories")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /view details/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to cart/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to favorites/i }),
    ).toBeInTheDocument();
  });

  it("passes the product to onSelectProduct", async () => {
    const user = userEvent.setup();
    const onSelectProduct = vi.fn();

    renderWithProviders(
      <ProductCard
        product={testProduct}
        onAddToCart={vi.fn()}
        onSelectProduct={onSelectProduct}
      />,
    );

    await user.click(screen.getByRole("button", { name: /view details/i }));

    expect(onSelectProduct).toHaveBeenCalledWith(testProduct);
  });
});
