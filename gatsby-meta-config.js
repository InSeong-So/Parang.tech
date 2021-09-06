const name = 'InSeong-So';
module.exports = {
  title: `Parang Tech Blog`,
  description: `Blog posted about ...`,
  author: `${name}`,
  introduction: `꿈을 향하는 개발자입니다. 생산성, 효율성, 자동화, 깊이 있는 공부에 관심이 많습니다.`,
  siteUrl: `https://parang.tech`, // Your blog site url
  social: {
    twitter: ``, // Your Twitter account
    github: `${name}`, // Your GitHub account
    medium: ``, // Your Medium account
    facebook: ``, // Your Facebook account
    linkedin: `in-seong`, // Your LinkedIn account
    instagram: ``, // Your Instagram account
  },
  icon: `content/assets/felog.png`, // Add your favicon
  thumbnail: `https://parang.tech/parang-io.png`,
  resume: {
    title: 'About InSeong-So',
    description: 'docs: Update RESUME.md for introducing myself',
    thumbnail: 'https://parang.tech/about_thumbnail.png',
  },
  keywords: [
    `blog`,
    `javascript`,
    `typescript`,
    `web`,
    `react`,
    `vue`,
    `frontend`,
    `development`,
  ],
  comment: {
    disqusShortName: '', // Your disqus-short-name. check disqus.com.
    utterances: 'InSeong-So/parang.tech', // Your repository for archive comment
  },
  configs: {
    countOfInitialPost: 10, // Config your initial count of post
  },
  sponsor: {
    buyMeACoffeeId: 'inseong',
  },
  share: {
    facebookAppId: '', // Add facebookAppId for using facebook share feature v3.2
  },
  ga: '0', // Add your google analytics tranking ID
}
