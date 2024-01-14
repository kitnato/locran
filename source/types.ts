export type Affix = "articledSuffix" | "prefix" | "suffix";

export type AffixTag = "elemental" | "highQuality" | "lowQuality";

export type AffixData = {
  artifact?: Affix[];
  creature?: Affix[];
  location?: Affix[];
  name: string;
  tags?: AffixTag[];
};

export const AFFIX_STRUCTURE_TYPES = ["noAffix", "prefix", "prefixAndSuffix", "suffix"] as const;
export type AffixStructure = (typeof AFFIX_STRUCTURE_TYPES)[number];

export const ARMOR_CLASS_TYPES = ["light", "reinforced", "heavy"] as const;
export type ArmorClass = (typeof ARMOR_CLASS_TYPES)[number];

export type ArmorSlot = "chest" | "feet" | "hands" | "head" | "legs" | "shoulders" | "waist";

export type Artifact = "armor" | "shield" | "weapon";

export type ArtifactType<T extends Artifact> = { type: T };

export type ArtifactData = { canPluralize?: boolean; name: string } & (
  | (ArtifactType<"armor"> & {
      subtype: ArmorSlot;
    })
  | (ArtifactType<"shield"> & {
      subtype: ShieldClass;
    })
  | (ArtifactType<"weapon"> & {
      artifactClass: WeaponClass;
      subtype: WeaponModality;
    })
);

export type ArtifactQuery =
  | (ArtifactType<"armor"> & {
      artifactClass?: ArmorClass;
      subtype?: ArmorSlot;
    })
  | (ArtifactType<"shield"> & {
      subtype?: ShieldClass;
    })
  | (ArtifactType<"weapon"> & {
      artifactClass?: WeaponClass;
      subtype?: WeaponModality;
    });

export type Category = "artifact" | "creature" | "location";

export type GeneratorParameters = Partial<{
  affixStructure: AffixStructure;
  prefixTags: AffixTag[];
  suffixTags: AffixTag[];
}>;

export type LocationData = { canPluralize?: boolean; name: string };

export type NameData = { affix: Affix[]; name: string };

export const SHIELD_CLASS_TYPES = ["small", "medium", "tower"] as const;
export type ShieldClass = (typeof SHIELD_CLASS_TYPES)[number];

export const WEAPON_CLASS_TYPES = ["blunt", "piercing", "slashing"] as const;
export type WeaponClass = (typeof WEAPON_CLASS_TYPES)[number];

export type WeaponModality = "melee" | "ranged";
