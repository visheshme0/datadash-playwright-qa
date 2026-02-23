const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let total = 0;

  for (let seed = 29; seed <= 38; seed++) {
    await page.goto(`https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`);
    await page.waitForSelector('table');

    const seedSum = await page.$$eval('table td', cells =>
      cells.reduce((sum, cell) => {
        const num = parseFloat(cell.innerText.replace(/,/g, '').trim());
        return isNaN(num) ? sum : sum + num;
      }, 0)
    );

    total += seedSum;
  }

  console.log("FINAL TOTAL:", total);

  await browser.close();
})();