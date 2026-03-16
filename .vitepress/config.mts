import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/docs-demo/',
  title: "My Awesome Project",
  description: "A VitePress Site",
  head: [["link", { rel: "icon", href: "/docs-demo/corgi.svg" }]],
  themeConfig: {

    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: {
              title: 4,
              text: 2,
              titles: 1
            }
          }
        },
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '八股文', link: '/markdown-examples' },
      { text: '面经', link: '/markdown-examples' },
      { text: 'leetcode', link: '/leetcodeNote' },
      { text: '待办事项', link: '/todolist' }
    ],

    sidebar: [
      {
        text: '八股文',
        items: [
          { text: '计算机网络', link: '/markdown-examples' },
          { text: '浏览器原理', link: '/api-examples' },
          { text: 'HTML', link: '/api-examples' },
          { text: 'CSS', link: '/api-examples' },
          { text: 'JavaScript', link: '/api-examples' }

        ]
      },
      {
        text: '面经',
        items: [
          { text: '25.12.8-汇丰eng', link: '/markdown-examples' },
          { text: '1.24-好未来', link: '/haoweilai' },
          { text: '2.24-微众银行+海辰储能', link: '/weizhong.md' },
          { text: '3.13-特斯拉前端', link: '/3.13特斯拉前端面试' }

        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Tech-xin' }
    ]
  }
})
