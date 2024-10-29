import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  const cityName = (req.body.cityName);
  const weatherArray = await WeatherService.getWeatherForCity(cityName);
  console.log(`THIS HERE IS THE REQ PLEASE NOTICE THIS ${weatherArray[0].icon}`);

  // TODO: save city to search history
  HistoryService.addCity(cityName);

  res.json(weatherArray);
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  let test = await HistoryService.getCities()
  console.log(test);
  res.json(test);
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => {});

export default router;
