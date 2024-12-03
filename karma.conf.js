module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false 
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: '.' }, 
        { type: 'text-summary' }     
      ]
    },
    reporters: ['progress', 'coverage'], 
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
