// * Inventory Model * //
export interface Champion {
  role: string;
  title: string;
  access: AccessModel;
}

// * Country HSE Head Model * //
export interface CountryHseHead {
  role: string;
  title: string;
  access: AccessModel;
}

// * Access Model * //

export interface AccessModel {
  l1Aproval: boolean;
  InventoryEdit: boolean;
  inventoryCreation: boolean;
}
