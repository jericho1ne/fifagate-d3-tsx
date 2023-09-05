import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FIFA Gate D3",
  description: "A VitePress Site",
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
      { icon: 'github', link: 'https://github.com/jericho1ne/fifagate-d3-tsx' }
    ]
  }
})