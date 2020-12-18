const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  },
  chainWebpack: config => {
    config.devServer.disableHostCheck(true)
  }
}
