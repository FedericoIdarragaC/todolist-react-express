import puppeteer from "puppeteer";
import { faker } from "@faker-js/faker";

let browser;
let page;

const url = "http://localhost:3001";

jest.setTimeout(1000000);

beforeEach(async () => {
  try {
    browser = await puppeteer.launch({
      executablePath: process.env.CHROMIUM_PATH,
      args: ["--no-sandbox"],
    });
    console.log(browser);
  } catch (error) {
    console.log(error);
  }
  page = await browser.newPage();
  await page.goto(url);
});

afterEach(() => {
  browser.close();
});

describe("Login page", () => {
  it("Contains a login form", async () => {
    await page.waitForSelector(".loginTitle");

    const username = await page.$$eval(
      ".loginUsername",
      (elements) => elements.length === 1
    );
    const password = await page.$$eval(
      ".loginPassword",
      (elements) => elements.length === 1
    );
    const button = await page.$$eval(
      ".loginButton",
      (elements) => elements.length === 1
    );

    expect(username).toBe(true);
    expect(password).toBe(true);
    expect(button).toBe(true);
  });

  it("it shows and error when username is not found", async () => {
    await page.waitForSelector(".loginTitle");

    await page.type(".loginUsername", "test-user");
    await page.type(".loginPassword", "test-password");
    await page.click(".loginButton");

    await page.waitForSelector(
      "#__react-alert__ > div > div:nth-child(1) > div > span"
    );
    const alertMessage = await page.$eval(
      "#__react-alert__ > div > div:nth-child(1) > div > span",
      (element) => element.innerText
    );

    expect(/USER WITH USERNAME \w+-\w+ NOT FOUND/.test(alertMessage)).toBe(
      true
    );
  });

  it("can login with existing username and password and redirect to dashboard", async () => {
    await page.waitForSelector(".loginTitle");
    const username = "fidarraga";

    await page.type(".loginUsername", username);
    await page.type(".loginPassword", "fede1234");
    await page.click(".loginButton");

    await page.waitForSelector(".sayhi");
    const sayHiMessage = await page.$eval(
      ".sayhi",
      (element) => element.innerText
    );

    const usernameFromMessage = sayHiMessage.match(/Hi, (\w+)/);
    expect(usernameFromMessage[1]).toStrictEqual(username);
  });
});

describe("Register page", () => {
  beforeEach(async () => {
    await page.goto(`${url}/register`);
  });

  it("container a register form", async () => {
    await page.waitForSelector(".registerTitle");

    const username = await page.$$eval(
      ".registerUsername",
      (elements) => elements.length === 1
    );
    const email = await page.$$eval(
      ".registerEmail",
      (elements) => elements.length === 1
    );
    const password = await page.$$eval(
      ".registerPassword",
      (elements) => elements.length === 1
    );
    const confirmPassword = await page.$$eval(
      ".registerConfirmPassword",
      (elements) => elements.length === 1
    );

    const button = await page.$$eval(
      ".registerButton",
      (elements) => elements.length === 1
    );

    expect(username).toBe(true);
    expect(email).toBe(true);
    expect(password).toBe(true);
    expect(confirmPassword).toBe(true);
    expect(button).toBe(true);
  });

  it("should disable register button if data is not correct", async () => {
    await page.waitForSelector(".registerTitle");

    const username = faker.internet.userName();
    const email = faker.random.alpha(8);
    const password = faker.internet.password();

    await page.type(".registerUsername", username);
    await page.type(".registerEmail", email);
    await page.type(".registerPassword", password);
    await page.type(".registerConfirmPassword", "");

    const disableButton = await page.$$eval(
      "button[disabled]",
      (elements) => elements.length === 1
    );

    expect(disableButton).toBe(true);
  });

  it("should register a user and redirect ro dashboard", async () => {
    await page.waitForSelector(".registerTitle");

    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await page.type(".registerUsername", username);
    await page.type(".registerEmail", email);
    await page.type(".registerPassword", password);
    await page.type(".registerConfirmPassword", password);

    await page.click(".registerButton");

    await page.waitForSelector(".sayhi");
    const sayHiMessage = await page.$eval(
      ".sayhi",
      (element) => element.innerText
    );

    const usernameFromMessage = sayHiMessage.match(/Hi, (\S+)/);
    expect(usernameFromMessage[1]).toStrictEqual(username);
  });
});

describe("logout", () => {
  let username, email, password;

  it("should logout after register a user", async () => {
    await page.goto(`${url}/register`);
    await page.waitForSelector(".registerTitle");

    username = faker.internet.userName();
    email = faker.internet.email();
    password = faker.internet.password();

    await page.type(".registerUsername", username);
    await page.type(".registerEmail", email);
    await page.type(".registerPassword", password);
    await page.type(".registerConfirmPassword", password);

    await page.click(".registerButton");

    await page.waitForSelector(".sayhi");

    await page.click(".logout");

    await page.waitForSelector(".loginTitle");

    const usernameField = await page.$$eval(
      ".loginUsername",
      (elements) => elements.length === 1
    );
    const passwordField = await page.$$eval(
      ".loginPassword",
      (elements) => elements.length === 1
    );
    const loginButton = await page.$$eval(
      ".loginButton",
      (elements) => elements.length === 1
    );

    await page.screenshot({
      path: "./src/test/screenshots/logout-screenshot.png",
    });

    expect(usernameField).toBe(true);
    expect(passwordField).toBe(true);
    expect(loginButton).toBe(true);
  });
});
