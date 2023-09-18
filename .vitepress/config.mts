import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FIFAGate",
  description: "2015 FIFA corruption case",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Demo', link: '/demo' }
    ],

    sidebar: [
      {
        text: 'Demo',
        items: [
          { text: 'Fifagate force graph', link: '/demo' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jericho1ne/fifagate-d3' }
    ]
  }
})