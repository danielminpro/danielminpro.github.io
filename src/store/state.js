// import { proxy } from 'valtio'

// export const state = proxy({
//   clicked: 0,
//   hovered: null
// })

const state = {
  top: 0,
  pages: 9,
  sections: 10,
  threshold: 4,
  mouse: [0, 0],
  navs: [
    {
      id: 1,
      name: 'home',
      url: '#home',
      pageSize: 5.25,
      display: true,
    },
    {
      id: 2,
      name: 'work',
      url: '#work',
      pageSize: 0.94,
      display: true,
    },
    {
      id: 3,
      name: 'about',
      url: '#about',
      pageSize: 0.94,
      display: true,
    },
    {
      id: 4,
      name: 'expertise',
      url: '#expertise',
      pageSize: 0.94,
      display: true,
    },
    {
      id: 0,
      name: 'divider',
      url: '#divider',
      pageSize: 0.96,
      display: false,
    },
    {
      id: 5,
      name: 'contact',
      url: '#contact',
      pageSize: 0.95,
      display: true,
    },
  ],
}

export default state
