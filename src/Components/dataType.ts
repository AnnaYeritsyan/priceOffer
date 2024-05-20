export type DataNameType = 'Lis-A' | 'LIS-A' | 'LIS-A ներդնում' | 'VUID' | 'VUID ԾԱ-ի ﬕացում'

export type DataKV = { type: string, value: string }
export type Description = DataKV
export type LicenseType = DataKV
export type Price = DataKV
export type Name = string

export interface DataSchema {
    id: number;
    name: DataNameType;
    description: Description[];
    licenseType: LicenseType[];
    price: Price[];
}

export interface DataRow {
    id: number;
    name: DataNameType;
    description: string;
    licenseType: string;
    price: string;
}

// ------------------
export type DescriptionType = {
    type: string;
    value: string;
};

export type LicenseTypeType = {
    type: string;
    value: string;
};

export type PriceType = {
    type: string;
    value: string;
};
export type RowState = {
    count:  undefined|string ;
    disCount:   undefined|string;
};


export type DataType = {
    id: number;
    name: string;
    description: DescriptionType[];
    licenseType: LicenseTypeType[];
    price: PriceType[];
};

export type MenuItems={
    id:string,
    item:string
}

export type CustomerSelect={
    onCustomerSelect: (item: string) => void;

}

export interface ModalTextInformation {
    title: string;
    content: string;
  }

 export  interface HeaderDataType {
    id: number;
    name: string;
    description: string | string[];
    type: string;
    price: number;
}
