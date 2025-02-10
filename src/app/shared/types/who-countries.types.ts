export type WhoCountriesDimensionCodeAttr = {
  category: string;
  value: string;
}

export type WhoCountriesDimensionCode = {
  label: string;
  display: string;
  display_sequence: number;
  url: string;
  attr: WhoCountriesDimensionCodeAttr[];

}

export type WhoCountriesDimension = {
  label: string;
  display: string;
  isMeasure: boolean;
  code: WhoCountriesDimensionCode[];
}

export type WhoCountriesData = {
  dimension: WhoCountriesDimension[];
};