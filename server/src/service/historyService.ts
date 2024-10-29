//import { readFile, writeFile, writeFileSync } from "fs";
import { readFile, writeFile } from "fs/promises";
// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<string> {
    //const fs = require('node:fs');
    const data = await readFile('./src/service/searchHistory.json', 'utf-8');
    return data;
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    let citiesArray = JSON.stringify(cities);
    //const fs = '/searchHistory.json';
    try {
      await writeFile('./src/service/searchHistory.json', citiesArray);
    } catch (err) {
      console.log(err);
    }

  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    const cityJson = await this.read();
    //console.log(cityJson);
    if(!cityJson)
    {
      return [];
    }
    else{
      return JSON.parse(cityJson);
    }
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cityList = await this.getCities();
    let newCity = new City(city, cityList.length);
    cityList.push(newCity);
    this.write(cityList);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
