const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  esbuild: {
    entryPoints: ['./src/index.ts'],
    minify: false
  },
  postbuild: async () => {
    const cpy = (await import('cpy')).default
    await cpy(
      [
        'src/**/*.json', // Copy all .json files
        '!src/**/*.{tsx,ts,js,jsx,xlsx}' // Ignore already built files
      ],
      compilerOptions.outDir || 'dist'
    )
  }
}
