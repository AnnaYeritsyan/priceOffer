type DataNameType = 'Lis-A' | 'LIS-A' | 'LIS-A ներդնում' | 'VUID' | 'VUID ԾԱ-ի ﬕացում'

type DataKV = { type: string, value: string }
type Description = DataKV
type License = DataKV
type Price = DataKV
type Name = string

interface DataSchema {
    id: number;
    name: DataNameType;
    description: Description[];
    licenseType: LicenseType[];
    price: Price[];
}

type DescriptionType = {
    type: string;
    value: string;
};

type LicenseType = {
    type: string;
    value: string;
};

type PriceType = {
    type: string;
    value: string;
};
type CountType = {
    type: string;
    value: string;
};
type Counts = {
    count: string | number
}

type DataType = {
    id: number;
    name: string;
    description: DescriptionType[];
    licenseType: LicenseType[];
    price: PriceType[];

};
type InvestmentType = {
    id: number;
    name: string;
    description: DescriptionType[];
    licenseType: LicenseType[];
    price: PriceType[];
    count: CountType[];
    disCount: CountType[],
    disCountPrice: CountType[],

};

type MenuItems = {
    id: string,
    item: string
}

type CustomerSelect = {
    onCustomerSelect: (item: string) => void;

}

interface ModalTextInformation {
    title: string;
    content: string;
}

interface HeaderDataTypeInvestment {
    id: number;
    name: string;
    description: number | string | any;
    licenseType: number | string | any;
    price: number | string | any;
    count: number | string;
    disCount: number | string;
    disCountPrice: number;
}
type NewObjType = {
    id: string | number;
    name: string;
    description: any[];
    licenseType: any[];
    price: any[];
    count: any[],
    disCount: any[],
    disCountPrice: any[]
}


export interface HeaderDataType {
    customer: string;
    version: string;
}
interface VersionData {
    version: string;
    date: {
        start: string;
        end: string;
    };
    comment: string;
    records: Record<string, any>[];
}






