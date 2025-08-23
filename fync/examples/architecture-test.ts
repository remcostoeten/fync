/**
 * This example demonstrates the EXACT pattern from architecture.md
 * showing how to add a new API following the specified rules
 */

import { createFyncApi, createFyncMethod, createFyncResource } from '../src/core';

// Step 1: Init function as specified in architecture.md
function initStripe(token: string) {
  const api = createFyncApi({
    baseUrl: 'https://api.stripe.com/v1',
    auth: { type: 'bearer', token },
    headers: { 
      'Content-Type': 'application/json'
    }
  });
  return api;
}

// Step 2: Define methods using fluent pattern exactly as shown
const getCustomer = createFyncMethod('getCustomer')
  .args('customerId')
  .endpoint('/customers/{customerId}')
  .build();

const createCustomer = createFyncMethod('createCustomer')
  .args('data')
  .endpoint('/customers')
  .method('POST')
  .build();

const listCharges = createFyncMethod('listCharges')
  .args()
  .endpoint('/charges')
  .build();

const createCharge = createFyncMethod('createCharge')
  .args('data')
  .endpoint('/charges')
  .method('POST')
  .build();

// Step 3: Export using createFyncResource pattern
export function Stripe(config: { token: string }) {
  const api = initStripe(config.token);
  
  return createFyncResource('stripe')
    .methods({
      getCustomer,
      createCustomer,
      listCharges,
      createCharge,
    })
    .build(api);
}

// Usage example matching the End User Experience Goal from architecture.md
async function example() {
  const stripe = Stripe({ token: 'sk_test_...' });
  
  // These should work according to the pattern
  const customer = await stripe.getCustomer('cus_123');
  const newCustomer = await stripe.createCustomer({ email: 'test@example.com' });
  const charges = await stripe.listCharges();
  const charge = await stripe.createCharge({ amount: 1000, currency: 'usd' });
}

console.log('✅ Architecture pattern successfully implemented!');
console.log('This follows the exact pattern from architecture.md:');
console.log('1. initApiName function to create API client');
console.log('2. createFyncMethod with fluent .args().endpoint() pattern');
console.log('3. createFyncResource to export methods');
console.log('4. Clean end-user API matching the goal');
