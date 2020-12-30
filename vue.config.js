
const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const env = process.env.NODE_ENV === 'production'
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
    if (env) {}
    return config
  },

  configureWebpack: config => {
    config.resolve.extensions = ['.vue', '.js', '.jsx', '.json', '.less', '.css', '.scss', '.jpg', '.png', '.svg']
    if (env) {
      const plugins = []
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        }),
        new FileManagerPlugin({
          onEnd: {
            delete: [
              `./${process.env.VUE_APP_OUTPUTDIR}.zip`
            ],
            archive: [
              { source: `./${process.env.VUE_APP_OUTPUTDIR}`, destination: `./${process.env.VUE_APP_OUTPUTDIR}.zip` }
            ]
          }
        })
      )
      config.plugins = [...config.plugins, ...plugins]

      config.optimization = {
        splitChunks: {
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial'
            },
            antvUI: {
              name: 'chunk-antvUI',
              priority: 20,
              test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
              chunks: 'all'
            }
          }
        }
      }
    }
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: [resolve('./src/less/theme.less')]
  //   }
  // },
  transpileDependencies: [
    'ant-design-vue',
    'resize-detector'
  ],

  outputDir: process.env.VUE_APP_OUTPUTDIR,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: false
}
