module.exports = {
    title: '石志凯的技术杂货铺',
    keywords: '石志凯，szk、志凯、vue、react、js、html、css、前端',
    description: '石志凯，石志凯的博客，szk、志凯、vue、react、js、html、css、前端',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '技术货架', link: '/file/' },
            // { text: '货铺老板', link: '/me/' }
        ],
        sidebar: {
            '/file/': [
                {
                    title: '前言',
                    collapsable: false,
                    children: [
                        '',
                    ]
                },
                {
                    title: 'Html&Css',
                    collapsable: true,
                    children: [
                        'HtmlAndCss/CSS选择器的权重',
                        'HtmlAndCss/等比缩放',
                        'HtmlAndCss/水平垂直居中',
                        'HtmlAndCss/columnsAuto',
                        'HtmlAndCss/flex布局',
                    ]
                },
                {
                    title: 'Js',
                    collapsable: true,
                    children: [
                        'js/call&apply&bind',
                        'js/原型原型链',
                        'js/同步异步',
                        'js/ES6+',
                        'js/数组常用方法',
                        'js/数组扁平化',
                        'js/数组去重',
                        'js/数组旋转',
                        'js/深拷贝',
                        'js/防抖和节流',
                        'js/promise',
                        'js/实现promise',
                        'js/实现map方法',
                        'js/webRoute'
                    ]
                },
                {
                    title: 'Vue',
                    collapsable: true,
                    children: [
                        'vue/vue2使用',
                        'vue/vue3',
                        'vue/vue2生命周期',
                       'vue/Vue',
                       'vue/数据双向绑定'
                    ]
                },
                {
                    title: 'Webpack',
                    collapsable: true,
                    children: [
                        'webpack/webpack',
                        'webpack/babel'
                    ]
                },
                {
                    title: 'Node',
                    collapsable: true,
                    children: [
                        'node/CORS',
                        'node/nginx',
                        'node/mySQL'
                    ]
                },
                {
                    title: '算法',
                    collapsable: true,
                    children: [
                        '算法/排序',
                        '算法/斐波那契',
                        '算法/数据结构'
                    ]
                },
                {
                    title: 'Git',
                    collapsable: true,
                    children: [
                        'git/git常用命令',
                        'git/github绑定ssh'
                    ]
                },
                {
                    title: 'Http',
                    collapsable: true,
                    children: [
                        'http/http',
                        'http/浏览器缓存',
                        'http/TCP&UDP'
                    ]
                },
                {
                    title: 'Linux',
                    collapsable: true,
                    children: [
                       'linux/linux常用命令'
                    ]
                },
                {
                    title: '其他',
                    collapsable: true,
                    children: [
                        'other/经典面试题',
                        'other/问答题'
                    ]
                }
            ]
        }
    }
  }
