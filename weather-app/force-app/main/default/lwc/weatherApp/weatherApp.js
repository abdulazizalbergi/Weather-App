import { LightningElement } from 'lwc';
const API_KEY = '19c572b3b18e16e52e904745199e978e';
export default class WeatherApp extends LightningElement {
    cityName = '';
    loadingText = '';
    isError =false;
    get loadingClasses(){
        return this.isError ? 'error-loading-view':'success-loading-view';
    }
    searchHandler(event){
        this.cityName = event.target.value;
    }
    handleSubmit(event){
        event.preventDefault();
        this.fetchData();

    }
    fetchData(){
        this.isError =false;
        this.loadingText = 'Fetching Weather details......';
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metrics&appid=${API_KEY}`;
        fetch(URL).then(response => response.json()).then(result => {
            console.log(JSON.stringify(result));
            this.weatherDetails(result);
        }).catch(error => {
            console.error(error);
            this.loadingText= 'Some error occured';
            this.isError = true;
        })
    }
    weatherDetails(info){
        if(info.cod === "404"){
            this.isError = true;
            this.loadingText = `${this.cityName} is not a valid city.`;
        }
        else this.loadingText = '';

    }
}