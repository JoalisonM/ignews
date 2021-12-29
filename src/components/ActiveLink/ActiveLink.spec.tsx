import { render, screen } from "@testing-library/react";

import ActiveLink from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      }
    }
  }
})

describe("ActiveLink component", () => {
  // test("active link renders correctly", () => {
  //   const { getByText } = render(
  //     <ActiveLink href="/" activeClassName="active">
  //       <a>Home</a>
  //     </ActiveLink>
  //   )

  //   expect(getByText("Home")).toBeInTheDocument()
  // })

  it("renders correctly", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )

    expect(screen.getByText("Home")).toBeInTheDocument()
  })

  // test("active link is receiving active class", () => {
  //   const { getByText } = render(
  //     <ActiveLink href="/" activeClassName="active">
  //       <a>Home</a>
  //     </ActiveLink>
  //   )

  //   expect(getByText("Home")).toHaveClass("active")
  // })

  it("adds active class is the link as currently active", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )

    expect(screen.getByText("Home")).toHaveClass("active")
  })
})