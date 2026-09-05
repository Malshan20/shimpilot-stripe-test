import Stripe from "stripe";

// Bound to a non-obvious variable name on purpose: verifies Shimpilot
// tracks the client instance rather than pattern-matching on "stripe.".
const client = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15" as Stripe.LatestApiVersion,
});

/** EXPECT ACTIVE — subscriptions.create renamed parameter from 9.0.0. */
export async function subscribe(customerId: string, priceId: string) {
  return client.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
  });
}

/** EXPECT ACTIVE — subscriptions.update from 9.0.0. */
export async function changePlan(subscriptionId: string, itemId: string, priceId: string) {
  return client.subscriptions.update(subscriptionId, {
    items: [{ id: itemId, price: priceId }],
  });
}

/** EXPECT UPCOMING — customers.update from 13.0.0. */
export async function renameCustomer(customerId: string, name: string) {
  return client.customers.update(customerId, { name });
}

/** EXPECT UPCOMING — customers.createSource from 10.0.0. */
export async function attachSource(customerId: string, token: string) {
  return client.customers.createSource(customerId, { source: token });
}
