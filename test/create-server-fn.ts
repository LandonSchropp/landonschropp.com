import { createServerFn } from "@tanstack/react-start";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// NOTE: This file mocks the createServerFn and createServerOnlyFn functions from @tanstack/react-start
// to pass through the underlying handler function. This is necessary because TanStack Start doesn't yet
// have a clear testing strategy for server functions.
//
// https://github.com/TanStack/router/discussions/2701

// Mock the virtual:book-covers module
vi.mock("virtual:book-covers", () => ({
  availableIsbns: new Set<number>(),
}));

type CreateServerFn = typeof createServerFn<"GET">;
type ServerFnBuilder = ReturnType<CreateServerFn>;

const mockServerFunctionBuider: ServerFnBuilder = vi.hoisted(() => {
  return {
    middleware: vi.fn(() => mockServerFunctionBuider),
    inputValidator: vi.fn(() => mockServerFunctionBuider),
    handler: vi.fn((func) => func),
  } as unknown as ServerFnBuilder;
});

const mockCreateServerFn: CreateServerFn = vi.hoisted(() => {
  return vi.fn(() => mockServerFunctionBuider);
});

const mockCreateServerOnlyFn = vi.hoisted(() => {
  return vi.fn((func: any) => func);
});

vi.mock("@tanstack/react-start", async (importOriginal) => {
  return {
    ...(await importOriginal()),
    createServerFn: mockCreateServerFn,
    createServerOnlyFn: mockCreateServerOnlyFn,
  };
});
