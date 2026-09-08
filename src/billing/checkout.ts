import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15" as Stripe.LatestApiVersion,
});

/** EXPECT ACTIVE — charges.create deprecated from 8.0.0, repo is on 9.16.0. */
export async function createLegacyCharge(amount: number, currency: string, source: string) {
  return stripe.paymentIntents.create({ amount, currency, payment_method: source, confirm: true, automatic_payment_methods: { enabled: true } });
}

/** EXPECT ACTIVE — charges.capture deprecated from 8.0.0. */
export async function captureLegacyCharge(paymentIntentId: string) {
  return stripe.paymentIntents.capture(paymentIntentId);
}

/** EXPECT UPCOMING — paymentIntents.create renamed parameter from 12.0.0. */
export async function createIntent(amount: number, currency: string) {
  return stripe.paymentIntents.create({ amount, currency, confirm: true, automatic_payment_methods: { enabled: true } });
}

/** EXPECT UPCOMING — paymentIntents.confirm from 12.0.0. */
export async function confirmIntent(intentId: string) {
  return stripe.paymentIntents.confirm(intentId);
}

/** EXPECT UPCOMING — checkout.sessions.create behavior change from 10.0.0. */
export async function createCheckoutSession(priceId: string) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
  });
}
