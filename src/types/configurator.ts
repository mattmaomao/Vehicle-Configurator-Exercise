export interface VehicleSelection {
  year: string
  make: string
  model: string
}

export interface UserSelections {
  vehicle: VehicleSelection
  coverage_first: string
  coverage_second: string
  upgrades: string[]
}