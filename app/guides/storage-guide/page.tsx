import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import SectionComparisonColumns from "./section-comparison-columns";

export const metadata: Metadata = {
  title: "List of Complete Main Storages",
  description:
    "Structured overview of complete main storages published in Storage Tech, with sorting capabilities, speed, size, and links.",
  alternates: {
    canonical: "/guides/storage-guide/",
  },
  openGraph: {
    title: "List of Complete Main Storages",
    description:
      "Structured overview of complete main storages published in Storage Tech, with sorting capabilities, speed, size, and links.",
    url: "/guides/storage-guide/",
    type: "article",
  },
};

type ResourceLink = {
  label: string;
  href: string;
};

type GalleryImage = {
  label: string;
  src: string;
};

type HowToStep = {
  caption: string;
  src: string;
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
  gallery?: GalleryImage[];
  howTo?: HowToStep[];
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

const GH = "https://github.com/user-attachments/assets";

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
        ],
        gallery: [
          { label: "Input", src: `${GH}/d134cf1b-f766-479d-a208-e430055e6b0b` },
          { label: "UI", src: `${GH}/ca4626c7-d6fd-4a55-a4f7-79763c6d157f` },
        ],
        howTo: [
          { caption: "The filters (also called whitelisters) of this system are these chests. Depending on the version chosen, barrels are used in the same way:", src: `${GH}/dde16924-c9ee-4d6e-8a62-30d025af8bea` },
          { caption: "by default, the chest has three unstackables/full stacks and 55 64-stackable renamed items (which must never be put in the input):", src: `${GH}/c369ee97-7be0-4769-a53e-f10aef737981` },
          { caption: "To add an item, place one sample in the chest and remove one of the renamed items:", src: `${GH}/e5a156de-d5fd-433f-ba6d-24107f665231` },
          { caption: "To add items that only stack up to 16, remove 4 renamed items for each 16-stackable added to the chest:", src: `${GH}/dd4eefe8-a2ae-48e0-a5c8-ef5147a37dd3` },
          { caption: "The procedure for barrels is the same:", src: `${GH}/4b0438da-6e27-4fe9-838b-e8201537695c` },
          { caption: "The hopper cart needs to be filled with 4 non stackable items, leaving the last slot empty:", src: `${GH}/710f545b-7864-4250-9e18-24cc97c2e83d` },
        ],
      },
      {
        name: "16gt Parallelized Cart MIS Storage",
        version: "1.21.10+",
        creators: "Wes",
        sorts:
          "Stackable items + shulker unload + multi-item shulker sorting. 1-wide slices with up to 50 item types.",
        speed: "Up to ~32 hopper speed (~288000 items/hour).",
        size: "19x14x43 (11438 blocks).",
        extras: "Chunkloader not included.",
        issues: "Breaks in older 1.21.x subversions because of bubble column changes.",
        links: [
          { label: "Webpage", href: "https://storagecatalog.org/archives/MIS012-16gt-Parallelized-Cart-MIS-Storage/" },
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
        ],
        howTo: [
          { caption: "The filters (also called whitelisters) of this system are these chests on the back of the building:", src: `${GH}/dd1694fc-5528-4292-9b45-1d5c689f6c8c` },
          { caption: "by default, the chest has three unstackables/full stacks and 55 64-stackable renamed items (which must never be put in the input):", src: `${GH}/c369ee97-7be0-4769-a53e-f10aef737981` },
          { caption: "To add an item, place one sample in the chest and remove one of the renamed items:", src: `${GH}/e5a156de-d5fd-433f-ba6d-24107f665231` },
          { caption: "To add items that only stack up to 16, remove 4 renamed items for each 16-stackable added to the chest:", src: `${GH}/dd4eefe8-a2ae-48e0-a5c8-ef5147a37dd3` },
          { caption: "The renamed items and the full stacks/unstackable items can be placed in different ways, there's no difference as long as the number is correct:", src: `${GH}/55c11e53-8531-4646-8a02-fe996d84c8a1` },
          { caption: "The renamed items and the full stacks/unstackable items can be placed in different ways, there's no difference as long as the number is correct:", src: `${GH}/9ff76d98-cbe2-4769-b0af-62d27b6a5c2c` },
          { caption: "The renamed items and the full stacks/unstackable items can be placed in different ways, there's no difference as long as the number is correct:", src: `${GH}/de65f669-e044-4f38-9c5d-6c3cd6052f98` },
          { caption: "The hopper cart needs to be filled with 0-19-1-1-1 64-stackable renamed items, different from the ones used in the whitelisters:", src: `${GH}/7a42d028-5fe2-4abc-85bd-8b9512bf2fe2` },
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
        ],
        howTo: [
          { caption: "The filters (also called whitelisters) of this system are these chests:", src: `${GH}/51ec84a4-23dc-4d62-83dc-e7d0350cc6af` },
          { caption: "by default, the chest has three unstackables/full stacks and 55 64-stackable renamed items (which must never be put in the input):", src: `${GH}/c369ee97-7be0-4769-a53e-f10aef737981` },
          { caption: "To add an item, place one sample in the chest and remove one of the renamed items:", src: `${GH}/e5a156de-d5fd-433f-ba6d-24107f665231` },
          { caption: "To add items that only stack up to 16, remove 4 renamed items for each 16-stackable added to the chest:", src: `${GH}/dd4eefe8-a2ae-48e0-a5c8-ef5147a37dd3` },
          { caption: "The renamed items and the full stacks/unstackable items can be placed in different ways, there's no difference as long as the number is correct:", src: `${GH}/55c11e53-8531-4646-8a02-fe996d84c8a1` },
          { caption: "The renamed items and the full stacks/unstackable items can be placed in different ways, there's no difference as long as the number is correct:", src: `${GH}/9ff76d98-cbe2-4769-b0af-62d27b6a5c2c` },
          { caption: "The renamed items and the full stacks/unstackable items can be placed in different ways, there's no difference as long as the number is correct:", src: `${GH}/de65f669-e044-4f38-9c5d-6c3cd6052f98` },
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
        ],
        gallery: [
          { label: "Input", src: `${GH}/51f46182-ba7f-42e4-af54-ced4d086c3eb` },
          { label: "UI", src: `${GH}/57a3bc3b-e41a-43fe-835b-35c875441d34` },
        ],
        howTo: [
          { caption: "The filters of the multi item sorter are these chests on top:", src: `${GH}/e7efb869-aea2-493f-ac94-dfd224ed0f5a` },
          { caption: "by default, the MIS chests are completely filled with either renamed blockers or unstackable items. To assign an item to the slice, replace one of the blockers with two samples of the item:", src: `${GH}/f50f30c8-8d37-42da-86b3-8cb1b26c518b` },
          { caption: "The filters of the hybrid loaders are normal SS2 filters on the sides of the building:", src: `${GH}/30867425-b457-4ee7-a377-939b2a56f1ed` },
          { caption: "The hopper next to ice must be set as shown, with at least a sample of the item in the first slot. The iron nuggets are renamed items.", src: `${GH}/bf0f3514-b003-4946-a84a-272d7445cec3` },
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
        ],
        gallery: [
          { label: "Input", src: `${GH}/4a00c8b1-1f5f-4d61-8a4a-614318efd82e` },
          { label: "UI", src: `${GH}/2cfb7feb-2dc8-4605-bad3-1882feafefdd` },
          { label: "UI 2", src: `${GH}/2f1349ad-60a7-4052-ad11-7308e24d643b` },
        ],
        howTo: [
          { caption: "The filters of the multi item sorter (double chests) and the ones of the box loaders (hoppers next to ice) are on top of the building:", src: `${GH}/54a9616f-06f3-4217-91c5-1b97379ec0a2` },
          { caption: "by default, the MIS chests are completely filled with either renamed blockers or unstackable items. To assign an item to the slice, replace one of the blockers with two samples of the item:", src: `${GH}/f50f30c8-8d37-42da-86b3-8cb1b26c518b` },
          { caption: "The filters of the box loaders are normal SS3 filters. The filter hopper must be set as shown, with at least a sample of the item in the first slot. The cacti are renamed items. Over time, up to 41 items will fill the first slot.", src: `${GH}/90239967-5829-4bde-960b-49de5263598c` },
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
        ],
        gallery: [
          { label: "Input", src: `${GH}/a14b7092-6213-49ef-876f-6df145f04889` },
          { label: "UI", src: `${GH}/9ed9cb46-a39d-4322-af50-b13aa8411f8e` },
          { label: "UI 2", src: `${GH}/f449eedd-b9ee-45a7-8b93-ffdc9a777d8d` },
        ],
        howTo: [
          { caption: "The filters (also called whitelisters) of the MIS are the bottom chests under the floor shown here. NEVER touch the content of those chests when the system is currently active.", src: `${GH}/9841f62e-de3c-405f-9811-ebd5a7b152e1` },
          { caption: "by default, the chest has three unstackables/full stacks and 55 64-stackable renamed items (which must never be put in the input):", src: `${GH}/c369ee97-7be0-4769-a53e-f10aef737981` },
          { caption: "To add an item, place one sample in the chest and remove one of the renamed items:", src: `${GH}/e5a156de-d5fd-433f-ba6d-24107f665231` },
          { caption: "To add items that only stack up to 16, remove 4 renamed items for each 16-stackable added to the chest:", src: `${GH}/dd4eefe8-a2ae-48e0-a5c8-ef5147a37dd3` },
          { caption: "The renamed items and the full stacks/unstackable items can be placed in different ways, there's no difference as long as the number is correct:", src: `${GH}/55c11e53-8531-4646-8a02-fe996d84c8a1` },
          { caption: "The renamed items and the full stacks/unstackable items can be placed in different ways, there's no difference as long as the number is correct:", src: `${GH}/9ff76d98-cbe2-4769-b0af-62d27b6a5c2c` },
          { caption: "The renamed items and the full stacks/unstackable items can be placed in different ways, there's no difference as long as the number is correct:", src: `${GH}/de65f669-e044-4f38-9c5d-6c3cd6052f98` },
          { caption: "One whitelister at the end of the hall controls which items are assigned to the box loaders for the bulk section:", src: `${GH}/5fde734a-8362-4c74-a53f-97b53e60a241` },
          { caption: "To assign an item to bulk, you have to assign it three times: Bulk whitelister chests, box loaders, and box sorters. The box loaders have 2 filters for each item:", src: `${GH}/2ec5eee4-f4af-43df-a0d5-0c5ea44ae1ad` },
          { caption: "The filtering hoppers can be set as shown, with iron nuggets being renamed items. 1-18-1-1-1, 2-17-1-1-1 and 3-16-1-1-1 are all possible configurations. Remember to assign 2 filters next to each other to the same item, as shown in the litematic file.", src: `${GH}/dce2e04d-ccec-4542-ab64-9c9f31dd954e` },
          { caption: "The filters of the box sorters are the hoppers visible here:", src: `${GH}/3bbee34a-10cc-4c9f-be7c-58aaa5dc65a1` },
          { caption: "Each hopper must be filled with 1 sample of the item you want to sort into the corresponding slice and 4 blockers. Shulker boxes are preferred because they can't be inserted inside shulker boxes under any circumstance, making the filter more resistant. For unassigned slices, block all the slots.", src: `${GH}/6a699d23-6c30-48de-aeef-a2d23bab971d` },
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
        ],
        gallery: [
          { label: "Input", src: `${GH}/53be6ab7-8310-4afa-a050-e94f109bd295` },
          { label: "UI", src: `${GH}/79de7652-4d39-453c-a90d-805ac9fdb6ef` },
          { label: "UI 2", src: `${GH}/6639545b-81b2-4ecc-b4e1-c4fd0d2ce245` },
          { label: "UI 3", src: `${GH}/f1d701dc-7b2b-4026-aed4-91d1c3d9f0ff` },
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
        ],
        gallery: [
          { label: "Input", src: `${GH}/042938de-9080-4eaa-be31-e9d8523fb860` },
          { label: "UI", src: `${GH}/34869a61-bfe0-4857-921e-08c63c01e3ab` },
          { label: "UI 2", src: `${GH}/0bf55606-e6fc-4d42-ba05-f7097c2ec26b` },
          { label: "UI 3", src: `${GH}/2894a32b-0ac4-4604-8e7b-1bbed215d061` },
          { label: "UI 4", src: `${GH}/998e7276-3627-465b-8ffa-03b1d944a501` },
          { label: "UI 5", src: `${GH}/ff78d921-2bc7-407d-ad26-4f3ecf5bbaf2` },
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
        ],
        gallery: [
          { label: "Input", src: `${GH}/d260bd2c-69ed-4735-ba3d-821877fa6b6d` },
          { label: "UI", src: `${GH}/6ce06784-dfc3-488a-a32b-2a343a258819` },
          { label: "UI 2", src: `${GH}/021da9f6-f4e7-498a-b8e2-da87d18303b0` },
          { label: "UI 3", src: `${GH}/863b4f69-b94d-44d4-b6d6-0136a0876d3d` },
          { label: "UI 4", src: `${GH}/f0b120a2-91e3-4fc0-bbd5-7b159e783303` },
          { label: "UI 5", src: `${GH}/597a9009-617e-43a7-bcf4-5b02c62c5525` },
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
        ],
        gallery: [
          { label: "Input", src: `${GH}/fb05add9-3e1a-4447-986a-4bfaf3d70b76` },
          { label: "UI", src: `${GH}/d9eae6e1-9163-4785-a2e5-d10e3cbb6294` },
          { label: "UI 2", src: `${GH}/1c35cd44-f6b0-4f6e-8b1a-1ab3a2c15f89` },
          { label: "UI 3", src: `${GH}/b4c621c9-4b99-4165-be89-a957c62a0b0e` },
          { label: "UI 4", src: `${GH}/53f6ff0c-c63b-439d-a426-f9e4d2b82c78` },
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
        ],
        gallery: [
          { label: "Input", src: `${GH}/b184baf8-2bcc-4f51-acf9-20857a192130` },
          { label: "UI", src: `${GH}/390c4ee8-7307-4ca0-bbea-4da272874b47` },
          { label: "UI 2", src: `${GH}/1d29b033-86e0-4cce-b505-30a24f85b03c` },
          { label: "UI 3", src: `${GH}/9c48c0fe-2cbe-4b99-afdf-5feb685673a3` },
          { label: "UI 4", src: `${GH}/6b3db113-80da-4756-986e-12a2710203f1` },
          { label: "UI 5", src: `${GH}/c232b319-590a-4ef3-bcc0-20ffe0295c51` },
          { label: "UI 6", src: `${GH}/99567d62-3c99-488e-87df-59d169563f2e` },
          { label: "UI 7", src: `${GH}/885f4bb0-14fa-43cd-b0a1-c5597a6580ac` },
        ],
      },
    ],
  },
];

const storageImages: Record<string, string> = {
  "Compact Categorizer": "/images/storage-guide/fc2f8deb-3c5a-49f1-9d43-e400af767e9a.png",
  "16gt Parallelized Cart MIS Storage": "/images/storage-guide/16gtmis.png",
  "B-MIS": "/images/storage-guide/e577d7af-4f02-4934-8dfc-e0bb319a8a74.png",
  "Scorpio MIS": "/images/storage-guide/519b73f2-1e9c-4d21-8dad-bbbae61d22d6.png",
  "J-MIS v3": "/images/storage-guide/fc28b428-ec56-4ca0-af98-c70e1fe3995c.png",
  "YAMIS": "/images/storage-guide/48b65311-e3a6-47fa-9971-297e1a5ba557.png",
  "XianyuMIS v2": "/images/storage-guide/1ff9fdd5-3fc5-4b64-bc43-5d0ecd869337.png",
  "CartMIS v3": "/images/storage-guide/9c18d345-7d06-4689-89a7-d2feb00a9cdd.png",
  "luckeY Main Storage": "/images/storage-guide/9d5565e0-9793-41e4-abd4-8ecbc673e282.png",
  "Yams v2": "/images/storage-guide/7edc565a-d644-48e0-a5e2-b9ef6008bb63.png",
  "Krebs' Main Storage System": "/images/storage-guide/c55b1008-54c1-4ecc-aead-c7910a6916e1.png",
  "SciCraft Main Storage": "/images/storage-guide/5c471cec-2918-4980-a47e-e16d5b611da7.png",
};

export default function StorageGuidePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "List of Complete Main Storages",
          description:
            "Structured overview of complete main storages published in Storage Tech, with sorting capabilities, speed, size, and links.",
          url: "https://guide.storagecatalog.org/guides/storage-guide/",
          author: {
            "@type": "Person",
            name: "bipim",
            url: "https://github.com/lebip",
          },
          publisher: {
            "@type": "Organization",
            name: "Storage Catalog",
            url: "https://storagecatalog.org/",
          },
          inLanguage: "en",
        }}
      />
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
            <Suspense>
              <SectionComparisonColumns entries={section.entries} storageImages={storageImages} />
            </Suspense>
          </section>
        ))}
      </div>
    </main>
  );
}
