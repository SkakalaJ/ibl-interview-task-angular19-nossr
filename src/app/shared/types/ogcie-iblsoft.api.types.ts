export type OpmetQueryParams = {
  id: string,
  reportTypes: string[],
  stations?: string[],
  countries?: string[],
}

export type OpmetQueryBody = {
  id: string,
  method: string,
  params: OpmetQueryParams[]
}

export type OpmetQueryError = {
  code: number,
  message: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
}

export type OpmetQueryResult = {
  placeId: string,
  queryType: string,
  receptionTime: string,
  refs: string[],
  reportTime: string,
  reportType: string,
  revision: string,
  stationId: string,
  text: string,
  textHTML: string,
}

export type OpmetQueryResponse = {
  error: OpmetQueryError,
  id: string,
  result: OpmetQueryResult[]
}