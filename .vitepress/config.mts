import { defineConfig } from 'vitepress'
import { set_sidebar } from "../utils/auto_silebar.js";

// https://vitepress.dev/reference/site-config
console.log(JSON.stringify(set_sidebar('web')));
console.log(222); 

export default defineConfig({
  title: "KnightKzzz",
  description: "一个用于记录、学习、分享的博客网站",
  themeConfig: {
    outlineTitle:"页面导航",
    outline:[1,6],// 定义标题级别,字符串"deep"相当于是[2,6] 
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        text: 'Web', 
        items: [
          { text: 'UniApp', link: '/web/UniApp/微信小程序' },
          { text: '前端工程化', link: '/web/前端工程化/模块化' },
          { text: 'Vue2', link: '/web/Vue2/Vue2源码' },
          { text: 'Vue3', link: '/web/Vue3/Vue3源码' },
        ]
      },
      { text: '随想', link: '/markdown-examples' }
    ],

    sidebar: {
      "/web/": set_sidebar("web"),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      copyright: "KnightKzzz专属博客/v1.0.0",
    },
  }
})
