module.exports = {
    title: '石志凯的技术杂货铺',
    description: '开发笔记',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '技术货架', link: '/file/' }
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
                        'HtmlAndCss/等比缩放',
                        'HtmlAndCss/水平垂直居中',
                        'HtmlAndCss/flex布局',
                    ]
                },
                {
                    title: 'Js',
                    collapsable: true,
                    children: [
                        'js/call&apply&bind',
                        'js/数组常用方法',
                        'js/数组扁平化',
                        'js/数组去重',
                        'js/数组旋转',
                        'js/深拷贝',
                        'js/防抖和节流',
                        'js/promise',
                        'js/实现promise',
                        'js/实现map方法'
                    ]
                },
                {
                    title: 'Vue',
                    collapsable: true,
                    children: [
                        'vue/vue2使用',
                        'vue/vue2生命周期',
                       'vue/Vue',
                       'vue/数据双向绑定'
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
                        'http/http'
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
                    title: '面试题',
                    collapsable: true,
                    children: [
                        '面试题/经典面试题'
                    ]
                }
            ]
        }
    }
  }
