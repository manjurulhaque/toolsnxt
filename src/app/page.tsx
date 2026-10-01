import { HeroIntro, SummaryTile, ToolPanel } from "@/components/tool-page"
import { ToolSearchDirectory } from "@/components/tool-search-directory"
import { toolCategories, tools, toolsByCategory } from "@/lib/tools"

export default function HomePage() {
  return (
    <div className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <ToolPanel className="sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <HeroIntro eyebrow="Tool directory" title="Browser tools for everyday work.">
                Pick a utility below. Most tools process files and text locally in your browser, so
                quick jobs stay quick.
              </HeroIntro>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-80">
              <SummaryTile label="Tools" value={tools.length} />
              <SummaryTile label="Groups" value={toolCategories.length} />
              <SummaryTile label="Local" value="100%" />
            </div>
          </div>
        </ToolPanel>

        <ToolSearchDirectory
          allTools={tools}
          categories={toolCategories}
          toolsByCategory={toolsByCategory}
        />
      </main>
    </div>
  )
}
