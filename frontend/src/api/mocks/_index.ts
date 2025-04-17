// External libraries
import { setupWorker } from "msw/browser";

// Internal utilities
import { env } from "@/env";

// Handlers
import { signInHandler } from "./SignInHandler";
import { registerRestaurantHandler } from "./RegisterRestaurantHandler";
import { getDailyOrdersAmountHandler } from "./GetDailyOrdersAmountHandler";
import { getMonthlyOrdersAmountHandler } from "./GetMonthlyOrdersAmountHandler";
import { getMonthlyCanceledOrdersAmountHandler } from "./GetMonthlyCanceledOrdersAmountHandler";
import { getMonthlyRevenueHandler } from "./GetMonthlyRevenueHandler";
import { getDailyRevenuePeriodHandler } from "./GetDailyRevenuePeriodHandler";
import { getPopularProductsHandler } from "./GetPopularProductsHandler";
import { getProfileHandler } from "./GetProfileHandler";
import { getManagedRestaurantHandler } from "./GetManagedRestaurantHandler";
import { updateProfileHandler } from "./UpdateProfileHandler";
import { getOrdersHandler } from "./GetOrdersHandler";
import { getOrdersDetailsHandler } from "./GetOrdersDetailsHandler";
import { approveOrderHandler } from "./ApproveOrderHandler";
import { cancelOrderHandler } from "./CancelOrderHandler";
import { deliverOrderHandler } from "./DeliverOrderHandler";
import { dispatchOrderHandler } from "./DispatchOrderHandler";

export const worker = setupWorker(
  signInHandler,
  registerRestaurantHandler,
  getDailyOrdersAmountHandler,
  getMonthlyOrdersAmountHandler,
  getMonthlyCanceledOrdersAmountHandler,
  getMonthlyRevenueHandler,
  getDailyRevenuePeriodHandler,
  getPopularProductsHandler,
  getProfileHandler,
  getManagedRestaurantHandler,
  updateProfileHandler,
  getOrdersHandler,
  getOrdersDetailsHandler,
  approveOrderHandler,
  cancelOrderHandler,
  deliverOrderHandler,
  dispatchOrderHandler
);

export async function enableMSW() {
  if (env.MODE !== "test") return;

  await worker.start();
}
