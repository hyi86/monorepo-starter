console.log('🚀 Client Instrumentation initialized');

window.addEventListener('error', (event) => {
  console.error('⚠️', event.error);
});
