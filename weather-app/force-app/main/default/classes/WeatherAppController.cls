public with sharing class WeatherAppController{
    @AuraEnabled
    public static string getWeatherDetails(String input){
        String url = 'https://api.openweathermap.org/data/2.5/weather?q='+ input + '&units=metric&appid='+ getKey();
        String response = getResponse(url);
        return response;
    }
    public static String getKey() {
        String key ='19c572b3b18e16e52e904745199e978e';
        return key;
    }
    public static String getResponse(String strUrl){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        HttpResponse response = new HttpResponse();
        request.setMethod('GET');
        request.setEndpoint(strUrl);
        request.setTimeout(12000);
        response = http.send(request);
        String responseBody = response.getBody();
        return responseBody;
    }
}