
let dialogDom = document.createElement('div');
dialogDom.className = 'dialog';
dialogDom.innerHTML = `<div>
  <a href="https://shenshuai89.github.io/pages/cfceaf/" target="_block">欢迎查看我的网站</a>
  <p ><button id='dialogCloseBtn' class='btn btn-info'>关闭</button></p>
  </div>`;
document.body.appendChild(dialogDom);
document.querySelector('#dialogCloseBtn').addEventListener('click', function(){
  document.querySelector(".dialog").style.display = 'none';
})

window.onload = () => {
  chrome.storage.local.get('storageData', function(result) {
    // console.log(result.storageData, 'team_profile Data stored successfully.');
    const history = JSON.parse(result.storageData).history.reverse();
    // 处理分页数据
    const total = history.length;
    const pageSize = 15;
    const pageCount = Math.ceil(total / pageSize);
    let currentPage = 1;
    let ulListDom = document.createElement('ul');
    ulListDom.style.padding = '0';
    // 渲染列表数据
    function renderList(){
      ulListDom.innerHTML = '';
      let startIndex = (currentPage - 1) * pageSize;
      let splitHistory = history.slice(startIndex, (pageSize*currentPage));
      console.log(splitHistory, 'split history')
      // 列表数据
      Array.isArray(splitHistory) && splitHistory.forEach(item=>{
        ulListDom.innerHTML += `<li><a href=${item.url} target="_block">${item.title}</a><span> ${item.createTime}</span></li>`;
      })
      document.getElementById('container').appendChild(ulListDom);
    }
    renderList()
    
    // 分页dom显示
    let ulPageDom = document.createElement('ul');
    ulPageDom.className = 'pagination pagination-sm'
    let liHtml = '';
    for(let i = 0; i < pageCount; i++) {
      if(currentPage === i+1){
        liHtml += `
        <li class="active"><a href="#">${i+1}</a></li>`
      } else{
        liHtml += `
          <li><a href="#">${i+1}</a></li>
        `
      }
    }
    liHtml += `<span aria-hidden="true" style="line-height: 28px; margin-left: 3px;">共${total}条</span>`
    ulPageDom.innerHTML = `${liHtml}`
    $('#container').after(ulPageDom);
    // 分页事件
    $('ul.pagination').on('click', 'li', function(){
      // console.log('click pagination', $(this).text())
      // 修改点击页
      currentPage = $(this).text();
      renderList()
      $(this).addClass('active').siblings().removeClass('active');
    })
  });
  // 清除所有数据
  document.getElementById('clearBtn').addEventListener('click', () => {
    chrome.storage.local.clear(function() {
      console.log('Storage cleared successfully');
      document.getElementById('container').innerHTML = '暂无数据';
    });
  })
}


