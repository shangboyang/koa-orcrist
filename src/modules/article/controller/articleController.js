import ArticleService from '../service/articleService'
import fetch from 'node-fetch'

class ArticleController {
  static async getArticles (ctx) {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  * ctx.request *
    // {
    //   method: 'GET',
    //   url: '/siapp-sms/open/articles/get.do?a=1&b=2',
    //   header: {
    //      host: 'localhost:7709',
    //      connection: 'keep-alive',
    //      cache-control: 'max-age=0',
    //      user-agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    //      upgrade-insecure-requests: '1',
    //      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    //      accept-encoding: 'gzip, deflate, br',
    //      accept-language: 'zh-CN,zh;q=0.8,en;q=0.6',
    //      cookie: 'bdshare_firstime=1478672648294; Hm_lvt_fc3d1b16f12d4cf3bd05fde0de4fed15=1478672611;
    //    }
    // }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    let getQuery = ctx.request.query //
    let params = {
      a: 1,
      b: 2,
    }
    const URL = 'https://ehs.pingan.com.cn/siapp-sms/open/getArticles.do?regions=440300'
    const TYPE = 'POST'
    var resData = null,
        originData = null

    await fetch(URL, {
      method:  TYPE,
    	body:    JSON.stringify(params),
    	headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then((data) => {
      originData = data
      resData = ArticleService.getArticles(data)
    })

    ctx.response.type = 'application/json'
    ctx.response.set({
  		'Access-Control-Allow-Headers' : 'accept, token, zoneCode',
  		'Access-Control-Expose-headers': 'accept, token, zoneCode'
  	})
    ctx.response.body = resData // Node middle service Response
    /*
    await ctx.render('res', {
      title: 'Nasa Star Mock - Response from Back-End Data',
      url: URL,
      type: TYPE,
      resData,
      data: originData
    })
    */
  }
}

export default ArticleController