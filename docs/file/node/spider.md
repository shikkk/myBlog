# 爬虫
1. 爬虫是什么
* 网络爬虫，是一种按照一定的规则，自动地抓取万维网信息的程序或者脚本。
* 对于我们来说就是使用一定技术手段，获取网页的内容，通过分析内容达 到一定目的。
2. 基本技能
* html、js、css
* node.js
* 爬虫相关第三方工具（无界面浏览器、网页解析，网络请求等）
## 接口爬取

```javascript
const https = require('https')

const getApi = 'https://www.vcg.com/api/common/searchImage?phrase=%E6%98%A5%E5%A4%A9&graphicalStyle%5B0%5D=1&page=1'

https.get(getApi,(res) => {
  // res.setEncoding('utf8')
  let rawData = ''
  console.log(res)
  res.on('data', chunk => {
    rawData += chunk
    // console.log(chunk)
  })
  res.on('end', () => {
    try {
      const parseData = JSON.parse(rawData)
      console.log(parseData)
    } catch (e){
      console.log(e.message)
    }
  })
}).on('err', (e)=> {
  console.error(`出现错误：${e.message}`)
})
```
部分结果如下：
<img :src="$withBase('/images/js/spider01.png')">

## 网页内容爬取
* 传统网站不能通过接口获取内容，要在网页加载完成后从页面元素中获取
* 网站采用gbk编码，是否有乱码问题
* 相关技术模块
    * superagent模块（网络模块，获取整个页面文档）
    * superagent-charset模块（网页编码处理模块，处理gbk编码乱码问题）
    * cheerio模块（快速构建网页DOM模型，采用类jquery语法）
* 核心方法
```javascript
// 获取目标页面，charset方法自动识别网页处理编码问题
superagent.get(url).charset().end(callback)

// 解析网页文档为DOM对象模型（如获取第一个p元素内容：$(''p”).eq(0).text()）
const $ = cheerio.load(htmltext)
```
```javascript
//网络模块  获取整个页面文档
const request = require('superagent')  
//网页编码处理模块，处理gbk编码乱码问题
const superagent = require('superagent-charset')(request)  
//快速构建网页DOM模型，采用类jquery语法
const cheerio = require('cheerio') 

let baseUrl = 'http://chengyu.t086.com/'  // 静态成语网址
let allResArr = ['list/Z_1.html','list/Z_2.html','list/Z_3.html','list/Z_4.html','list/Z_5.html']
let allResArrIndex = 0

function stepCget(){
  if(allResArrIndex >= allResArr.length){
    console.log('结束成语爬取')
  }else{
    console.log('爬取页面成语：',allResArr[allResArrIndex])
    superagent.get(baseUrl + allResArr[allResArrIndex]).charset().buffer(true).end((err, ares)=>{
      if(err){
        console.log(err)
        allResArrIndex +=1
        stepCget()
        return false
      }
      const $ = cheerio.load(ares.text)
      let content = ''
      $('.listw ul li a').each((index, el) => {
        content = content + $(el).text() + ' '
      }) 
      console.log(content)
      allResArrIndex +=1
      stepCget()
    })
  }
}
stepCget()
```
* 结果如下
<img :src="$withBase('/images/js/spider02.png')">

## 自动化发布
通过puppeteer编写脚本 代码提交后通过脚本直接发布任务上线
### puppeteer 模块
1. 介绍
    * 它是一个 nodejs 库，提供了高级 API 来控制 `chrome` 或 `chromium` （通过开发工具协 议）；
    * puppeteer 默认运行模式是无头的，但是可以被配置成非无头的模式。无头指的是不显 示浏览器的GUI，是为了提升性能而设计的，因为渲染图像是一件很消耗资源的事情
    * 高级 API 指代启动浏览器，打开页面，刷新页面，新建TAB打开页面，打开调试器等手动操作都 可以使用相应指令
2. 核心方法
```javascript
// 启动浏览器
puppeteer.launch(args)
// 新建TAB窗口
browser.newPage()
// 打开网站地址
page.goto(url)
// 等待网页中某个元素加载完成
page.waitForSelector()
// 表单提交
page.type(ele,val)
// 网页截图
page.screenshot()
// 获取网页cookie  
page.cookies()
// 获取网页内容
page.content()
// 获取网页内容 
page.close()
// 关闭浏览器
browser.close()
```
```javascript
(async() => {
    const puppeteer = require('puppeteer')
    // 公司部署发布系统地址
    const goUrl = 'http://dev.cimevue.cn:3379/'
    // 启动浏览器
    const browser = await puppeteer.launch(
        {
            headless: false, // 默认为无头，true为自动打开浏览器
            defaultViewport: { width: 1440, height: 1000 },
            }
        )
    // 地址监听变化
    browser.on('targetchanged', async (targer) =>{
        if(page){
            if(targer.url() === 'http://dev.cimevue.cn:3379/login?from=/'){ 
                const username = 'xxxx'
                const password = 'xxxx'
                await page.waitForSelector('input[name=j_username]')
                await page.type('input[name=j_username]',username,{delay:100})
                await page.waitForSelector('input[name=j_password]')
                await page.type('input[name=j_password]',password,{delay:100})
                const submitBtn = '.submit-button'
                await page.waitForSelector(submitBtn)
                await page.click(submitBtn)
                console.log('登录成功')
            }
        }
    })
    // 新建tab页面
    const page = await browser.newPage()
    // 打开网站地址
    await page.goto(goUrl)
    // 等待网页中某个元素加载完成
    await page.waitForSelector('.call-to-action a')
    await page.click('.call-to-action a')
})()
```

#### [参考-node.js中文网](http://nodejs.cn/learn)
#### [参考-puppeteer 中文](https://zhaoqize.github.io/puppeteer-api-zh_CN/)
#### [参考-puppeteer](https://github.com/puppeteer/puppeteer)

