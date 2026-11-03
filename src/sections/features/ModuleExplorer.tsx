import { useRef, useState } from "react";
import { featuresListCopy, featuresPage, ownerModules, residentModules, type ModuleSummary } from "@/content/features";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { AudienceTabs, type Audience } from "./AudienceTabs";
import { ModuleRow } from "./ModuleRow";
import { ModuleSideNav } from "./ModuleSideNav";
import { useScrollSpy } from "./useScrollSpy";

const PREFIX = "features";
const lists: Record<Audience, { modules: readonly ModuleSummary[]; label: string; lead: string; anchor: string }> = {
  owners: { modules: ownerModules, label: featuresPage.tabs.owners, lead: featuresListCopy.ownersLead, anchor: "owner" },
  residents: { modules: residentModules, label: featuresPage.tabs.residents, lead: featuresListCopy.residentsLead, anchor: "resident" },
};
const audiences = ["owners", "residents"] as const satisfies readonly Audience[];
const anchorFor = (a: Audience, id: string) => `${lists[a].anchor}-${id}`;

/** Owners | Residents tab switcher (sticky under the header) + zig-zag module rows + scroll-spy side nav. */
export function ModuleExplorer() {
  const [audience, setAudience] = useState<Audience>("owners");
  const root = useRef<HTMLDivElement>(null);
  const current = lists[audience];
  const navItems = current.modules.map((mod) => ({ anchorId: anchorFor(audience, mod.id), title: mod.title, icon: mod.icon }));
  const active = useScrollSpy(navItems.map((n) => n.anchorId));

  const onChange = (next: Audience) => {
    if (next === audience) return;
    setAudience(next);
    track("audience_toggle", { audience: next, location: "features" });
    const el = root.current;
    if (el && el.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "auto" });
    }
  };

  return (
    <div ref={root} id="modules" className="relative bg-white">
      <div className="sticky top-16 z-30 border-y border-gray-200/70 bg-white/85 backdrop-blur-xl">
        <div className="container-page flex justify-center py-2.5">
          <AudienceTabs
            tabs={audiences.map((id) => ({ id, label: lists[id].label }))}
            value={audience}
            onChange={onChange}
            idPrefix={PREFIX}
            label={featuresListCopy.tabsLabel}
          />
        </div>
      </div>

      <div className="container-page grid gap-12 pt-12 pb-8 md:pt-16 lg:grid-cols-[220px_minmax(0,1fr)] xl:gap-16">
        <aside className="hidden lg:block">
          <ModuleSideNav items={navItems} active={active} layoutKey={audience} />
        </aside>

        <div className="min-w-0">
          {audiences.map((a) => {
            const list = lists[a];
            const selected = a === audience;
            return (
              <div
                key={a}
                role="tabpanel"
                id={`${PREFIX}-panel-${a}`}
                aria-labelledby={`${PREFIX}-tab-${a}`}
                hidden={!selected}
                tabIndex={0}
                className="outline-none"
              >
                <header className="mb-4 max-w-2xl">
                  <h2 className="text-h2 font-bold">{list.label}</h2>
                  <p className="mt-3 text-lead text-gray-600">{list.lead}</p>
                </header>
                <div className={cn("divide-y divide-gray-100")}>
                  {list.modules.map((mod, i) => (
                    <ModuleRow
                      key={mod.id}
                      module={mod}
                      index={i}
                      audience={a}
                      anchorId={anchorFor(a, mod.id)}
                      comingSoonLabel={featuresListCopy.comingSoon}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
