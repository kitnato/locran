export type Affix = "articledSuffix" | "prefix" | "suffix";

export type AffixTag = "elemental" | "highQuality" | "lowQuality";

export type AffixData = BaseData & {
  artifact?: Affix[];
  creature?: Affix[];
  location?: Affix[];
  tags?: AffixTag[];
};

export const AFFIX_STRUCTURE_TYPES = ["none", "prefix", "prefixAndSuffix", "suffix"] as const;
export type AffixStructure = (typeof AFFIX_STRUCTURE_TYPES)[number];

export const ARMOR_CLASS_TYPES = ["light", "reinforced", "heavy"] as const;
export type ArmorClass = (typeof ARMOR_CLASS_TYPES)[number];

export type ArmorSlot = "chest" | "feet" | "hands" | "head" | "legs" | "shoulders" | "waist";

export type Artifact = "armor" | "shield" | "weapon";

export type ArtifactType<T extends Artifact> = { type: T };

export type ArtifactData = BaseData & {
  canPluralize?: boolean;
} & (
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

export type BaseData = { isProfanity?: boolean; name: string };

export type Category = "artifact" | "creature" | "location";

export type GeneratorParameters = Partial<{
  affixStructure: AffixStructure;
  allowProfanity: boolean;
  prefixTags: AffixTag[];
  suffixTags: AffixTag[];
}>;

export type LocationData = BaseData & {
  canPluralize?: boolean;
};

export type NameData = BaseData & {
  affix: Affix[];
};

export const SHIELD_CLASS_TYPES = ["small", "medium", "tower"] as const;
export type ShieldClass = (typeof SHIELD_CLASS_TYPES)[number];

export const WEAPON_CLASS_TYPES = ["blunt", "piercing", "slashing"] as const;
export type WeaponClass = (typeof WEAPON_CLASS_TYPES)[number];

export type WeaponModality = "melee" | "ranged";
