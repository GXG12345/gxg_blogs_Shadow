// MathJax.Hub.Config({
//     showProcessingMessages: false, //关闭js加载过程信息
//     messageStyle: "none", //不显示信息
//     tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]},
//     "HTML-CSS": {
//       showMathMenu: false //关闭右击菜单显示
//     }
//   });
//上面是在设置MathJax

// 下面是Loading动画
// Notiflix.Loading.custom({ zindex: 999999, cssAnimation: true, cssAnimationDuration: 50, backgroundColor: 'rgba(255,255,255,0.0)', svgSize: '400px', customSvgUrl: './img/Loading.svg' });
// Notiflix.Loading.remove(800);

// 下面是联系我按钮的点击事件
$('#blog_nav_contact').click(function (e) {
    Notiflix.Loading.custom({ zindex: 999999, clickToClose: true, cssAnimation: true, cssAnimationDuration: 50, backgroundColor: 'rgba(255,255,255,0.0)', svgSize: '250px', customSvgUrl: './img/QQ.jpg' });
    Notiflix.Loading.remove(30000);
});


// 设置点击出水波效果
let mx, my, timer;
let z = 2;
$('html').click(function (e) {
    mx = e.clientX - 50;
    my = e.clientY - 50;
    z = z + 1;
    if ($(e.target).closest("#calendar").length == 0 && $(e.target).closest("#pageBar").length == 0) {
        _click_wave(mx, my, z);
    }
});

function _click_wave(i, j, k) {
    $('body').prepend(
        '<div class="click_wave click_wave_' + k + '" style="z-index:' + k + ';top:' + j + 'px;left:' + i + 'px;">' +
        '<span class="click_wave__back"></span>' +
        '<span class="click_wave__back"></span>' +
        '</div>'
    );
    setTimeout(function () {
        $('.click_wave_' + k).fadeToggle(2000, function () { $('.click_wave_' + k).remove(); });
    }, 1000);
}

// 下面是搜索框部分
//搜索框部分
let old_query = "";
$("#blogTitle_search__input").keyup(function (event) {
    // enter，搜索框内按enter键对应事件
    if (event.which == 13) {
        $("#blogTitle_search_svg").click();
    }
});
$("#blogTitle_search_svg").click(function (event) {
    let query = $("#blogTitle_search__input").val();
    if (query == "" || query == null || query == " ") {
        Notiflix.Report.failure('错误', '请先输入需要查询的内容！^_^', '确认');//为空报错
    }
    else {
        old_query = query;
        $("#blogTitle_search__input").val('')
    }
    window.open('https://www.baidu.com/s?ie=UTF-8&wd=' + query);
});

//这是时钟
// author:戈小戈
//显示星期
let date = "<div class='blog_clock_date'></div>";
$(".blog_clock_marker").before(date);
let week = "<div class='blog_clock_week'></div>";
$(".blog_clock_marker").before(week);


function setTime() {
    const sHand = document.querySelector('.blog_clock_s');
    const mHand = document.querySelector('.blog_clock_m');
    const hHand = document.querySelector('.blog_clock_h');

    const d = new Date();
    let Y = d.getFullYear();  //年
    let M = d.getMonth() + 1;  //月
    let D = d.getDate();  //日
    let U = d.getUTCDay();  //周
    // const ms = d.getMilliseconds();//毫秒
    const s = d.getSeconds();//秒
    const m = d.getMinutes();//分
    const h = d.getHours();//时
    // + (( ms / 1000 ) * 6 )
    const sDeg = ((s / 60) * 360);
    const mDeg = ((m / 60) * 360) + ((s / 60) * 6);
    const hDeg = ((h / 12) * 360) + ((m / 60) * 30);
    sHand.style.transform = `rotate( ${sDeg}deg )`;
    mHand.style.transform = `rotate( ${mDeg}deg )`;
    hHand.style.transform = `rotate( ${hDeg}deg )`;

    //星期赋值
    switch (U) {
        case 0: U = "星期日";
            break;
        case 1: U = "星期一";
            break;
        case 2: U = "星期二";
            break;
        case 3: U = "星期三";
            break;
        case 4: U = "星期四";
            break;
        case 5: U = "星期五";
            break;
        case 6: U = "星期六";
            break;
    };
    //星期赋值
    let week = U;
    $(".blog_clock_week").html(week);

    //年份赋值
    let year = Y;
    $(".blog_clock_year").html(year);

    //日期赋值
    let date = "<span>" + M + "</span>" + "月" + "<span>" + D + "</span>" + "日";
    $(".blog_clock_date").html(date);
}
setInterval(setTime, 100);



// 设置日间模式还是夜间模式
if (document.cookie.indexOf("day_mode") != -1) {
    if (document.cookie.match(new RegExp("(^| )" + 'day_mode' + "=([^;]*)(;|$)"))[2] == 'moon') {
        document.getElementById("blogTitle_switch_input").checked = true;
        change_day_mode('moon');
    }
}
function change_day_mode(value) {
    // 先加上cookies
    let exp = new Date();
    exp.setTime(new Date().getTime() + 24 * 60 * 60 * 1000);
    document.cookie = "day_mode=" + encodeURI(value) + ";expires=" + exp.toUTCString();
    if (value == 'moon') {
        // 再加上夜间模式滤镜样式
        let style = document.createElement("style");
        style.id = "dark-mode-style";
        style.textContent = "@media screen {html {text-shadow: 0 0 0 !important;filter: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"dark-mode-filter\" color-interpolation-filters=\"sRGB\"><feColorMatrix type=\"matrix\" values=\"0.283 -0.567 -0.567 0 0.925 -0.567 0.283 -0.567 0 0.925 -0.567 -0.567 0.283 0 0.925 0 0 0 1 0\"/></filter></svg>#dark-mode-filter') !important;scrollbar-color: #454a4d #202324;}}@media print {.no-print {display: none !important;}}";
        document.getElementsByTagName("head").item(0).appendChild(style);
    }
    else {
        // 再去除夜间模式滤镜样式
        if (document.getElementById('dark-mode-style')) {
            document.getElementById('dark-mode-style').remove();
        }
    }
}

$('#dark-mode-change').click(function (e) {
    if (!document.getElementById("blogTitle_switch_input").checked) {
        change_day_mode('moon');
    }
    else {
        change_day_mode('sun');
    }
});


//初始化vue菜单
let rela;
let APP;
const home = Vue.createApp({
    data() {
        return {
            posts: [],
            pageIndexChecked: "1",
            postCounts: 0,
            pageCounts: 0,
        };
    },
    watch: {},
    methods: {
        change(post, pageCount, postCount) {
            this.posts = post;
            this.pageCounts = pageCount;
            this.postCounts = postCount;

        },
        change_page_index(pageIndex) {
            this.pageIndexChecked = pageIndex;
            this.posts = rela[pageIndex];
        }
    },
    error: function () {
        console.log('error');
    }

});
APP = home.mount("#home");

$.getJSON('./data/blogs.json', function (json) {/*由于浏览器无法跨域访问本地的json文件，因此我采用了VS code的Live Server插件来模仿服务器请求*/
    rela = json;
    let postCount = 0;
    for (let i = 1; i <= Object.keys(rela).length; i++) {
        postCount += rela[String(i)].length;
    }
    APP.change(rela["1"], Object.keys(rela).length, postCount);
});

// 下面是美化title属性
jQuery(document).ready(function ($) {
    let sweetTitles = {
        x: 10,
        y: 20,
        tipElements: "a,span,img,div,li",
        noTitle: false,
        init: function () {
            let noTitle = this.noTitle;
            $(this.tipElements).each(function () {
                $(this).mouseover(function (e) {
                    if (noTitle) {
                        isTitle = true;
                    } else {
                        isTitle = $.trim(this.title) != '';
                    }
                    if (isTitle) {
                        this.myTitle = this.title;
                        this.title = "";
                        let tooltip =
                            "<div class='tooltip'><div class='tipsy-inner'>" + this.myTitle +
                            "</div></div>";
                        $('body').append(tooltip);
                        $('.tooltip').css({
                            "top": (e.clientY + 20) + "px",
                            "left": (e.clientX - 20) + "px"
                        }).show('fast');
                    }
                }).mouseout(function () {
                    if (this.myTitle != null) {
                        this.title = this.myTitle;
                        $('.tooltip').remove();
                    }
                }).mousemove(function (e) {
                    $('.tooltip').css({
                        "top": (e.clientY + 20) + "px",
                        "left": (e.clientX - 20) + "px"
                    });
                });
            });
        }
    };
    $(function () {
        sweetTitles.init();
    });
});


//这是在QQ分享内容时的设置
let qqUrl = window.location.href;
setShareInfo({
    title: '欢迎访问戈小戈-博客-影子网站',
    summary: '',
    pic: './img/gxg.jpg',
    url: qqUrl,
});

// 设置返回顶部
$(window).scroll(function () {
    $("#up").css("opacity", Number($("body,html").scrollTop()) * 10 / Number($('#home').height()));
});
$('#up').on('click', function (event) {
    event.preventDefault();
    $("body,html").animate({ scrollTop: 0, }, 700);
});