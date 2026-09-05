import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15" as Stripe.LatestApiVersion,
});

/**
 * NEGATIVE CONTROL — none of these symbols are in Shimpilot's registry.
 * If a scan reports findings from this file, the scanner is producing
 * false positives and something is wrong.
 */
export async function listEverything() {
  const charges = await stripe.charges.list({ limit: 10 });
  const customers = await stripe.customers.list({ limit: 10 });
  const prices = await stripe.prices.list({ limit: 10 });
  return { charges, customers, prices };
}

/**
 * NEGATIVE CONTROL — "charges.create" appearing in a string and a
 * comment must NOT produce a finding. Regex-based scanners fail this.
 * stripe.charges.create is mentioned here deliberately.
 */
export const AUDIT_LABEL = "stripe.charges.create";
