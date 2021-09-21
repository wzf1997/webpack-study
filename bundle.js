// bundle.js
const fs = require('fs')
const parser = require('@babel/parser')
const path = require('path')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const getModuleInfo = (file) => {
  const body = fs.readFileSync(file, 'utf-8')
  // 把它转成我们 抽象语法树 AST
  const ast = parser.parse(body, {
    // 表示我们要解析的是es6模块
    sourceType: 'module',
  })
  // 递归获取当前文件 所有依赖的文件
  let deps = {}
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file)
      const absPath = './' + path.join(dirname, node.source.value)
      deps[node.source.value] = absPath
    },
  })
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  })
  const moduleInfo = { file, deps, code }
  return moduleInfo
}

// 递归获取 依赖图
function parseModules(_file) {
  const entry = getModuleInfo(_file)
  const { deps } = entry
  const temps = [entry]
  Object.values(deps).forEach((dep) => {
    temps.push(getModuleInfo(dep))
  })
  // 定义依赖图
  const depsGraph = {}
  temps.forEach((temp) => {
    const { file, deps, code } = temp
    depsGraph[file] = {
      deps,
      code,
    }
  })
  return depsGraph
}
function bundle(file) {
  const str = parseModules(file)
  const depsGraph = JSON.stringify(str)
  return `(function(graph){
    function require(file) {
        var exports = {};
        function absRequire(relPath){
            return require(graph[file].deps[relPath])
        }
        (function(require, exports, code){
            eval(code)
        })(absRequire, exports, graph[file].code)
        return exports
    }
    require('${file}')
})(${depsGraph})`
  //   return ``
}

const build = (file) => {
  const content = bundle(file)
  // 写入到dist/bundle.js
  fs.mkdirSync('./dist')
  fs.writeFileSync('./dist/bundle.js', content)
}

build('./src/index.js')
