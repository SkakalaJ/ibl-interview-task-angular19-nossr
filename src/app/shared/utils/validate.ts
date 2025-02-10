import { IcaoAirportData } from "../types/icao-airports.types";
import { WhoCountriesData } from "../types/who-countries.types";

export default class ValidateUtils {
  static isValidWmoCode(data: WhoCountriesData, wmoCode: string): boolean {
    for (const country of data.dimension[0].code) {
      const found = country.attr.some((attr) => attr.category === 'WMO' && attr.value === wmoCode);
      
      if(found) return true;
    }

    return false;
  }

  static getCountryFromWmoCode(data: WhoCountriesData, wmoCode: string): string | null {
    for (const country of data.dimension[0].code) {
      const found = country.attr.some((attr) => attr.category === 'WMO' && attr.value === wmoCode);
      
      if(found) return country.display;
    }

    return null;
  }

  static isValidIcaoCode(data: IcaoAirportData[], icaoCode: string): boolean {
    return data.some((airport) => airport.icao === icaoCode);
  };
}