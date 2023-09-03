#### Bugs encountered, Fixes and functionalities added

1. just gazing through the code I noticed that in the fetchWeather() function, the function was returning a promise. it was not awaiting for the promise to be full-filled. SO I added a new const `data` and set it equal to response.json() and returned `data`.

2. Similarly in the addCity() function the the function was setting `weather` equal to a promise, So I made the function async and awaited for the response and set it `weather` equal to it.

3. Added a button in each card to refresh the temperature of that card. wrote a function refreshCityData() which fetches the data using fetchWeather() again and then replaced the data with newly fetched data.
