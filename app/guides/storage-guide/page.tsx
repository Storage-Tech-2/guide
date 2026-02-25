import type { Metadata } from "next";
import Link from "next/link";
import SectionComparisonColumns from "./section-comparison-columns";

export const metadata: Metadata = {
  title: "List of Complete Main Storages",
  description:
    "Structured overview of complete main storages published in Storage Tech, with sorting capabilities, speed, size, and links.",
};

type ResourceLink = {
  label: string;
  href: string;
};

type StorageEntry = {
  name: string;
  version: string;
  creators: string;
  sorts: string;
  speed: string;
  size: string;
  extras: string;
  issues: string;
  links: ResourceLink[];
};

type StorageSection = {
  id: string;
  title: string;
  description: string;
  entries: StorageEntry[];
};

const notes = [
  "If you are a complete beginner, start from smaller MIS systems like Compact Categorizer, YAMIS, or J-MIS.",
  "Never put renamed blocker items used during filter setup into your normal input.",
  "Avoid unloading any storage while it is actively sorting unless chunkloading is correctly configured.",
  "Use litematica verifier and triple-check inventory filters before debugging behavior.",
  "Many designs require chunk alignment; use F3+G while building.",
  "Speed is not the only metric. Estimate your real input volume per project before choosing.",
  "Avoid gameplay-changing shulker stacking methods that can break systems.",
  "If something appears wrong, test in a world download first and then ask specific questions with screenshots.",
];

const sections: StorageSection[] = [
  {
    id: "mis",
    title: "Multi Item Sorting",
    description: "Systems focused on MIS (multi-item-sorting), with varying complexity and throughput.",
    entries: [
      {
        name: "Compact Categorizer",
        version: "1.19+",
        creators: "Inspector Talon, metamilo",
        sorts:
          "Stackable items only. 1-wide slices with up to 23 or 50 item types depending on version.",
        speed: "Up to ~2/3 hopper speed (~6000 items/hour).",
        size: "17x18x27 (2236 blocks, smaller version).",
        extras: "Simple baseline design; one provided version includes chunkloader.",
        issues: "No known major issues in guide notes.",
        links: [
          { label: "Webpage", href: "https://storagecatalog.org/archives/MIS001-Compact-Categorizer/" },
          { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/749137424684285992/1151464188787576853" },
        ],
      },
      {
        name: "B-MIS",
        version: "1.20+",
        creators: "Borborad13",
        sorts: "Stackable items only. 1-wide categories up to 50 item types.",
        speed: "~1/3 hopper speed (~3000 items/hour).",
        size: "16x18x16 (2322 blocks, smaller version).",
        extras: "Very simple cart categorizer.",
        issues: "Clear overflow before full; no unload-proof guarantees.",
        links: [
          { label: "Webpage", href: "https://storagecatalog.org/archives/MIS007-Borb-MIS/" },
          { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/1142131464893370429/1145111266260684971" },
        ],
      },
      {
        name: "Simple multi-item sorter",
        version: "1.16+",
        creators: "UnnervingS",
        sorts: "Stackable items + shulker unload. 2-wide categories up to 54 item types.",
        speed: "~hopper speed (~9000 items/hour).",
        size: "34x32x31 (4639 blocks).",
        extras: "Chunkloader included.",
        issues: "Older MIS base; clear unsorted/overflow before full.",
        links: [
         { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/985217000232087593/988473035294117888" },
        ],
      },
      {
        name: "Scorpio MIS",
        version: "1.19+",
        creators: "Scorpio",
        sorts: "Stackable items + shulker unload. 1-wide categories up to 50 item types.",
        speed: "Up to 2.4x hopper speed.",
        size: "25x24x31 (5083 blocks, undecorated).",
        extras: "Chunkloader and small restock station.",
        issues: "Guide notes mention breakage during testing in one report.",
        links: [
          { label: "Webpage", href: "https://storagecatalog.org/archives/MIS003-Simple-Cart-based-MIS-Storage-Scorpio-MIS/" },
          { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/749137424684285992/1379029443733094513" },
        ],
      },
    ],
  },
  {
    id: "mis-bulk",
    title: "Multi Item Sorting + Bulk",
    description: "MIS designs that also include significant single-item bulk storage behavior.",
    entries: [
      {
        name: "J-MIS v3",
        version: "1.16+",
        creators: "JayRoi",
        sorts: "MIS + shulker unload + bulk loading. 32 MIS categories up to 54 item types.",
        speed: "~hopper speed (~9000 items/hour).",
        size: "29x33x29 (11499 blocks).",
        extras: "Chunkloader, restock, pause, and safety behavior.",
        issues: "No known major issues in guide notes.",
        links: [
          { label: "Webpage", href: "https://storagecatalog.org/archives/MIS005-J-MIS-Jay-s-Moony-Item-Sorter/" },
          { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/749137424684285992/1182780067164717197" },
        ],
      },
      {
        name: "YAMIS",
        version: "1.19+",
        creators: "Etikle, skyzy",
        sorts: "MIS + shulker unload + bulk loading. 32 MIS categories, up to 64 bulk items.",
        speed: "~hopper speed (~9000 items/hour).",
        size: "29x21x49 (17610 blocks).",
        extras: "Chunkloader, pause lever, player portal.",
        issues: "Noisy/laggier on low-end hardware; avoid spamming box-calling.",
        links: [
          { label: "Webpage", href: "https://storagecatalog.org/archives/MIS002-YAMIS-Multi-Item-Storage-System/" },
          { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/749137424684285992/1361920281634930718" },
        ],
      },
      {
        name: "XianyuMIS v2",
        version: "1.21+",
        creators: "siderXD, Capybruh",
        sorts: "MIS + bulk + non-stackable coverage, with optional full-box sorting mode.",
        speed: "Up to ~9.7x hopper speed (around 4x average in guide notes).",
        size: "66x39x58 decorated (40679 blocks), smaller undecorated variant listed.",
        extras: "Chunkloaders, unstackable sorter, high throughput.",
        issues: "Keep overflow managed; do not edit MIS filters while active.",
        links: [
          { label: "Webpage", href: "https://storagecatalog.org/archives/MIS010-XianyuMIS-V2/" },
          { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/833152072618606652/1465491404540088372" },
        ],
      },
      {
        name: "G-MIS v2.1",
        version: "1.19+",
        creators: "GanglesXIII",
        sorts: "MIS + bulk + non-stackable coverage, optional full-box path with secondary input.",
        speed: "Up to ~9x hopper speed under optimal conditions (~1x average stated).",
        size: "57x86x84 decorated (34515 blocks).",
        extras: "Chunkloaders and safety features.",
        issues: "Guide notes flag unstackable reliability and potential lag in heavy MIS usage.",
        links: [
          { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/833152072618606652/1080307180076544020" },
        ],
      },
      {
        name: "CartMIS v3",
        version: "1.19+",
        creators: "Inspector Talon, RaPsCaLlioN1138, Christone",
        sorts: "MIS + hybrid bulk loaders + some non-stackables.",
        speed: "Up to 16x hopper speed (144000 items/hour).",
        size: "128x47x68 (43100 blocks).",
        extras: "Unstackable sorting, chunkloaders, indicators.",
        issues: "Some rail placements are tricky; keep overflow from filling.",
        links: [
          { label: "Webpage", href: "https://storagecatalog.org/archives/MIS008-Complete-Cart-Based-Storage/" },
          { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/749137424684285992/1251974389088391259" },
        ],
      },
    ],
  },
  {
    id: "main-storage",
    title: "MIS + Chest Halls + Bulk",
    description: "Large complete main storages typically aimed at technical servers.",
    entries: [
      {
        name: "luckeY Main Storage",
        version: "1.21.9+",
        creators: "Kendiii",
        sorts: "Chest halls + MIS + bulk + many non-stackables via dedicated mechanisms.",
        speed: "Up to 16x hopper speed (144000 items/hour).",
        size: "101x46x129 (61831 blocks).",
        extras: "Chunkloading, furnace/potion/crafter peripherals, accessible loaders.",
        issues: "No known major issues in guide notes; build indicators carefully.",
        links: [
          { label: "Webpage", href: "https://storagecatalog.org/archives/LS003-luckeY-Main-Storage/" },
          { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/1407307639552999424/1466124381301243914" },
        ],
      },
      {
        name: "Yams v2",
        version: "1.20+",
        creators: "Etikle, basil, skyzy",
        sorts: "Boxes + items; mini/full bulk variants with full-box sorting support depending on mode.",
        speed: "Up to 16x hopper speed (144000 items/hour).",
        size: "108x75x114 (78493 blocks, full bulk undecorated).",
        extras: "Chunkloading, furnace array, restock/yeet, control panel.",
        issues: "Mostly functional; avoid spamming mini-bulk box-calling while active.",
        links: [
          { label: "Webpage", href: "https://storagecatalog.org/archives/LS006-Yams-v2-3/" },
          { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/749137424684285992/1262854684037611600" },
        ],
      },
      {
        name: "Krebs' Main Storage System",
        version: "1.17+",
        creators: "Krebs",
        sorts: "Boxes + items with optional full-box route via secondary input.",
        speed: "Up to 8x hopper speed (72000 items/hour).",
        size: "114x101x109 (93156 blocks).",
        extras: "Unstackable sorting, chunkloading, large control/peripheral set.",
        issues: "No known major issues in guide notes; some components are not latest-generation designs.",
        links: [
          { label: "Webpage", href: "https://storagecatalog.org/archives/LS005-Krebs-Main-Storage-System/" },
          { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/833152072618606652/1083907230023295066" },
        ],
      },
    ],
  },
  {
    id: "advanced",
    title: "Other / Advanced",
    description: "Specialized large-scale systems generally intended for expert technical server environments.",
    entries: [
      {
        name: "SciCraft Main Storage",
        version: "1.19+",
        creators: "jorvp, Obi",
        sorts: "Hybrid encoded architecture with chest halls, bulk, full-box support, and non-stackables.",
        speed: "Up to 16x hopper speed (144000 items/hour).",
        size: "Very large; guide notes estimate near 190000 blocks (excluding remote bulk).",
        extras: "Remote bulk calls, unstackable sorting, large automation/peripheral systems.",
        issues: "No known major issues in guide notes.",
        links: [
          { label: "Webpage", href: "https://soontech.org/browser/archives/ES003-Scicraft-Hybrid-Main-Storage/" },
          { label: "Discord Post", href: "https://discord.com/channels/748542142347083868/1189010750606426132/1189012529284919296" },
        ],
      },
    ],
  },
];

const storageImages: Record<string, string> = {
  "Compact Categorizer": "/images/storage-guide/fc2f8deb-3c5a-49f1-9d43-e400af767e9a.png",
  "B-MIS": "/images/storage-guide/e577d7af-4f02-4934-8dfc-e0bb319a8a74.png",
  "Simple multi-item sorter": "/images/storage-guide/e2f4bc55-dcbe-4e0f-9887-5a5a8c41dadc.png",
  "Scorpio MIS": "/images/storage-guide/519b73f2-1e9c-4d21-8dad-bbbae61d22d6.png",
  "J-MIS v3": "/images/storage-guide/fc28b428-ec56-4ca0-af98-c70e1fe3995c.png",
  "YAMIS": "/images/storage-guide/48b65311-e3a6-47fa-9971-297e1a5ba557.png",
  "XianyuMIS v2": "/images/storage-guide/1ff9fdd5-3fc5-4b64-bc43-5d0ecd869337.png",
  "G-MIS v2.1": "/images/storage-guide/330f8a64-eefb-4f6b-925e-311145fe425f.png",
  "CartMIS v3": "/images/storage-guide/9c18d345-7d06-4689-89a7-d2feb00a9cdd.png",
  "luckeY Main Storage": "/images/storage-guide/9d5565e0-9793-41e4-abd4-8ecbc673e282.png",
  "Yams v2": "/images/storage-guide/7edc565a-d644-48e0-a5e2-b9ef6008bb63.png",
  "Krebs' Main Storage System": "/images/storage-guide/c55b1008-54c1-4ecc-aead-c7910a6916e1.png",
  "SciCraft Main Storage": "/images/storage-guide/5c471cec-2918-4980-a47e-e16d5b611da7.png",
};

export default function StorageGuidePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link href="/guides/" className="text-sm font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400">
          Back to guides
        </Link>
      </div>

      <header className="mb-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-800 dark:text-sky-400">Resource Guide</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100 sm:text-4xl">
          List of Complete Main Storages
        </h1>
        <p className="mt-3 max-w-4xl text-slate-700 dark:text-slate-300">
          This page is a complete index of published storage
          systems from the Storage Catalog and Storage Tech Discord, focused on helping users compare designs and pick what to build.
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Author:{" "}
          <a
            href="https://github.com/lebip"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400"
          >
            bipim
          </a>
        </p>
      </header>

      <section className="mb-7 rounded-2xl border border-violet-200 bg-violet-50 p-6 shadow-sm dark:border-violet-900 dark:bg-violet-950/30">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Notes / FAQ</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-800 dark:text-slate-200">
          {notes.map((note) => (
            <li key={note} className="rounded-lg border border-white bg-white/90 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
              {note}
            </li>
          ))}
        </ul>
      </section>

      <div className="space-y-7">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <div className="mb-3">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{section.title}</h2>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{section.description}</p>
            </div>
            <SectionComparisonColumns entries={section.entries} storageImages={storageImages} />
          </section>
        ))}
      </div>
    </main>
  );
}
