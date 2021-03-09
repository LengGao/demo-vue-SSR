var fs = require('fs')
var express = require('express');
var router = express.Router();

var Vue = require('vue')
var renderer = require('vue-server-renderer')


router.get('/', (req, res) => {

})



// 模板写法
router.get('/template', (req, res) => {
  const template = fs.renameSync('../pages/index.template.html')
  const app = new Vue({ data: {url: req.url},template: `<div>{{url}}</div>`})
  const context = {title:'模板写法', meta: `<meta name="keyword" content="vue,ssr">
  <meta name="description" content="vue srr demo">`}
  renderer().createRenderer({template}).renderToString(app, context, (err, html)=>{
    if(err) res.status(500).end('service error!')
    res.header({"Content-Type": 'text/html'})
    res.end(html)
  })
})


// 基本写法
router.get('/commo', (req, res) => {
  req.setEncoding('utf-8');
  const  app = new Vue({
    data: {url: `访问url为${req.url}`, title: '原始操作'},
    template: '<div>{{ url }}</div>'
  })
  renderer.createRenderer().renderToString(app,(err, html) => {
    if(err) res.status(500).end('service error!')
    res.header({"Content-Type": 'text/html'})
    res.end(`<!DOCTYPE html>
      <html lang="en">
        <head>{{{title}}}</head>
        <body>${html}<br/>${res}</body>
      </html>`
      )
  })
})


module.exports = router

/**
 * SSR定义：本质上实时动态渲染就整个项目而言的部分HTML，
 * 优缺点： 
 * 1，组件初始化更快：因为实时动态编译部分HTML
 * 2，便于SEO：因为可以为每段HTML加入meta头
 * SSR特性：
 * 1，*.vue组件自动注入关键的 CSS(critical CSS)
 * 2，在使用clientManifest API时，自动注入资源链接和预加载提示
 * 3，嵌入Vuex状态进行客户端融合时，自动注入以及XSS防御
 * 关于编写通用代码：
 * 服务端只有beforeCreated,created两个周期，所以不可在其中编写全局副作用代码如使用setTnterval
 * 服务端与浏览器顶级全局对象不同，因此避免使用window,document,global对象以及一些特定平台才有的API
 * 关于编写通用代码带来的不便与解决：
 * 两种情况；
 * 1，对于共享与server与client，磐用于不同API任务 —— pollfull通用实现
 * 2，对于仅浏览器可用API例如DOM操作，在纯客户端的生命周期中惰性访问（clientManifest ）
 * 对于自定义指令的场景：
 * 1，使用组件作为抽象机制，并运行在虚拟DOM层级，如使用渲染函数（render-function）
 * 2，不容易替换为组件的自定义指令，在创建renderer时开启directive配置项
 */