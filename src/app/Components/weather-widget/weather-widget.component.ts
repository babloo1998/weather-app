import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { async } from 'rxjs/internal/scheduler/async';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent implements OnInit {

  weatherData : any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData = () =>{
    this.http.get<any>('https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=bcde79e93f10556b5e4c6cd1bcc9a1f0')
    .subscribe(data => {
        this.setWeatherData(data)
    })
  }

  setWeatherData = (data) =>{
    this.weatherData = data;
    let sunSetTime = new Date(this.weatherData.sys.sunSet * 1000);
    this.weatherData.sunset_Time = sunSetTime.toLocaleDateString();
    let currentDate = new Date();
    this.weatherData.isDay = (currentDate.getTime() < sunSetTime.getTime());
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0)
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0)
    this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0)
  }

}
