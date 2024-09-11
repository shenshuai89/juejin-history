// 存放的数据
let storageData = {
  "official_home_page_url":  "https://www.juejin.cn/",
  "history": [],
}

chrome.storage.local.get('storageData', function(result) {
  // 如果存在数据，则获取一下存储的数据
  storageData = JSON.parse(result.storageData);
  // 数据超过500条就删除前100条
  if(storageData.history.length > 500) {
    storageData.history = storageData.history.splice(100, storageData.history.length)
  }
})
if(window.location.href.indexOf('/post/')>0){
  // console.log(document.querySelector('.article-title'))
  setTimeout(()=>{
    if(storageData.history.filter(item=>item.title === document.querySelector('.article-title').innerText).length===0){
      // 添加到历史记录中
      storageData.history.push({
        url: window.location.href,
        title: document.querySelector('.article-title').innerText,
        createTime: getNowFormatDate()
      })
    }
    // storageData.history.push({
    //   url: window.location.href,
    //   title: document.querySelector('.article-title').innerText,
    //   createTime: getNowFormatDate()
    // })
    chrome.storage.local.set({
      'storageData': JSON.stringify(storageData),
    }, function() {
      console.log('team_profile Data stored successfully.');
    })
  },200)
  // 判断下同一日期下是否有重复的，如果存在就不添加
  
  
}



// 添加右侧确认弹窗
// 只有在teams页面才添加弹窗
/* if(window.location.href.endsWith('/teams')){
  document.getElementById('confirm').addEventListener('click', () => {
    // chrome.runtime.sendMessage({ color: color }, (response) => {
    //   console.log(response);
    // })
    document.body.removeChild(newDiv);
    // 
    // let teamDiv = document.createElement('div');
    // teamDiv.innerHTML = `<div id="wrapper">
    //   <h3>请点击一个球队</h3>
    // </div>`;
    // teamDiv.id = 'teamDiv';
    // document.body.appendChild(teamDiv);
    // document.querySelectorAll('.TeamFigure_tfLinks__gwWFj a:first-child').forEach(item=>{
    //   team_profile_link_samples.push({
    //     url: item.href,
    //     link_element_outer_html: item.outerHTML
    //   })
    // })
    document.querySelector('#__next').addEventListener('click', function (e) {
      // 兼容性处理
      var event = e || window.event;
      var target = event.target || event.srcElement;
      if (target.className.includes('TeamFigureLink_teamFigureLink__uqnNO')) {
        console.log('the content is: ', target.href, target.outerHTML);
        storageData.team_profile_link_samples.push({
          url: target.href,
          link_element_outer_html: target.outerHTML
        })
        chrome.storage.local.set({
          'storageData': JSON.stringify(storageData),
        }, function() {
          console.log('team_profile Data stored successfully.');
        });
      }
    });
  })
  document.getElementById('reject').addEventListener('click', () => {
    document.body.removeChild(newDiv);
  })
}else{
  // document.querySelectorAll('.TeamRoster_tableContainer__CUtM0 table tbody tr td:first-child a').forEach(item=>{
  //   storageData.player_profile_link_samples.push({
  //     url: item.href,
  //     link_element_outer_html: item.outerHTML
  //   })
  // })
  // console.log(storageData.player_profile_link_samples)
  document.querySelector('#__next').addEventListener('click', function (e) {
    // 兼容性处理
    var event = e || window.event;
    var target = event.target || event.srcElement;
    // offsetParent.className === 'primary text'  className==='Anchor_anchor__cSc3P' localName=='a'
    if (target.className=='Anchor_anchor__cSc3P' && target.localName=='a' && target.offsetParent.localName=='td') {
      console.log('the content is: ', target.href, target.outerHTML);
      storageData.player_profile_link_samples.push({
        url: target.href,
        link_element_outer_html: target.outerHTML
      })
      chrome.storage.local.set({
        'storageData': JSON.stringify(storageData),
      }, function() {
        console.log('team_profile Data stored successfully.');
      });
    }
  });
} */

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, sender, sendResponse, 'clickclick')
  // color = document.body.style.color;
  // document.body.style.background = message;
  // sendResponse('changed');
  // console.log(document.getElementById("chat-box") && document.getElementById("chat-box").innerHTML, "content.js");
});

function getNowFormatDate() {
  let date = new Date(),
  year = date.getFullYear(), //获取完整的年份(4位)
  month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
  strDate = date.getDate() // 获取当前日(1-31)
  if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
  if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0

  return `${year}-${month}-${strDate}`
}