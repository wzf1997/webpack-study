class DemoWebpackPlugin {
  constructor() {
    console.log('plugin init')
  }
  apply(compiler) {
    compiler.hooks.compile.tap('DemoWebpackPlugin', (compilation) => {})
    // 生成资源到 output 目录之前（异步）
    compiler.hooks.emit.tapAsync('DemoWebpackPlugin', (compilation, fn) => {
      console.log(compilation, '查看数据---')
      compilation.assets['index.md'] = {
        // 文件内容
        source: function () {
          return 'this is a demo for plugin'
        },
        // 文件尺寸
        size: function () {
          return 25
        },
      }
      fn()
    })
  }
}

module.exports = DemoWebpackPlugin
