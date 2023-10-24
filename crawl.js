const db = require("./db");
const cheerio = require("cheerio");
const axios = require("axios");

async function crawl() {
  for (let year = 2000; year <= 2040; year++) {
    const reponse = await axios.get(
      `https://www.timeanddate.com/holidays/brazil/${year}`
    );
    const htmlString = await reponse.data;
    const $ = cheerio.load(htmlString);
    const table = $("table#holidays-table");
    const trs = $(table).find("tr");
    trs.each((trIndex, tr) => {
      if ($(tr).find("td:last").text()) {
        const date = $(tr).find("th:first").text();
        const holidayDate = `${year}-${renderMonth(
          date.slice(3, date.length)
        )}-${date.slice(0, 2)}`;
        const dayOfWeek = renderDayOfWeek($(tr).find("td:first").text());
        const holidayName = $(tr).find("a").text();
        const type = $(tr).find("td:last").text();
        const insertStatement = `INSERT INTO holidays (holidayDate, dayOfWeek, holidayName, type) VALUES ("${holidayDate}", "${dayOfWeek}", "${holidayName}", "${type}")`;
        db.query(insertStatement, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`${holidayDate} inserted`);
          }
        });
      }
    });
  }
}

function renderMonth(vietnameseMonth) {
  switch (vietnameseMonth) {
    case "Tháng một":
      return 1;
    case "Tháng hai":
      return 2;
    case "Tháng ba":
      return 3;
    case "Tháng tư":
      return 4;
    case "Tháng năm":
      return 5;
    case "Tháng sáu":
      return 6;
    case "Tháng bảy":
      return 7;
    case "Tháng tám":
      return 8;
    case "Tháng chín":
      return 9;
    case "Tháng mười":
      return 10;
    case "Tháng mười một":
      return 11;
    case "Tháng mười hai":
      return 12;
    default:
      break;
  }
}

function renderDayOfWeek(dayOfWeek) {
  switch (dayOfWeek) {
    case "thứ hai":
      return "Monday";
    case "thứ ba":
      return "Tuesday";
    case "thứ tư":
      return "Wednesday";
    case "thứ năm":
      return "Thursday";
    case "thứ sáu":
      return "Friday";
    case "thứ bảy":
      return "Saturday";
    case "chúa nhật":
      return "Sunday";
    default:
      break;
  }
}

crawl();
