import DefaultTheme from 'vitepress/theme'
import Roster from './Roster.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Roster', Roster)
  },
}
