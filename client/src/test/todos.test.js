import puppeteer from "puppeteer";
import { faker } from "@faker-js/faker";

let browser;
let page;

const url = "http://localhost:3001";

jest.setTimeout(1000000);

beforeEach(async () => {
  browser = await puppeteer.launch({
    executablePath: process.env.CHROMIUM_PATH,
    args: ["--no-sandbox"],
  });
  page = await browser.newPage();
  await page.goto(url);
});

let username = "";
let password = "";
let email = "";

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(url);

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
  await page.screenshot({
    path: "./src/test/screenshots/register-screenshot.png",
  });

  browser.close();
});

afterEach(() => {
  browser.close();
});

let name, description;

const createToDo = async () => {
  await page.click(".createToDoButton");

  await page.waitForSelector(".toDoFormTitle");

  name = faker.name.jobArea();
  description = faker.name.jobTitle();

  await page.type(".toDoFormName", name);
  await page.type(".toDoFormDescription", description);

  await page.click(".toDoFormButton");
  await page.waitForTimeout(1000);
};

describe("todos dashboard", () => {
  beforeEach(async () => {
    await page.waitForSelector(".loginTitle");

    await page.type(".loginUsername", username);
    await page.type(".loginPassword", password);
    await page.click(".loginButton");

    await page.waitForSelector(".createToDoButton");
  });

  it("should open todo form modal when click create todo button", async () => {
    await page.click(".createToDoButton");

    await page.waitForSelector(".toDoFormTitle");
    await page.screenshot({
      path: "./src/test/screenshots/todoform-screenshot.png",
    });

    const title = await page.$eval(
      ".toDoFormTitle",
      (title) => title.innerText
    );
    expect(title).toBe("Create To Do");

    const buttonText = await page.$eval(
      ".toDoFormButton",
      (button) => button.innerText
    );
    expect(buttonText).toBe("Create");
  });

  it("should create a todo", async () => {
    await createToDo();

    await page.screenshot({
      path: "./src/test/screenshots/todos-screenshot.png",
    });

    const todoName = await page.$$eval(
      ".todo > div.p-4 > h3",
      (elements) => elements[0].innerText
    );
    const todoDescription = await page.$$eval(
      ".todo > div.p-4 > p",
      (elements) => elements[0].innerText
    );

    expect(todoName).toBe(name);
    expect(todoDescription).toBe(description);

    await page.click(
      ".todo > div.flex.w-full.justify-end.px-1.py-1 > button:nth-child(2)"
    );
    await page.waitForTimeout(1000);
  });

  it("should delete a todo", async () => {
    await createToDo();

    await page.click(
      ".todo > div.flex.w-full.justify-end.px-1.py-1 > button:nth-child(2)"
    );
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: "./src/test/screenshots/deletetodo-screenshot.png",
    });
    const todo = await page.$(".todo");

    expect(todo).toBe(null);
  });

  it("should update a todo", async () => {
    await createToDo();

    await page.click(
      ".todo > div.flex.w-full.justify-end.px-1.py-1 > button:nth-child(1)"
    );
    await page.waitForTimeout(1000);

    await page.waitForSelector(".toDoFormTitle");

    const newName = "updated name";
    const newDescription = "updated description";

    await page.$eval(".toDoFormName", (element) => (element.value = ""));
    await page.type(".toDoFormName", newName);
    await page.$eval(".toDoFormDescription", (element) => (element.value = ""));
    await page.type(".toDoFormDescription", newDescription);

    await page.waitForTimeout(1000);

    await page.click(".toDoFormButton");
    await page.waitForTimeout(5000);

    await page.screenshot({
      path: "./src/test/screenshots/updatetodolist-screenshot.png",
    });

    const todoName = await page.$eval(
      ".todo > div.p-4 > h3",
      (element) => element.innerText
    );
    const todoDescription = await page.$eval(
      ".todo > div.p-4 > p",
      (element) => element.innerText
    );

    expect(todoName).toBe(newName);
    expect(todoDescription).toBe(newDescription);
  });
});
