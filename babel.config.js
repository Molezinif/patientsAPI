module.exports = {
  presets: [
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '^@/(.+)': './src/\\1'
        }
      }
    ],
    'babel-plugin-parameter-decorator',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ],
  ignore: ['**/*.spec.ts']
}
