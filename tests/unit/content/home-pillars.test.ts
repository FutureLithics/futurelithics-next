import { describe, expect, it } from "vitest";
import { homePillars } from "@/app/content/home-pillars";
import { HOME_PILLAR_ICONS } from "@/app/content/home-pillar-icons";

describe("home-pillars content", () => {
  it("defines three home pillars", () => {
    expect(homePillars).toHaveLength(3);
  });

  it("requires core fields on every pillar", () => {
    for (const pillar of homePillars) {
      expect(pillar.id).toBeTruthy();
      expect(pillar.title).toBeTruthy();
      expect(pillar.body).toBeTruthy();
      expect(pillar.href.startsWith("/")).toBe(true);
      expect(pillar.linkLabel).toBeTruthy();
      expect(pillar.topics.length).toBeGreaterThanOrEqual(3);
      expect(HOME_PILLAR_ICONS).toContain(pillar.icon);
    }
  });

  it("uses unique ids and titles", () => {
    const ids = homePillars.map((pillar) => pillar.id);
    const titles = homePillars.map((pillar) => pillar.title);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("contains no em or en dashes in copy", () => {
    for (const pillar of homePillars) {
      const copy = `${pillar.title} ${pillar.body} ${pillar.linkLabel} ${pillar.topics.join(" ")}`;
      expect(copy).not.toMatch(/[—–]/);
    }
  });
});
