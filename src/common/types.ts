export type FlightData = {
  id: string;
  flight_number: string;
  source_city: string;
  destination_city: string;
  departure_time: string; // improve typing
  arrival_time: string; // improve typing
  flight_date: string; // improve typing
  cost?: number; // improve RBAC, move to another type
  currency?: string; // improve RBAC
};