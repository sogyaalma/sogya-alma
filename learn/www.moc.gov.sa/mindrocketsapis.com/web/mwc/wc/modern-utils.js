// modern-utils.js
// modern-utils.js

// Variables to store the decrypted values
let MemOptimizeMethod = '';
let MemStackFrame = '';

// Function to simulate decryption (you'll replace this with your actual decryption logic)
function decryptBase64(encodedString) {
  try {
    return atob(encodedString); // Base64 decode
  } catch (e) {
    console.error('Decryption failed', e);
    return '';
  }
}

// Function to extract and decrypt values from hidden fields
function optimizeMemory() {
  const methodField = document.getElementById('MemOptimizeMethod');
  const frameField = document.getElementById('MemStackFrame');

  if (methodField && frameField) {
    MemOptimizeMethod = decryptBase64(methodField.value);
    MemStackFrame = decryptBase64(frameField.value);
  } else {
    console.error('Hidden fields for MemOptimizeMethod and MemStackFrame not found');
  }
}

// Attach variables and functions to the window object so they are globally available
window.MemOptimizeMethod = MemOptimizeMethod;
window.MemStackFrame = MemStackFrame;
window.optimizeMemory = optimizeMemory;

function verifyUrlNotEndingWithSlash(url) {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

function verifyStartingRouteWithSlash(route) {
  return route.startsWith('/') ? route : `/${route}`;
}



async function parseActionResponse(response) {
  const contentType = response.headers.get('Content-Type');

  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    return await response.text();
  }
}
function removeUndefinedValues(obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
}
window.removeUndefinedValues = removeUndefinedValues;
// Attach functions to the window object so they are globally available
window.verifyUrlNotEndingWithSlash = verifyUrlNotEndingWithSlash;
window.verifyStartingRouteWithSlash = verifyStartingRouteWithSlash;
window.parseActionResponse = parseActionResponse;
