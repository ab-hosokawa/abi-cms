import localConfig from './config.loacl.js'
import productionConfig from './config.production.js'

const hostname = window.location.hostname
let config

if (hostname === 'dev-cms.abi-system.net') {
  config = productionConfig
} else {
  config = localConfig
}

export default config
