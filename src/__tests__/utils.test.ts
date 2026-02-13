import { describe, it, expect } from "vitest";
import {
  cn,
  formatDate,
  formatRelativeTime,
  truncateText,
  slugify,
  calculateReadingTime,
  isDefined,
  getNestedValue,
} from "@/lib/utils";

describe("Utility Functions", () => {
  describe("cn", () => {
    it("merges class names correctly", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
    });

    it("handles conditional classes", () => {
      expect(cn("base", true && "conditional")).toBe("base conditional");
      expect(cn("base", false && "conditional")).toBe("base");
    });

    it("deduplicates conflicting tailwind classes", () => {
      expect(cn("px-4", "px-6")).toBe("px-6");
    });
  });

  describe("formatDate", () => {
    it("formats date string correctly", () => {
      const date = "2026-02-13";
      expect(formatDate(date)).toBe("February 13, 2026");
    });

    it("formats Date object correctly", () => {
      const date = new Date("2026-02-13");
      expect(formatDate(date)).toBe("February 13, 2026");
    });
  });

  describe("formatRelativeTime", () => {
    it("returns 'just now' for recent dates", () => {
      const now = new Date();
      expect(formatRelativeTime(now)).toBe("just now");
    });

    it("returns minutes ago for dates within the hour", () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      expect(formatRelativeTime(fiveMinutesAgo)).toBe("5 minutes ago");
    });
  });

  describe("truncateText", () => {
    it("returns original text if shorter than max length", () => {
      expect(truncateText("Hello", 10)).toBe("Hello");
    });

    it("truncates text and adds ellipsis", () => {
      expect(truncateText("Hello World", 5)).toBe("Hello...");
    });
  });

  describe("slugify", () => {
    it("converts text to slug", () => {
      expect(slugify("Hello World")).toBe("hello-world");
      expect(slugify("Test & Example")).toBe("test-example");
    });
  });

  describe("calculateReadingTime", () => {
    it("calculates reading time correctly", () => {
      const text = "word ".repeat(400); // 400 words
      expect(calculateReadingTime(text)).toBe(2);
    });

    it("returns at least 1 minute", () => {
      expect(calculateReadingTime("short")).toBe(1);
    });
  });

  describe("isDefined", () => {
    it("returns true for defined values", () => {
      expect(isDefined("value")).toBe(true);
      expect(isDefined(0)).toBe(true);
      expect(isDefined(false)).toBe(true);
    });

    it("returns false for null and undefined", () => {
      expect(isDefined(null)).toBe(false);
      expect(isDefined(undefined)).toBe(false);
    });
  });

  describe("getNestedValue", () => {
    it("gets nested value from object", () => {
      const obj = { a: { b: { c: "value" } } };
      expect(getNestedValue(obj, "a.b.c")).toBe("value");
    });

    it("returns default value for missing path", () => {
      const obj = { a: { b: {} } };
      expect(getNestedValue(obj, "a.b.c", "default")).toBe("default");
    });
  });
});