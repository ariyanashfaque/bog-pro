export const AssetFilter = [
  {
    filterSelected: 0,
    filterType: "assetType",
    filterTitle: "Asset Type",
    filters: [
      {
        type: "silo",
        title: "Silo",
        isSelected: false,
      },
      {
        type: "hopper",
        title: "Hopper",
        isSelected: false,
      },
      {
        type: "bridge",
        title: "Bridge",
        isSelected: false,
      },
      {
        type: "bin",
        title: "Bin",
        isSelected: false,
      },
    ],
  },
  {
    filterSelected: 0,
    filterType: "assetArea",
    filterTitle: "Asset Area",
    filters: [
      {
        type: "zone",
        title: "Zone 1",
        isSelected: false,
      },
      {
        type: "zone2",
        title: "Zone 2",
        isSelected: false,
      },
    ],
  },
  {
    filterSelected: 0,
    filterType: "assetStatus",
    filterTitle: "Asset Status",
    filters: [
      {
        type: "assetApprovalPending",
        title: "Asset Approval Pending",
        isSelected: false,
      },
      {
        type: "assetApproved",
        title: "Asset Approved",
        isSelected: false,
      },
      {
        type: "assetInDraft",
        title: "Asset In Draft",
        isSelected: false,
      },
      {
        type: "assetRejected",
        title: "Asset Rejected",
        isSelected: false,
      },
    ],
  },
  {
    filterSelected: 0,
    filterType: "assetSource",
    filterTitle: "Asset Source",
    filters: [
      {
        type: "assetSapSync",
        title: "Sap Sync",
        isSelected: false,
      },
      {
        isSelected: false,
        title: "Bulk Upload",
        type: "assetBulkUpload",
      },
      {
        isSelected: false,
        title: "Manual Creation",
        type: "assetManualCreation",
      },
    ],
  },
];
