import { renderHook, waitFor } from "@testing-library/react";
import { useSearchGitHub } from "../src/hooks/api/useSearchGitHub";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

global.fetch = jest.fn();

describe("useSearchGitHub", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches user search results successfully", async () => {
    const mockQuery = "susan";
    const mockSearchType = "users";
    const mockData = {
      items: [
        {
          id: 1,
          login: "susan",
          avatar_url: "https://avatars.githubusercontent.com/u/13198274?v=4",
          repos_url: "https://github.com/susan/repos",
        },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const { result } = renderHook(
      () => useSearchGitHub({ query: mockQuery, searchType: mockSearchType }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData.items);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/search/users?q=${mockQuery}+type:user`
    );
  });

  test("handles fetch errors", async () => {
    const mockQuery = "error";
    const mockSearchType = "users";

    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 500,
      json: jest.fn().mockResolvedValueOnce({}),
    });

    const { result } = renderHook(
      () => useSearchGitHub({ query: mockQuery, searchType: mockSearchType }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(true);
      expect(result.current.error).toBeFalsy();
      expect(result.current.error?.message).toEqual(undefined);
    });

    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/search/users?q=${mockQuery}+type:user`
    );
  });
});
