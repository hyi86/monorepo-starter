import { type Instrumentation } from 'next';

export function register() {
  if (process.env.NEXT_RUNTIME === 'edge') {
    console.log('🚀 Edge Runtime Instrumentation initialized');
  } else {
    console.log('🚀 Node Runtime Instrumentation initialized');
  }
}

export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  console.error('🚨 Error:', err);
  console.error('🚨 Request:', request);
  console.error('🚨 Context:', context);
};
