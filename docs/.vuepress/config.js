module.exports = {
    title: '石志凯的技术杂货铺',
    description: '开发笔记',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' }
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
                    title: 'vue',
                    collapsable: true,
                    children: [
                       'vue/Vue',
                       'vue/数据双向绑定'
                    ]
                },
                {
                    title: 'git',
                    collapsable: true,
                    children: [
                       'git/常用命令'
                    ]
                }
            ]
        }
    }
  }