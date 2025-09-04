import { Page } from "@playwright/test";
import BasePage from "./base-page";

export default class DocsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
}