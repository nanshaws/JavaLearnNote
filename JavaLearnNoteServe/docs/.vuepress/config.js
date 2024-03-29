module.exports = {
    title: "想飞跃的鱼",
    description: "想飞跃的鱼",
    head: [
      ['meta',{name: 'author',content:"nanshaws"}],
      ['meta',{name: 'keywords',content:"java9到java21的新特性"}],
    ],
    themeConfig: {
      logo: '/assets/img/logo.png',
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Docker', link: '/docker/' },
        { text: 'Github', link: 'https://github.com/nanshaws/JavaLearnNote' },
        {
            text: 'Languages',
            ariaLabel: 'Language Menu',
            items: [
              { text: 'Chinese', link: '/language/chinese/' },
              { text: 'English', link: '/language/japanese/' }
            ]
          },
      ],
      sidebar: 'auto'
    }
  }