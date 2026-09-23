import { describe, expect, it } from "vitest";
import { selectedWorkItems } from "@/app/content/selected-work";
import { SELECTED_WORK_ICONS } from "@/app/content/selected-work-icons";

describe("selected-work content", () => {
  it("defines four selected work items", () => {
    expect(selectedWorkItems).toHaveLength(4);
  });

  it("requires core fields on every item", () => {
    for (const item of selectedWorkItems) {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.body).toBeTruthy();
      expect(item.stacks.length).toBeGreaterThanOrEqual(2);
      expect(item.links.length).toBeGreaterThanOrEqual(1);
      expect(SELECTED_WORK_ICONS).toContain(item.icon);
    }
  });

  it("uses unique ids and titles", () => {
    const ids = selectedWorkItems.map((item) => item.id);
    const titles = selectedWorkItems.map((item) => item.title);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("contains no em or en dashes in copy", () => {
    for (const item of selectedWorkItems) {
      const copy = `${item.title} ${item.body} ${item.stacks.join(" ")} ${item.links.map((link) => link.label).join(" ")}`;
      expect(copy).not.toMatch(/[—–]/);
    }
  });
});
