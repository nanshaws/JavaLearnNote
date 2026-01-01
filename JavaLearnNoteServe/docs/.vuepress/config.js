module.exports = {
    title: "想飞跃的鱼",
    description: "想飞跃的鱼",
    head: [
      ['link',{rel: 'icon', href: '/assets/java.png'}],
      ['meta',{name: 'author',content:"nanshaws"}],
      ['meta',{name: 'keywords',content:"java9到java21的新特性"}],
      ['script', {
      async: true,
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3949519489131784",
      crossorigin: "anonymous"
	  }]
    ],
    themeConfig: {
      lastUpdated: '更新时间',
      logo: '/assets/img/logo.png',
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Docker', link: '/docker/' },
		{ text: '🚀 资源工具箱', link: 'https://nanshaws.top' },
        { text: 'Libgdx', link: '/libgdx/' },
        { text: 'Github', link: 'https://github.com/nanshaws/JavaLearnNote' },
        {
            text: 'Languages',
            ariaLabel: 'Language Menu',
            items: [
              { text: 'Chinese', link: '/zh/guide/' },
              { text: 'English', link: '/en/guide/' }
            ]
          },
      ],
      sidebar: 'auto'
    }
  }