export type DataNameType = 'Lis-A' | 'LIS-A' | 'LIS-A ներդնում' | 'VUID' | 'VUID ԾԱ-ի ﬕացում'

export type DataKV = { type: string, value: string }
export type Description = DataKV
export type License = DataKV
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
    count:number;
    disCount:number;
    finallyPrice:number;
}

// ------------------
export type DescriptionType = {
    type: string;
    value: string;
};

export type LicenseType = {
    type: string;
    value: string;
};

export type PriceType = {
    type: string;
    value: string;
};
export type CountType = {
    type: string;
    value: string;
};
export type Counts ={
    count:string | number
}
export type RowState = {
    count:  undefined|string ;
    disCount:   undefined|string;
};


export type DataType = {
    id: number;
    name: string;
    description: DescriptionType[];
    licenseType: LicenseType[];
    price: PriceType[];
    // count:Counts[]

};
export type InvestmentType = {
    id: number;
    name: string;
    description: DescriptionType[];
    licenseType: LicenseType[];
    price: PriceType[];
    count:CountType[];
    disCount:CountType[],
   disCountPrice:CountType[],

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
    licenseType: string;
    price: number;
    count:number;
    disCount:number;
    finallyPrice:number;
}
export type NewObjType = {
    id: string | number;
    name: string;
    description: any[];
    licenseType: any[];
    price: any[];
    count:any[],
    disCount:any[],
    finallyPrice:any[]
}


