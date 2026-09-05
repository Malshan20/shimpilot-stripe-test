const Stripe = require("stripe");

// CommonJS require() form — verifies the scanner handles both module
// syntaxes, not just ESM default imports.
const gateway = new Stripe(process.env.STRIPE_SECRET_KEY);

/** EXPECT UPCOMING — orders.create removed from 11.0.0. */
export async function createOrder(currency: string, email: string) {
  return gateway.orders.create({ currency, email });
}

/** EXPECT UPCOMING — invoices.pay renamed parameter from 11.5.0. */
export async function payInvoice(invoiceId: string) {
  return gateway.invoices.pay(invoiceId);
}

/** EXPECT ACTIVE — balance.retrieve moved endpoint from 9.0.0. */
export async function getBalance() {
  return gateway.balance.retrieve();
}

/** EXPECT UPCOMING — refunds.create renamed parameter from 12.5.0. */
export async function refund(chargeId: string) {
  return gateway.refunds.create({ charge: chargeId });
}

/** EXPECT UPCOMING — terminal.readers.processPaymentIntent from 14.0.0. */
export async function processOnReader(readerId: string, intentId: string) {
  return gateway.terminal.readers.processPaymentIntent(readerId, {
    payment_intent: intentId,
  });
}
