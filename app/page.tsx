import { CHECKLIST_CATEGORIES } from "@/lib/data/checklist"
import { ChecklistPage } from "@/components/checklist/ChecklistPage"

export default function Home() {
  return <ChecklistPage categories={CHECKLIST_CATEGORIES} />
}
