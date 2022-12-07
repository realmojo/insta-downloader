const webdriver = require("selenium-webdriver");
const { By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");
const clipboardy = require("clipboardy");
const robotjs = require("robotjs");

const getWords = async () => {
  return new Promise((resolve) => {
    fs.readFile("word.txt", "utf8", function (err, data) {
      resolve(data.split("\n"));
    });
  });
};
const commentArr = [
  "사진이 참 멋지네요^^ 우리 소통하고 맞팔해요💕",
  "피드가 너무 멋져요😀 소통하고 맞팔해요💕",
  "사진 잘보고가요😀 소통하고 맞팔해요💕",
  "사진이 좋아요. 팔로우할까요^^💕?",
  "어머 너무 이쁘게 나왔어요^^ 소통하며 지내요💕",
  "멋진 사진이네요^^ 소통하면서 지내요💕",
  "피드 둘러보다가 댓글남겨요^^ 소통하고 맞팔해요💕",
  "사진이 참 영롱해요^^ 소통하면서 지내요💕",
  "좋은 사진이네요^^ 소통하면서 지내요💕",
  "휴식이 필요할 땐 서리공방을 들러주세요^^💕",
];

const getRandomInt = (min, max) => {
  //min ~ max 사이의 임의의 정수 반환
  return Math.floor(Math.random() * (max - min)) + min;
};

const run = async () => {
  const words = await getWords();
  if (words.length === 1 && words[0] === "") {
    console.log("word 파일에 단어를 적어주세요");
    return;
  }

  // // 1. chromedriver 경로 설정 // chromedriver가 있는 경로를 입력
  const service = new chrome.ServiceBuilder("./chromedriver").build();
  chrome.setDefaultService(service);

  // // 2. chrome 브라우저 빌드
  const driver = await new webdriver.Builder().forBrowser("chrome").build();

  console.log("인스타그램을 엽니다.");
  await driver.get("https://instagram.com");
  await driver.sleep(3000);
  // if (a % 3 === 2) {
  //   let waitminute = getRandomInt(10, 15);
  //   console.log(`3번을 실행해서 ${waitminute}분간 대기합니다.`);
  //   await driver.sleep(1000 * 60 * waitminute);
  // }

  console.log("로그인을 합니다.");
  const loginInput = await driver.findElement(By.name("username"));
  await driver.sleep(1000);
  loginInput.click();
  await driver.sleep(1000);
  await loginInput.sendKeys("mbtilovetest");
  await driver.sleep(1000);

  const passwordInput = await driver.findElement(By.name("password"));
  await driver.sleep(1000);
  passwordInput.click();
  await driver.sleep(1000);
  await passwordInput.sendKeys("wjdaksrud!@34");
  await driver.sleep(1000);

  const submit = await driver.findElement(
    By.xpath("//*[@id='loginForm']/div/div[3]/button")
  );
  await driver.sleep(1000);
  submit.click();
  await driver.sleep(5000);

  console.log("인스타그램을 태그검색을 합니다.");

  for (let a = 0; a < words.length; a++) {
    await driver.get(`https://www.instagram.com/explore/tags/${words[a]}/`);
    console.log(`${words[a]} 단어를 검색 후 20초 기다립니다.`);
    await driver.sleep(20000);

    let count = 0;

    console.log("일반게시물 좋아요를 실행합니다.");
    count = 0;

    let post = await driver.findElement(
      By.xpath(
        `//*[@id="react-root"]/section/main/article/div[2]/div/div[1]/div[1]/a`
      )
    );
    await driver.sleep(1000);
    post.click();
    await driver.sleep(5000);

    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 3; j++) {
        console.log(`${++count}번째 게시물 좋아요를 실행합니다.`);

        // try {
        //   let isMine = await driver
        //     .findElement(
        //       By.xpath(
        //         "/html/body/div[6]/div[2]/div/article/header/div[2]/div[1]/div/span/a"
        //       )
        //     )
        //     .getText();
        //   await driver.sleep(1000);
        //   if (isMine === "mbtilovetest") {
        //     console.log("본인의 게시물은 작업하지 않습니다.");
        //     await driver.sleep(1000);

        //     let closeBtn = await driver.findElement(
        //       By.xpath("/html/body/div[6]/div[3]/button")
        //     );
        //     await driver.sleep(1000);
        //     closeBtn.click();
        //     await driver.sleep(10000);
        //     continue;
        //   }
        // } catch {
        //   console.log("오류가나서 게시물을 닫습니다.1");
        //   await driver.sleep(1000);
        //   let closeBtn = await driver.findElement(
        //     By.xpath("/html/body/div[6]/div[3]/button")
        //   );
        //   await driver.sleep(1000);
        //   closeBtn.click();
        //   await driver.sleep(10000);
        //   continue;
        // }

        try {
          let likeBtn = await driver.findElement(
            By.xpath(
              "/html/body/div[6]/div[2]/div/article/div/div[2]/div/div/div[2]/section[1]/span[1]/button"
            )
          );
          await driver.sleep(1000);
          likeBtn.click();
          await driver.sleep(3000);
        } catch {
          console.log("오류가나서 게시물을 닫습니다.2");
          let closeBtn = await driver.findElement(
            By.xpath("/html/body/div[6]/div[3]/button")
          );
          await driver.sleep(1000);
          closeBtn.click();
          await driver.sleep(10000);
          continue;
        }

        try {
          console.log(`다음으로 넘어갑니다.`);
          let nextBtn = await driver.findElement(
            By.xpath("/html/body/div[6]/div[1]/div/div/div[2]/button")
          );
          await driver.sleep(1000);
          nextBtn.click();
          await driver.sleep(3000);
        } catch {
          console.log("오류가나서 게시물을 닫습니다.2");
          let closeBtn = await driver.findElement(
            By.xpath("/html/body/div[6]/div[3]/button")
          );
          await driver.sleep(1000);
          closeBtn.click();
          await driver.sleep(10000);
          continue;
        }

        // 랜덤으로 쉬는시간 조정
        const randomNumber = getRandomInt(1, 10);
        console.log(`${randomNumber}초 쉽니다.`);
        await driver.sleep(randomNumber * 1000);

        // if (count % 10 === 1) {
        //   console.log(`${count}번째 게시물이라서 댓글을 등록합니다.`);
        //   try {
        //     let commentTextarea = await driver.findElement(
        //       By.xpath(
        //         "/html/body/div[6]/div[2]/div/article/div[3]/section[3]/div/form/textarea"
        //       )
        //     );
        //     let randomNumber = getRandomInt(0, 10);
        //     console.log(commentArr[randomNumber], "댓글을 등록합니다.");
        //     clipboardy.writeSync(commentArr[randomNumber]);

        //     await driver.sleep(1000);
        //     commentTextarea.click();
        //     await driver.sleep(1000);
        //     robotjs.keyTap("v", "control");
        //     await driver.sleep(1000);
        //     console.log("댓글을 등록합니다.");
        //     let commentBtn = await driver.findElement(
        //       By.xpath(
        //         "/html/body/div[6]/div[2]/div/article/div[3]/section[3]/div[1]/form/button[2]"
        //       )
        //     );
        //     await driver.sleep(1000);
        //     commentBtn.click();
        //     await driver.sleep(10000);
        //   } catch {
        //     console.log("댓글을 등록할 수 없으므로 잠시 대기합니다.");
        //     await driver.sleep(3000);
        //   }
        // }

        // console.log("게시물을 닫습니다.");
        // let closeBtn = await driver.findElement(
        //   By.xpath("/html/body/div[6]/div[3]/button")
        // );
        // await driver.sleep(1000);
        // closeBtn.click();
        // await driver.sleep(10000);
      }
    }
    console.log(`${word} 단어가 끝났습니다. 다음단어로 넘어갑니다..`);
    await driver.sleep(5000);

    // console.log("브라우저를 종료합니다. 10 seconds waits...");
    // await driver.quit();
  }
  // 4. 3초 후에 브라우저 종료
  // setTimeout(async () => {
  //   process.exit(0);
  // }, 100000);
};

run();
