module.exports = {
  stripPrefix: 'build/',
  staticFileGlobs: [
    'build/*.html',
    'build/manifest.json',
    'build/static/**/!(*map*)'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  runtimeCaching: [{
	urlPattern: /^http:\/\/swapi\.co\/api/,
   	handler: 'networkFirst'
  }],
  swFilePath: 'build/service-worker.js'
};