import { expect, test } from "@playwright/test";

import { dismissChangelog } from "./helpers/dismiss-changelog";

// TODO: Test weapons/matrices, stats, gear persistence

test("add, rename, delete loadout", async ({ page }) => {
  await page.goto("/loadouts");
  await dismissChangelog(page);

  // Add
  await page.getByRole("tab", { name: "Add" }).click();
  await expect(
    page.getByRole("tab", { name: "flame-icon Custom Loadout 1" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Custom Loadout 1" }),
  ).toBeVisible();

  // Rename
  await page.getByLabel("edit-loadout-name").click();
  await page.locator(".MuiInputBase-input").first().click();
  await page
    .locator(".MuiInputBase-input")
    .first()
    .fill("Custom Loadout 1 edited");
  await page.locator(".MuiStack-root > button").first().click();
  await expect(
    page.getByRole("heading", { name: "Custom Loadout 1 edited" }),
  ).toBeVisible();

  // Delete
  await page.getByLabel("delete-loadout").click();
  await page.getByRole("button", { name: "Confirm" }).click();
  await expect(
    page.getByRole("tab", { name: "flame-icon Custom Loadout 1" }),
  ).not.toBeVisible();
});

test("loadout gear set stat summary", async ({ page }) => {
  await page.goto("/loadouts");
  await dismissChangelog(page);

  await page
    .getByTestId("Eyepiece")
    .getByLabel("Stat")
    .getByRole("combobox")
    .first()
    .click();
  await page.getByRole("option", { name: "HP", exact: true }).click();
  await page
    .getByTestId("Eyepiece")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .first()
    .click();
  await page
    .getByTestId("Eyepiece")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .first()
    .fill("4125");

  await page
    .getByTestId("Eyepiece")
    .getByLabel("Stat")
    .getByRole("combobox")
    .nth(1)
    .click();
  await page
    .getByRole("option", { name: "Volt Resistance %", exact: true })
    .click();
  await page
    .getByTestId("Eyepiece")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(1)
    .click();
  await page
    .getByTestId("Eyepiece")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(1)
    .fill("16.87%");

  await page
    .getByTestId("Eyepiece")
    .getByLabel("Stat")
    .getByRole("combobox")
    .nth(2)
    .click();
  await page.getByRole("option", { name: "Crit Rate %", exact: true }).click();
  await page
    .getByTestId("Eyepiece")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(2)
    .click();
  await page
    .getByTestId("Eyepiece")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(2)
    .fill("5.81%");

  await page
    .getByTestId("Eyepiece")
    .getByLabel("Stat")
    .getByRole("combobox")
    .nth(3)
    .click();
  await page
    .getByRole("option", { name: "Physical Attack", exact: true })
    .click();
  await page
    .getByTestId("Eyepiece")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(3)
    .click();
  await page
    .getByTestId("Eyepiece")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(3)
    .fill("69");

  await page
    .getByTestId("Gloves")
    .getByLabel("Stat")
    .getByRole("combobox")
    .first()
    .click();
  await page.getByRole("option", { name: "Crit", exact: true }).click();
  await page
    .getByTestId("Gloves")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .first()
    .click();
  await page
    .getByTestId("Gloves")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .first()
    .fill("3269");

  await page
    .getByTestId("Gloves")
    .getByLabel("Stat")
    .getByRole("combobox")
    .nth(1)
    .click();
  await page
    .getByRole("option", { name: "Frost Resistance", exact: true })
    .click();
  await page
    .getByTestId("Gloves")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(1)
    .click();
  await page
    .getByTestId("Gloves")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(1)
    .fill("1112");

  await page
    .getByTestId("Gloves")
    .getByLabel("Stat")
    .getByRole("combobox")
    .nth(2)
    .click();
  await page.getByRole("option", { name: "Flame Attack", exact: true }).click();
  await page
    .getByTestId("Gloves")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(2)
    .click();
  await page
    .getByTestId("Gloves")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(2)
    .fill("1090");

  await page
    .getByTestId("Gloves")
    .getByLabel("Stat")
    .getByRole("combobox")
    .nth(3)
    .click();
  await page.getByRole("option", { name: "Frost Attack", exact: true }).click();
  await page
    .getByTestId("Gloves")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(3)
    .click();
  await page
    .getByTestId("Gloves")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(3)
    .fill("1011");

  await page
    .getByTestId("Combat Engine")
    .getByLabel("Stat")
    .getByRole("combobox")
    .first()
    .click();
  await page
    .getByRole("option", { name: "Flame Damage %", exact: true })
    .click();
  await page
    .getByTestId("Combat Engine")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .first()
    .click();
  await page
    .getByTestId("Combat Engine")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .first()
    .fill("3.53%");

  await page
    .getByTestId("Combat Engine")
    .getByLabel("Stat")
    .getByRole("combobox")
    .nth(1)
    .click();
  await page
    .getByRole("option", { name: "Flame Attack %", exact: true })
    .click();
  await page
    .getByTestId("Combat Engine")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(1)
    .click();
  await page
    .getByTestId("Combat Engine")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(1)
    .fill("1.26%");

  await page
    .getByTestId("Combat Engine")
    .getByLabel("Stat")
    .getByRole("combobox")
    .nth(2)
    .click();
  await page
    .getByRole("option", { name: "Frost Resistance %", exact: true })
    .click();
  await page
    .getByTestId("Combat Engine")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(2)
    .click();
  await page
    .getByTestId("Combat Engine")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(2)
    .fill("16.87%");

  await page
    .getByTestId("Combat Engine")
    .getByLabel("Stat")
    .getByRole("combobox")
    .nth(3)
    .click();
  await page
    .getByRole("option", { name: "Physical Resistance", exact: true })
    .click();
  await page
    .getByTestId("Combat Engine")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(3)
    .click();
  await page
    .getByTestId("Combat Engine")
    .getByLabel("stat-value-input")
    .getByRole("textbox")
    .nth(3)
    .fill("215");

  await expect(
    await page.getByTestId("current-gear-set-stat-summary").textContent(),
  ).toMatchSnapshot();
});
