import type { FeatureModule } from "@/content/features";
import { ComplaintsMock } from "./ComplaintsMock";
import { DuesMock } from "./DuesMock";
import { OccupancyMock } from "./OccupancyMock";
import { ProfitMock } from "./ProfitMock";
import { RolesMock } from "./RolesMock";

const mocks: Record<FeatureModule["mock"], () => React.JSX.Element> = {
  occupancy: OccupancyMock,
  dues: DuesMock,
  complaints: ComplaintsMock,
  profit: ProfitMock,
  roles: RolesMock,
};

/** Picks the live-coded mock for a feature deep page. */
export function ModuleMock({ kind }: { kind: FeatureModule["mock"] }) {
  const Mock = mocks[kind];
  return <Mock />;
}
