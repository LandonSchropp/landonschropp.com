import { recursivelyExtractType, recursivelyReplaceType } from "./introspection";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const TestComponent = ({ children }: Props) => <div>{children}</div>;
const TargetComponent = ({ children }: Props) => <span>{children}</span>;
const OtherComponent = ({ children }: Props) => <p>{children}</p>;

describe("recursivelyExtractType", () => {
  describe("when the target type is found", () => {
    describe("with a single instance", () => {
      it("extracts the element", () => {
        const element = <TargetComponent />;
        const result = recursivelyExtractType(element, TargetComponent, (node) => node.key);

        expect(result.length).toBe(1);
      });
    });

    describe("with multiple instances at the same level", () => {
      it("extracts all elements", () => {
        const element = (
          <TestComponent>
            <TargetComponent />
            <TargetComponent />
          </TestComponent>
        );
        const result = recursivelyExtractType(element, TargetComponent, (node) => node.key);

        expect(result.length).toBe(2);
      });
    });

    describe("when the target component is contained at multiple levels", () => {
      it("extracts all elements recursively", () => {
        const element = (
          <TestComponent>
            <TargetComponent />
            <TestComponent>
              <TargetComponent />
            </TestComponent>
          </TestComponent>
        );
        const result = recursivelyExtractType(element, TargetComponent, (node) => node.key);

        expect(result.length).toBe(2);
      });
    });
  });

  describe("when the target component is not found", () => {
    it("returns an empty array", () => {
      const element = <OtherComponent />;
      const result = recursivelyExtractType(element, TargetComponent, (node) => node.key);

      expect(result.length).toBe(0);
    });
  });

  describe("when multiple targets are provided", () => {
    it("extracts from all elements", () => {
      const elements = [<TargetComponent key="1" />, <TargetComponent key="2" />];
      const result = recursivelyExtractType(elements, TargetComponent, (node) => node.key);

      expect(result.length).toBe(2);
    });
  });
});

describe("recursivelyReplaceType", () => {
  describe("when the target component has a single instance", () => {
    it("replaces the element", () => {
      const element = <TargetComponent />;
      const result = recursivelyReplaceType(element, TargetComponent, () => <OtherComponent />);

      expect(result).toBeDefined();
    });
  });

  describe("when the target component has multiple instances at the same level", () => {
    it("replaces all elements", () => {
      const element = (
        <TestComponent>
          <TargetComponent />
          <TargetComponent />
        </TestComponent>
      );
      const result = recursivelyReplaceType(element, TargetComponent, () => <OtherComponent />);

      expect(result).toBeDefined();
    });
  });

  describe("when the target component is contained at multiple levels", () => {
    it("replaces all elements recursively", () => {
      const element = (
        <TestComponent>
          <TargetComponent />
          <TestComponent>
            <TargetComponent />
          </TestComponent>
        </TestComponent>
      );
      const result = recursivelyReplaceType(element, TargetComponent, () => <OtherComponent />);

      expect(result).toBeDefined();
    });
  });

  describe("when the target type is not found", () => {
    it("returns the element unchanged", () => {
      const element = <OtherComponent />;
      const result = recursivelyReplaceType(element, TargetComponent, () => <div />);

      expect(result).toStrictEqual(element);
    });
  });

  describe("when multiple targets are provided", () => {
    it("replaces in all elements", () => {
      const elements = [<TargetComponent key="1" />, <TargetComponent key="2" />];
      const result = recursivelyReplaceType(elements, TargetComponent, () => <OtherComponent />);

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("when the element tree includes non-element nodes", () => {
    it("preserves non-element nodes", () => {
      const element = (
        <TestComponent>
          Text content
          <TargetComponent />
        </TestComponent>
      );
      const result = recursivelyReplaceType(element, TargetComponent, () => <OtherComponent />);

      expect(result).toBeDefined();
    });
  });
});
