const request = require("request");
const fs = require("fs");
const webdriver = require("selenium-webdriver");
const { By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const download = (uri, filename, callback) => {
  const requestOptions = {
    method: "get",
    uri,
    headers: { "User-Agent": "Mozilla/5.0" },
    endocing: null,
  };

  request(requestOptions).pipe(fs.createWriteStream(filename));
};

const run = async () => {
  // const nChrome = new chrome;

  const chromeOptions = new chrome.Options();
  chromeOptions.debuggerAddress("127.0.0.1:9222");
  // const service = nChrome.ServiceBuilder("./chromedriver").build();
  // chrome.setDefaultService(service);
  const driver = await new webdriver.Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
  console.log("start");
  await driver.get(
    "https://namu.wiki/w/%EB%B6%84%EB%A5%98:%EA%B0%80%EC%88%98%20%EC%B6%9C%EC%8B%A0%20%EB%B0%B0%EC%9A%B0"
  );
  await driver.sleep(2000);

  const items = await driver.findElements(
    By.css("#category-문서 .rB8CZwJL li > a")
  );

  const urls = [];
  console.log("url 정보를 가져옵니다.");
  for (const item of items) {
    const name = await item.getText();
    const url = await item.getAttribute("href");
    if (name) {
      console.log(name, url);
      urls.push({ name, url });
    }
  }
  console.log("url 정보를 가져왔습니다.");
  console.log("---- 사이트를 이동합니다. ----");
  await driver.sleep(2000);

  for (const item of urls) {
    console.log(`${item.name} / ${item.url} 이동합니다.`);
    await driver.get(item.url);
    await driver.sleep(1000);

    try {
      const imgUrl = await driver.findElement(
        By.css(
          ".CZ7b0tvq > table > tbody > tr:nth-child(2) > td > div > div > a > span > span > img._16IXkoq8"
        )
      );
      title = await driver.findElement(By.css(".yiGvNSbm"));
      console.log(await title.getText());
      if (title) {
        const src = await imgUrl.getAttribute("src");
        download(src, `${item.name}.png`, () => {
          console.log(`${item.name}.png done`);
        });
      }
    } catch (e) {
      console.log(`${item.name} 없어서 넘어갑니다.`);
    }

    await driver.sleep(1000);
  }

  console.log("크롤링이 끝납니다.");

  // CZ7b0tvq
  await driver.quit();
};

run();
