import { mocked } from "ts-jest/utils";
import { getSession } from "next-auth/client";
import { render, screen } from "@testing-library/react";

import { getPrismicClient } from "../../services/prismic";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";

const post = {
  slug: "my-new-post",
  title: "My New Post",
  content: "<p>Post excerpt</p>",
  updatedAt: "29 de Dezembro"
}
jest.mock("next-auth/client")
jest.mock("../../services/prismic")

describe("Posts page", () => {
  it("renders correctly", () => {
    render(
      <Post post={post} />
    )

    expect(screen.getByText("My New Post")).toBeInTheDocument()
    expect(screen.getByText("Post excerpt")).toBeInTheDocument()
  })

  it("redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({
      params: {
        slug: "my-new-post"
      }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
        })
      })
    )
  })

  it("loads initial data", async () => {
    const getSessionMocked = mocked(getSession)
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: "heading", text: "My New Post" }
          ],
          content: [
            { type: "paragraph", text: "Post excerpt" }
          ],
        },
        last_publication_date: "12-29-2021"
      })
    } as any)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-active-subscription"
    })

    const response = await getServerSideProps({
      params: {
        slug: "my-new-post"
      }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: "My New Post",
            content: "<p>Post excerpt</p>",
            updatedAt: "29 de dezembro de 2021"
          }
        }
      })
    )
  })
})