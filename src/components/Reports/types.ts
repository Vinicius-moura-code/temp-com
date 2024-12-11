export interface IEconomyReport {
  managementDealCode: string
  lastModified: string
  isFinal: boolean
  isLoadedFromV1: boolean
  companyId: string
  companyName: string
  agentCode: string
  agentAcronym: string
  physicalAssetId: string
  physicalAssetName: string
  reference: string
  reportComment: any
  result: Result
  acrCost: AcrCost
  aclCost: AclCost
  historicalDataForTheLast12Months: HistoricalDataForTheLast12Month[]
  historicalDataForTheLast12MonthsAccordingFormule: any[]
  yearlyEconomyChart: YearlyEconomyChart[]
  accumulatedYearlyEconomyChart: AccumulatedYearlyEconomyChart[]
  historicalConsumptionLast12Months: HistoricalConsumptionLast12Month[]
  historicalComparisonEconomyPeriods: HistoricalComparisonEconomyPeriod[]
  pld: Pld
  extraEntries: ExtraEntry[]
  kpi: Kpi
  marketingUserName: string
  operatorUserName: string
}

export interface Result {
  physicalAssetId: string
  physicalAssetName: string
  acrCost: number
  acrBaseCost: number
  aclCost: number
  aclCostWithoutManagement: number
  aclBaseCost: number
  economy: number
  economyWithoutManagement: number
  baseEconomy: number
  economyPercentage: number
  yearEconomy: number
  yearBaseEconomy: number
  yearEconomyPercentage: number
  aclEconomy: number
  aclBaseEconomy: number
  tusdDiscountAdjustment: number
  retusdAdjustment: number
  economyAcltNoTax: number
  yearEconomyAcltNoTax: number
  yearEconomyAcltNoTaxPercentage: number
  economyAcltNoTaxPercentage: number
  periodEconomyAcltNoTaxPercentage: number
  mWhAclCost: number
  mWhAcrCost: number
  mWhAclBaseCost: number
  mWhAcrBaseCost: number
}

export interface AcrCost {
  energy: number
  fareFlag: number
  tusdThread: number
  exceededDemand: number
  tusdCharges: number
  subTotalDemandSeasonality: number
  icms: number
  pisCofins: number
  generatorCost: number
  generatorVolume: number
  generatorFare: number
  otherCosts: number
  icmsCredit: number
  pisCofinsCredit: number
  subtotal: number
  subTotalIcms: number
  subTotalPisCofins: number
  subTotalFinal: number
  totalCredits: number
  total: number
}

export interface AclCost {
  energy: number
  losses: number
  tusdThread: number
  exceededDemand: number
  tusdCharge: number
  subTotalDemandSeasonality: number
  eesWitFinancialSettlement: any
  financialSettlement: number
  creditOrDebit: string
  financialGuarantee: number
  eer: number
  ess: any
  chargeRepass: any
  ercap: number
  managementCost: number
  icms: number
  pisCofins: number
  associativeContribution: number
  connectionCharge: number
  otherCosts: number
  icmsCredit: number
  pisCofinsCredit: number
  subtotal: number
  subTotalIcms: number
  subTotalPisCofins: number
  subTotalFinal: number
  totalCredits: number
  total: number
}

export interface HistoricalDataForTheLast12Month {
  reference: string
  economy: number
  economyAccumulated: number
}

export interface YearlyEconomyChart {
  reference: string
  acr: number
  acl: number
  result: number
  acrBase: number
  aclBase: number
  resultBase: number
  resultPercent: number
  economyAccumulated: number
}

export interface AccumulatedYearlyEconomyChart {
  reference: string
  acr: number
  acl: number
  result: number
  acrBase: number
  aclBase: number
  resultBase: number
  resultPercent: number
  economyAccumulated: number
}

export interface HistoricalConsumptionLast12Month {
  reference: string
  peakConsumption: number
  offPeakConsumption: number
  activeConsumption: number
  reactiveConsumption: number
}

export interface HistoricalComparisonEconomyPeriod {
  reference: string
  aclCost: number
  acrCost: number
  economy: number
  economyPercente: number
}

export interface Pld {
  se: number
  s: number
  n: number
  ne: number
}

export interface ExtraEntry {
  description: string
  value: number
  isAcl: boolean
  isAcr: boolean
}

export interface Kpi {
  economyNetValuePercentage: number
  economyNetValue: number
  mwhEconomyNetValue: number
  economyGrossPercentage: number
  economyGross: number
  mwhEconomyGross: number
  mwhAcrGrossCost: number
  mwhAcrCostNetValue: number
  mwhAclGrossCost: number
  mwhAclCostNetValue: number
}
