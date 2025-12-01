import { configure } from "@testing-library/dom";
import "@testing-library/jest-dom/vitest";

configure({ testIdAttribute: "data-test-id" });
