var Vue = require('vue')
var  renderer = require('vue-server-renderer')

// 避免单例状态
module.exports = function createApp (context) {
    return new Vue({
        data: {url: context.url},
        template: '<div>{{url}}</div>'
    })
}
