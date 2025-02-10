export type MeteoBriefingTableStationData = {
  reportType: string,
  reportTime: string,
  reportBody: string,
}

export type MeteoBriefingTableData = {
  station: string,
  rows: MeteoBriefingTableStationData[],
};