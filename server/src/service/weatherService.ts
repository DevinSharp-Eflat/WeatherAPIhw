import dotenv from 'dotenv';
//import * as dotenv from 'dotenv'
dotenv.config();
import axios from 'axios';

// TODO: Define an interface for the Coordinates object
// interface Coordinates {
//   lat: number;
//   long: number;
//}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: Date;
  icon: any;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(city: string, date: Date, icon: any, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private readonly baseURL: string;
  private readonly APIkey: string;
  private _cityName: string;

  public get cityName(): string {
    return this._cityName;
  }
  public set cityName(city: string) {
    this._cityName = city;
  }

  constructor(){
    this.baseURL = process.env.API_BASE_URL || "";
    this.APIkey = process.env.API_KEY || "";
    this._cityName = "";
  }
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string){
  //   this._cityName = query;
  // };
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {

  // }
  // // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {
  //   return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.APIkey}`;
  // }
  // // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {
  //   const longitude = coordinates.long;
  //   const latitude = coordinates.lat;
  //   return `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.APIkey}`;
  // }
  // // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {
    
  // }
  // // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {

  // }
  // // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {

  // }
  // // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {

  // }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    //return weather array with current at index 0
    //const cityName = city;
    const weatherArray: Weather[] = [];
    const cityObj = await axios.get(`${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.APIkey}`);
    const coordinates = {lat: cityObj.data[0].lat, long: cityObj.data[0].lon};
    const weatherCall = await axios.get(`${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.long}&units=imperial&appid=${this.APIkey}`);
    for(let x = 0; x < 5; x++){
      weatherArray.push({
        city: weatherCall.data.city.name, 
        date: weatherCall.data.list[8*x].dt_txt, 
        icon: weatherCall.data.list[8*x].weather[0].icon, 
        iconDescription: weatherCall.data.list[8*x].weather[0].description, 
        tempF: weatherCall.data.list[8*x].main.temp, 
        windSpeed: weatherCall.data.list[8*x].wind.speed, 
        humidity: weatherCall.data.list[8*x].main.humidity
      })
    }
    return weatherArray;
  }
}

export default new WeatherService();
