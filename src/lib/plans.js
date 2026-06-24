// Enforcement limits per plan, mirrors the pricing table in the product spec.
export const PLAN_LIMITS = {
  free: { courses: 3, exportsPerDay: 2, aiGenerationsPerMonth: 5, collaborators: 1, customAiKey: false },
  pro: { courses: Infinity, exportsPerDay: Infinity, aiGenerationsPerMonth: 50, collaborators: 5, customAiKey: true },
  enterprise: { courses: Infinity, exportsPerDay: Infinity, aiGenerationsPerMonth: Infinity, collaborators: Infinity, customAiKey: true },
};

export function getPlanLimits(subscription) {
  return PLAN_LIMITS[subscription] || PLAN_LIMITS.free;
}
