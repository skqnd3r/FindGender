const GenderApi = require('gender-api.com-client');
const genderApiClient = new GenderApi.Client("epQsM2QDqqbLqbEj2QzrZbZnrcog85dUnnrP");

function FindGender(Party){
    return new Promise((resolve)=>{
        genderApiClient.getByFirstName(Party.name, function (response,error) {
            if(error){
                throw error;
            }
            Party.gender = response.gender;
            Party.accuracy = response.accuracy;
            resolve();
        });
    });
}

module.exports ={FindGender: FindGender};