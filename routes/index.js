var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path').join(__dirname)

const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const rrendererTemplate = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(path+'/index.template.html','utf-8')
})

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: '<div>{{url}}</div>'
  })
  const content = {title: 'index.template.html', meta: `<meta charset="UTF-8">`}
  rrendererTemplate.renderToString(app, content, (err, html) => {
    console.log('html:',html);
    // if(err) {
      // try {
        
      // } catch (error) {
        
      // }
      throw new Error()
      res.status(500).end('Internal Server Error')
      // throw new Error(err)
    // }
    // res.end(html) // <div data-server-rendered="true">/</div>  apphi便放入在标记注入处

  })
  

})


router.get('/vue', (req, res) => {
  // console.log("req:",req);
  // console.log("res:",res);
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })


  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    // res.setEncoding('utf8');
    // console.log("setEncoding",req.charset,req.setEncoding);
    res.header({'content-type': 'text/html'})
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `,'utf8')
  })
})

module.exports = router;
