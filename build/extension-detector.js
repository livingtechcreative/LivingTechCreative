// Extension detector script - helps identify what's causing the errors
(function() {
  'use strict';
  
  console.log('🔍 Extension Detector: Starting analysis...');
  
  // Check for common extensions that might cause these errors
  var suspiciousExtensions = [];
  
  // Check for Chrome extensions
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    try {
      chrome.runtime.getManifest();
      suspiciousExtensions.push('Chrome Extension API detected');
    } catch (e) {
      // Expected if no extension
    }
  }
  
  // Check for Firefox extensions
  if (typeof browser !== 'undefined' && browser.runtime) {
    try {
      browser.runtime.getManifest();
      suspiciousExtensions.push('Firefox Extension API detected');
    } catch (e) {
      // Expected if no extension
    }
  }
  
  // Check for specific extension patterns in the page
  var scripts = document.querySelectorAll('script[src]');
  var extensionScripts = [];
  
  scripts.forEach(function(script) {
    var src = script.src;
    if (src.includes('extension') || 
        src.includes('chrome-extension') || 
        src.includes('moz-extension') ||
        src.includes('safari-extension')) {
      extensionScripts.push(src);
    }
  });
  
  // Check for extension-related global variables
  var extensionGlobals = [];
  var globalVars = ['chrome', 'browser', 'safari', 'webkit'];
  
  globalVars.forEach(function(varName) {
    if (window[varName]) {
      extensionGlobals.push(varName);
    }
  });
  
  // Report findings
  console.log('🔍 Extension Detector Results:');
  console.log('Suspicious Extensions:', suspiciousExtensions);
  console.log('Extension Scripts:', extensionScripts);
  console.log('Extension Globals:', extensionGlobals);
  
  if (suspiciousExtensions.length > 0 || extensionScripts.length > 0 || extensionGlobals.length > 0) {
    console.warn('⚠️ Extension activity detected that might be causing the errors');
  } else {
    console.log('✅ No obvious extension activity detected');
  }
  
  // Monitor for the specific errors
  var errorCount = 0;
  var originalError = console.error;
  
  console.error = function() {
    var message = Array.prototype.join.call(arguments, ' ');
    if (message.includes('tx_attempts_exceeded') || message.includes('tx_ack_timeout')) {
      errorCount++;
      console.warn('🚨 Extension error detected #' + errorCount + ':', message.substring(0, 100) + '...');
      
      // Try to identify the source
      var stack = new Error().stack;
      if (stack) {
        console.warn('Stack trace:', stack);
      }
    }
    originalError.apply(console, arguments);
  };
  
  // Report after 5 seconds
  setTimeout(function() {
    console.log('🔍 Extension Detector: Detected ' + errorCount + ' extension errors in the last 5 seconds');
  }, 5000);
  
})();
