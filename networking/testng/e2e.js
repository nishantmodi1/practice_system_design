const puppeteer = require("puppeteer");
// puppeteer
(async() => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1920, 1080"]
  })

  const page = await browser.newPage()

  await page.goto("https://namastedev.com/")

  console.log("webpage loaded")

  await page.setViewport({width: 1620, height: 1080})

  // const links = document.querySelectorAll('a')
  // const courses = [...links].find(link => link.textContent.trim() === "courses")
  // document.querySelector("ul li:nth-child(2) a")
  const coursePageLink = "ul li:nth-child(2) a" 

  await page.waitForSelector(coursePageLink)

  await page.click(coursePageLink)
  
})()


//IIFE
// (function(){

// })()
