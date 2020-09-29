module.exports = {
  pages: {
    index: {
      entry: './demo/main.js',
      template: './demo/template.html',
      title: 'Vue draggable tree view component',
    },
  },
  publicPath: '.',
  configureWebpack: {
    devtool: 'source-map',
    output: {
      libraryExport: 'default',
    },
  },
  productionSourceMap: false,
}
