// * Inventory Model * //
interface InventoryCreator {
  title: string;
  role: string;
  access: AccessModel[];
}

// * Country HSE Head Model * //
interface CountryHseHead {
  title: string;
  role: string;
  access: AccessModel[];
}
// * Access Model * //

export interface AccessModel {
  inventoryCreation: boolean;
  InventoryEdit: boolean;
  l1Aproval:boolean;
}
