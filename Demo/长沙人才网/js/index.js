window.onload = function () {
    // 获取导航栏元素
    var navShowList = document.querySelector('#navList')
    // 导航栏列表数据
    var navList = [{
        id: 01,
        text: '首页',
        flag: false
    }, {
        id: 02,
        text: '求职招聘',
        flag: true
    }, {
        id: 03,
        text: '人事代理',
        flag: false
    }, {
        id: 04,
        text: '人才培训',
        flag: false
    }, {
        id: 05,
        text: '招考测评',
        flag: false
    }, {
        id: 06,
        text: '技能培训',
        flag: false
    }, {
        id: 07,
        text: '灵活用工',
        flag: false
    }, {
        id: 08,
        text: '留学归国',
        flag: true
    }, {
        id: 09,
        text: '猎头派遣',
        flag: false
    }]
    // 用导航栏数据动态生成导航栏
    for (let i = 0; i <= navList.length - 1; i++) {
        let navList_li = document.createElement('li')
        navList_li.innerText = navList[i].text
        // 动态添加flag
        if (navList[i].flag) {
            var imgFlag = document.createElement('img')
            imgFlag.src = './static/images/new.png'
            navList_li.appendChild(imgFlag)
        }
        navShowList.appendChild(navList_li)
    }
    // 获取动态生成的导航栏列表
    var navLis = document.querySelectorAll('#navList li')
    for (let i = 0; i <= navLis.length - 1; i++) {
        navLis[0].style.fontWeight = 'bold'
        navLis[i].onclick = function () {
            for (let i = 0; i <= navLis.length - 1; i++) {
                navLis[i].style.fontWeight = 'normal'
            }
            this.style.fontWeight = 'bold'
        }
    }
    var search = document.querySelector('#search')
    // 搜索框回车键事件
    search.addEventListener('keypress', function (e) {
        // console.log(e);
        let searchValue = search.value
        if (e.keyCode == 13) {
            sessionStorage.setItem('text', searchValue)
            search.value = ''
            CreateQuickSearch()
        }
    })
    // 搜索按钮事件
    var searchBtn = document.querySelector('#searchBtn')
    searchBtn.addEventListener('click', function () {
        let searchValue = search.value
        sessionStorage.setItem('text', searchValue)
        search.value = ''
        CreateQuickSearch()
    })
    // 获取搜索历史
    var quickSearch = document.querySelector('#quickSearch')
    // 动态生成搜索历史记录
    var CreateQuickSearch = function () {
        // 搜索历史记录数据
        var quickSearchList = sessionStorage.getItem('text')
        let historyLi = document.createElement('li')
        let historyA = document.createElement('a')
        historyA.innerText = quickSearchList
        historyLi.appendChild(historyA)
        quickSearch.appendChild(historyLi)
        // 搜索历史超过5个删除第一个
        var quickSearchLis = document.querySelectorAll('#quickSearch li')
        if (quickSearchLis.length > 5) {
            quickSearch.firstElementChild.remove()
        }
    }
    // 资讯选项卡数据
    var newsTabList = [{
            id: 01,
            text: '国企·事业单位招聘资讯',
            news: [{
                text: '湖南幼儿师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南幼儿师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南幼儿师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南幼儿师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南幼儿师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南幼儿师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南幼儿师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南幼儿师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南幼儿师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南幼儿师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }]
        },
        {
            id: 02,
            text: '招聘咨询',
            news: [{
                text: '湖南师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南师范高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }]
        }, {
            id: 03,
            text: '招聘咨询',
            news: [{
                text: '湖南高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }, {
                text: '湖南高等专科学校招聘非事业编合同',
                postType: '国有企业',
                postNum: 100,
                recruitNum: 50,
                publishDate: '10-24'
            }]
        }
    ]
    // 获取资讯选项卡
    var newsTab = document.querySelector('#newsLeftTop')
    var newsLeft = document.querySelector('#newsLeft')
    for (let i = 0; i <= newsTabList.length - 1; i++) {
        // 动态生成选项卡
        var newsTabLi = document.createElement('li')
        newsTabLi.innerText = newsTabList[i].text
        newsTab.appendChild(newsTabLi)
    }
    // 获取选项卡节点
    var newsTabLis = document.querySelectorAll('#newsLeftTop li')
    // 循环选项卡列表添加样式
    for (let i = 0; i <= newsTabLis.length - 1; i++) {
        // 生成信息盒子
        newsTabLis[0].style.borderColor = '#ED530F'
    }
    // 生成外部盒子
    let newsBox = document.createElement('ul')
    newsBox.className = 'newsBox'
    newsLeft.appendChild(newsBox)
    // 选项卡数据外层循环
    for (let i = 0; i <= newsTabList.length - 1; i++) {
        newsTabList[i].news.forEach(function (item, index, array) {
            // 创建外部Li
            let newBox = document.createElement('li')
            newBox.className = 'newBox'
            // console.log(newsTabList[i].id);
            newBox.setAttribute('listId', newsTabList[i].id)
            // 设置选项内容默认样式
            if (newBox.getAttribute('listId') != 1) {
                newBox.style.display = 'none'
            } else {
                newBox.style.display = 'flex'
            }
            // 信息卡片盒子左边
            let newBoxLeft = document.createElement('div')
            newBoxLeft.className = 'newBoxLeft'
            // 创建招聘标题
            let newBoxLeft_top = document.createElement('span')
            newBoxLeft_top.className = 'newBoxLeft_top'
            newBoxLeft_top.innerText = item.text
            // 创建招聘信息
            let newBoxLeft_bottom = document.createElement('span')
            newBoxLeft_bottom.className = 'newBoxLeft_bottom'
            newBoxLeft_bottom.innerText = item.postType + '  |  岗位' + item.postNum + '  |  招聘' + item.recruitNum
            newBoxLeft.appendChild(newBoxLeft_top)
            newBoxLeft.appendChild(newBoxLeft_bottom)
            // 创建发布时间
            let newBoxRight = document.createElement('div')
            newBoxRight.className = 'newBoxRight'
            newBoxRight.innerText = item.publishDate
            // 添加不同的资讯到不同的盒子
            newsBox.appendChild(newBox)
            newBox.appendChild(newBoxLeft)
            newBox.appendChild(newBoxRight)
        })
    }
    // 循环选项卡列表添加事件
    for (let i = 0; i <= newsTabLis.length - 1; i++) {
        newsTabLis[i].addEventListener('click', function (e) {
            for (let i = 0; i <= newsTabLis.length - 1; i++) {
                newsTabLis[i].style.borderColor = '#FFFFFF'
            }
            this.style.borderColor = '#ED530F'
            // 此处i与tab的i对应，所以可以直接使用
            let liNum = document.querySelectorAll('.newBox')
            liNum.forEach(function (item, index, array) {
                if (item.getAttribute('listId') == i + 1) {
                    item.style.display = 'flex'
                } else {
                    item.style.display = 'none'
                }
            })
        })
    }

    // 信息分类数据
    let newsClassifyList = [{
        text: '市场介绍',
        src: './static/images/1.png'
    }, {
        text: '现场招聘',
        src: './static/images/2.png'
    }, {
        text: '招聘服务',
        src: './static/images/3.png'
    }, {
        text: '退役军人',
        src: './static/images/1.png'
    }, {
        text: '招聘外包',
        src: './static/images/5.png'
    }, {
        text: '求职服务',
        src: './static/images/6.png'
    }]
    // 信息框右边
    let newsRightBottom = document.querySelector('#newsRightBottom')
    newsClassifyList.forEach(function (item, index, array) {
        let newsClassifyLi = document.createElement('li')
        newsClassifyLi.className = 'newsRightBottomLi'
        let newsClassifyImg = document.createElement('img')
        newsClassifyImg.src = item.src
        let newsClassifySpan = document.createElement('span')
        newsClassifySpan.innerText = item.text
        newsClassifyLi.appendChild(newsClassifyImg)
        newsClassifyLi.appendChild(newsClassifySpan)
        newsRightBottom.appendChild(newsClassifyLi)
    })

    // banner数据
    let bannerList = [{
        src: './static/images/banner1.png'
    }, {
        src: './static/images/banner2.png'
    }, {
        src: './static/images/banner3.png'
    }, {
        src: './static/images/banner4.png'
    }, {
        src: './static/images/banner5.png'
    }, {
        src: './static/images/banner6.png'
    }, {
        src: './static/images/banner7.png'
    }, {
        src: './static/images/banner8.png'
    }]
    // banner
    let banner = document.querySelector('#banner')
    bannerList.forEach(function (item, index, array) {
        let bannerLi = document.createElement('li')
        let bannerImg = document.createElement('img')
        bannerImg.src = item.src
        let deleteBtn = document.createElement('span')
        deleteBtn.className = 'deleteBtn'
        deleteBtn.innerText = 'x'
        bannerLi.appendChild(bannerImg)
        bannerLi.appendChild(deleteBtn)
        banner.appendChild(bannerLi)
    })
    // 给图片添加事件
    let bannerLiList = document.querySelectorAll('#banner li')
    // let bannerImg = document.querySelector('#banner li img')

    // 鼠标事件
    bannerLiList.forEach(function (item, index, array) {
        item.addEventListener('mouseover', function (e) {
            let deleteBtn = item.childNodes[1]
            deleteBtn.style.display = 'inline-block'
        })
        // // 鼠标离开事件
        item.addEventListener('mouseout', function (e) {
            let deleteBtn = item.childNodes[1]
            deleteBtn.style.display = 'none'
        })
    })

    // 删除事件
    let deleteBtn = document.querySelectorAll('#banner li span')
    deleteBtn.forEach(function (item, index, array) {
        item.addEventListener('click', function () {
            let bannerLi = item.parentNode
            let bannerUl = bannerLi.parentNode
            let flag = confirm('请问您确定删除吗？')
            if (!flag) {
                return
            }
            bannerUl.removeChild(bannerLi)
        })
    })

    // tab选项卡数据
    let tabList = [{
        text: 'IT/互联网',
        date: [{
            title: 'web前端开发',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'web前端开发',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'web前端开发',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'web前端开发',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'web前端开发',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'web前端开发',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'web前端开发',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'web前端开发',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'web前端开发',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'web前端开发',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'web前端开发',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'web前端开发',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }]
    }, {
        text: '服务业',
        date: [{
            title: '洗车',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '洗车',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '洗车',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '洗车',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '洗车',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '洗车',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '洗车',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '洗车',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '洗车',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '洗车',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '洗车',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '洗车',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }]
    }, {
        text: '汽车/制造',
        date: [{
            title: '汽车贴膜',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '汽车贴膜',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '汽车贴膜',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '汽车贴膜',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '汽车贴膜',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '汽车贴膜',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '汽车贴膜',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '汽车贴膜',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '汽车贴膜',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '汽车贴膜',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '汽车贴膜',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '汽车贴膜',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }]
    }, {
        text: '贸易/零售',
        date: [{
            title: '零食很忙',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '零食很忙',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '零食很忙',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '零食很忙',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '零食很忙',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '零食很忙',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '零食很忙',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '零食很忙',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '零食很忙',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '零食很忙',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '零食很忙',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '零食很忙',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }]
    }, {
        text: '房地产/建筑',
        date: [{
            title: '高级实施工程师',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '高级实施工程师',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '高级实施工程师',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '高级实施工程师',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '高级实施工程师',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '高级实施工程师',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '高级实施工程师',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '高级实施工程师',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '高级实施工程师',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '高级实施工程师',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '高级实施工程师',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '高级实施工程师',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }]
    }, {
        text: '医疗/化工',
        date: [{
            title: '护士',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '护士',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '护士',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '护士',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '护士',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '护士',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '护士',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '护士',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '护士',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '护士',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '护士',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '护士',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }]
    }, {
        text: '消费品',
        date: [{
            title: 'LV',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'LV',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'LV',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'LV',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'LV',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'LV',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'LV',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'LV',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'LV',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'LV',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'LV',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: 'LV',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }]
    }, {
        text: '文化/传媒',
        date: [{
            title: '公众号运营',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '公众号运营',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '公众号运营',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '公众号运营',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '公众号运营',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '公众号运营',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '公众号运营',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '公众号运营',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '公众号运营',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '公众号运营',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '公众号运营',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '公众号运营',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }]
    }, {
        text: '最新招聘',
        date: [{
            title: '挖掘机司机',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '挖掘机司机',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '挖掘机司机',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '挖掘机司机',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '挖掘机司机',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '挖掘机司机',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '挖掘机司机',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '挖掘机司机',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '挖掘机司机',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '挖掘机司机',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '挖掘机司机',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '挖掘机司机',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }]
    }, {
        text: '其他',
        date: [{
            title: '医生',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '医生',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '医生',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '医生',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '医生',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '医生',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '医生',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '医生',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '医生',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '医生',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '医生',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }, {
            title: '医生',
            money: '8k-12k',
            address: '长沙',
            WorkYear: '3-5年',
            education: '本科',
            companyName: '湖南预计科技服务有限公司',
            industry: '互联网'
        }]
    }]
    let recruitList = document.querySelector('#recruitList')
    // 循环生成选项卡
    tabList.forEach(function (item, index, array) {
        let tabListLi = document.createElement('li')
        tabListLi.innerText = item.text
        tabListLi.setAttribute('tabLisIndex', index)
        recruitList.appendChild(tabListLi)
    })
    // tab选项卡事件
    let recruitLis = document.querySelectorAll('#recruitList li')
    recruitLis[0].style.borderBottom = '2px solid #ED530F'
    recruitLis.forEach(function (item, index, array) {
        //鼠标事件
        item.addEventListener('mouseover', function () {
            recruitLis.forEach(function (item, index, array) {
                item.style.borderBottom = 'none'
            })
            item.style.borderBottom = '2px solid #ED530F'
        })
    })

    // tab选项卡内容
    let recruitBox = document.querySelector('#recruitBox')
    tabList.forEach(function (item1, index1, array1) {
        // console.log(item1.date);
        // 通过内容循环生成不同的盒子
        let recruitCardList = document.createElement('ul')
        recruitCardList.className = 'recruitCardList'
        recruitCardList.setAttribute('recruitCardListIndex', index1)
        item1.date.forEach(function (item2, index2, array2) {
            let recruitCard = document.createElement('li')
            recruitCard.className = 'recruitCard'
            // recruitCardTop
            let recruitCardTop = document.createElement('div')
            recruitCardTop.className = 'recruitCardTop'
            let recruitCardTop_title = document.createElement('div')
            recruitCardTop_title.className = 'recruitCardTop_title'
            recruitCardTop_title.innerText = item2.title
            let recruitCardTop_money = document.createElement('span')
            recruitCardTop_money.className = 'recruitCardTop_money'
            recruitCardTop_money.innerText = item2.money
            recruitCardTop_title.appendChild(recruitCardTop_money)
            let recruitCardTop_condition = document.createElement('div')
            recruitCardTop_condition.className = 'recruitCardTop_condition'
            recruitCardTop_condition.innerText = item2.address + '  |  ' + item2.WorkYear + '  |  ' + item2.education
            recruitCardTop.appendChild(recruitCardTop_title)
            recruitCardTop.appendChild(recruitCardTop_condition)
            // recruitCardBottom
            let recruitCardBottom = document.createElement('div')
            recruitCardBottom.className = 'recruitCardBottom'
            recruitCardBottom.innerText = item2.companyName + '  |  ' + item2.industry
            recruitCard.appendChild(recruitCardTop)
            recruitCard.appendChild(recruitCardBottom)
            recruitCardList.appendChild(recruitCard)
        })
        recruitBox.appendChild(recruitCardList)
    })

    // 选项卡切换功能
    recruitLis.forEach(function (item1, index1, array1) {
        let recruitCardList = document.querySelectorAll('.recruitCardList')
        recruitCardList[0].style.display = 'flex'
        // console.log(recruitCardList[0]);
        //鼠标事件
        item1.addEventListener('mouseover', function () {
            recruitCardList.forEach(function (item2, index2, array2) {
                // console.log(item2);
                item2.style.display = 'none'
                if (item2.getAttribute('recruitcardlistindex') == item1.getAttribute('tablisindex')) {
                    item2.style.display = 'flex'
                }
            })
        })
    })

    function ajax(URL) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', URL, true);
            req.onload = function () {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject(new Error(req.statusText));
                }
            };
            req.onerror = function () {
                reject(new Error(req.statusText));
            };
            req.send();
        });
    }
    ajax('../json/famousEnterprisesList.json').then(function onFulfilled(value) {
        famousEnterprisesFn(JSON.parse(value))
    }).catch(function onRejected(error) {
        document.write('错误：请打开本地服务访问并确保“长沙人才网”为根目录');
    });

    // 名企专区
    function famousEnterprisesFn(famousEnterprisesList) {
        let famousEnterprisesBox = document.querySelector('#famousEnterprisesBox')
        famousEnterprisesList.forEach(function (item, index, array) {
            let famousEnterprisesCard = document.createElement('li')
            famousEnterprisesCard.className = 'famousEnterprisesCard'
            // famousEnterprisesCardTop
            let famousEnterprisesCardTop = document.createElement('div')
            famousEnterprisesCardTop.className = 'famousEnterprisesCardTop'
            // famousEnterprisesCard_logo
            let famousEnterprisesCard_logo = document.createElement('div')
            famousEnterprisesCard_logo.className = 'famousEnterprisesCard_logo'
            let famousEnterprisesCard_logoImg = document.createElement('img')
            famousEnterprisesCard_logoImg.src = item.src
            famousEnterprisesCard_logo.appendChild(famousEnterprisesCard_logoImg)
            // famousEnterprisesCard_title
            let famousEnterprisesCard_title = document.createElement('div')
            famousEnterprisesCard_title.className = 'famousEnterprisesCard_title'
            famousEnterprisesCard_title.innerText = item.companyName
            let famousEnterprisesCard_information = document.createElement('div')
            famousEnterprisesCard_information.className = 'famousEnterprisesCard_information'
            famousEnterprisesCard_information.innerText = item.companyClass + '  |  ' + item.companyPeople
            famousEnterprisesCardTop.appendChild(famousEnterprisesCard_logo)
            famousEnterprisesCardTop.appendChild(famousEnterprisesCard_title)
            famousEnterprisesCardTop.appendChild(famousEnterprisesCard_information)
            // famousEnterprisesCardBottom
            let famousEnterprisesCardBottom = document.createElement('div')
            famousEnterprisesCardBottom.className = 'famousEnterprisesCardBottom'
            let famousEnterprisesCardBottom_left = document.createElement('div')
            famousEnterprisesCardBottom_left.className = 'famousEnterprisesCardBottom_left'
            let famousEnterprisesCardBottom_leftNum = document.createElement('span')
            famousEnterprisesCardBottom_leftNum.style.color = '#ED530F'
            famousEnterprisesCardBottom_leftNum.innerText = item.postNum
            famousEnterprisesCardBottom_left.appendChild(famousEnterprisesCardBottom_leftNum)
            let famousEnterprisesCardBottom_leftNumText = document.createElement('span')
            famousEnterprisesCardBottom_leftNumText.innerText = '在招职位'
            famousEnterprisesCardBottom_left.appendChild(famousEnterprisesCardBottom_leftNumText)
            let famousEnterprisesCardLine = document.createElement('div')
            famousEnterprisesCardLine.style.width = '1px'
            famousEnterprisesCardLine.style.height = '35px'
            famousEnterprisesCardLine.style.backgroundColor = '#F1F1F3'
            let famousEnterprisesCardBottom_right = document.createElement('div')
            famousEnterprisesCardBottom_right.className = 'famousEnterprisesCardBottom_left'
            let viewingRate = document.createElement('span')
            viewingRate.style.color = '#ED530F'
            viewingRate.innerText = item.viewingRate
            famousEnterprisesCardBottom_right.appendChild(viewingRate)
            let famousEnterprisesCardBottom_viewingRateText = document.createElement('span')
            famousEnterprisesCardBottom_viewingRateText.innerText = '简历查看率'
            famousEnterprisesCardBottom_right.appendChild(famousEnterprisesCardBottom_viewingRateText)
            famousEnterprisesCardBottom.appendChild(famousEnterprisesCardBottom_left)
            famousEnterprisesCardBottom.appendChild(famousEnterprisesCardLine)
            famousEnterprisesCardBottom.appendChild(famousEnterprisesCardBottom_right)
            famousEnterprisesCard.appendChild(famousEnterprisesCardTop)
            famousEnterprisesCard.appendChild(famousEnterprisesCardBottom)
            famousEnterprisesBox.appendChild(famousEnterprisesCard)
        })
    }

    // 轮播图数据
    let rotationChartList = [{
        src: './static/images/banner1.png'
    }, {
        src: './static/images/banner2.png'
    }, {
        src: './static/images/banner3.png'
    }]

    // 底部轮播图
    var rotationChart = document.querySelector('#rotationChart')
    rotationChartList.forEach(function (item, index, array) {
        // 创建Li盒子
        let rotationChart_Li = document.createElement('li')
        rotationChart_Li.className = 'rotationChart_Li'
        rotationChart_Li.setAttribute('rotationChart_LiIndex', index)
        let rotationChart_img = document.createElement('img')
        rotationChart_img.src = item.src
        rotationChart_Li.appendChild(rotationChart_img)
        rotationChart.appendChild(rotationChart_Li)
    })

    let rotationChart_sort = document.querySelector('#rotationChart_sort')
    rotationChartList.forEach(function (item, index, array) {
        let sort = document.createElement('span')
        sort.className = 'sort'
        rotationChart_sort.appendChild(sort)
        sort.setAttribute('sortIndex', index)
    })

    // 点击原点切换轮播图
    let sortList = document.querySelectorAll('.sort')
    let rotationChartLis = document.querySelectorAll('.rotationChart_Li')
    sortList.forEach(function (item1, index1, array1) {
        item1.addEventListener('click', function () {
            // 样式设置
            sortList.forEach(function (item2, index2, array2) {
                item2.style.width = '10px'
                item2.style.backgroundColor = '#B7C1D1'
            })
            this.style.backgroundColor = '#ED520D'
            this.style.width = '30px'
            console.log(item1.getAttribute('sortIndex'));
            rotationChartLis.forEach(function (item3, index3, array3) {
                if (item1.getAttribute('sortIndex') == item3.getAttribute('rotationchart_liindex')) {
                    rotationChart.style.transform = 'translate(' + -690 * index3 + 'px)'
                }
            })
        })
        // if (item1.getAttribute('sortIndex') == index1) {
        //     item1.style.backgroundColor = '#ED520D'
        //     item1.style.width = '30px'
        // } else {
        //     item1.style.width = '10px'
        //     item1.style.backgroundColor = '#B7C1D1'
        // }
    })

    var count = 0;
    var isgo = false
    var timer
    var li_img = document.querySelectorAll('.rotationChart_Li')

    function showTime() {
        timer = setInterval(function () {
            if (isgo == false) {
                count++
                rotationChart.style.transform = 'translate(' + -690 * count + 'px)'
                let transPX = rotationChart.style.transform
                let nowTrans = transPX.slice(transPX.indexOf('-'), transPX.indexOf('p'))
                console.log();
                sortList.forEach(function (item, index, array) {
                    if (nowTrans / -690 == item.getAttribute('sortIndex')) {
                        item.style.backgroundColor = '#ED520D'
                        item.style.width = '30px'
                    } else {
                        item.style.width = '10px'
                        item.style.backgroundColor = '#B7C1D1'
                    }
                })
                if (count >= li_img.length - 1) {
                    count = li_img.length - 1
                    isgo = true
                }

            } else {
                count = 0
                rotationChart.style.transform = 'translate(' + -690 * count + 'px)'
                isgo = false
            }
        }, 3000)
    }
    showTime()
}