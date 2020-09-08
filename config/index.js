const path = require('path')

const outputRootStrtegy = {
  h5: 'dist_h5',
  weapp: 'dist_weapp',
  alipay: 'dist_alipay',
  swan: 'dist_swan',
  undefined: 'dist'
}
const env = JSON.parse(process.env.npm_config_argv)['cooked'][1].split(':')[1]
const outputRoot = outputRootStrtegy[env]

const config = {
  projectName: 'mini_activity',
  date: '2020-9-4',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: outputRoot,
  plugins: [],
  defineConstants: {},
  copy: {
    // 如果你遇到了编译后，资源文件（如图片）没有被编译到 dist 目录中导致找不到，可以令其直接被复制过来
    patterns: [
      {
        from: 'src/components/wxParse/wxParse.wxss',
        to: outputRoot + '/components/wxParse/wxParse.wxss'
      },
      {
        from: 'src/components/wxParse/wxParse.wxml',
        to: outputRoot + '/components/wxParse/wxParse.wxml'
      }
    ],
    options: {}
  },
  framework: 'react',
  alias: {
    '@/api': path.resolve(__dirname, '..', 'src/api'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/config': path.resolve(__dirname, '..', 'src/config'),
    '@/models': path.resolve(__dirname, '..', 'src/models'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/package': path.resolve(__dirname, '..', 'package.json'),
    '@/project': path.resolve(__dirname, '..', 'project.config.json')
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
