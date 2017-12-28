export class Config {
	
	host:string;
	endpoint: string;

	constructor(){
		this.host = 'http://localhost:3001';
		this.endpoint = this.host + '/api';
	}
}

export let Constants = {
	'UNAUTHORIZED_MESSAGE' : 'Seems like we have problem identifying your account. Please login again.',
	'OFFLINE_MESSAGE' : 'Seems like there is no Internet connection. Please check your Internet connection.',
	'NOT_FOUND': 'Seems like we have problem connecting to server. Please try again later.',
	'SERVER_ERR': 'Seems like there is server problem. Please consult our technical support for more details.'
}

export let firebaseConfig = {
    apiKey: "AIzaSyCyLL3j363FRmxxa05m8pBoYXl-_0wuBAo",
    authDomain: "nbc-ionic2-push-notification.firebaseapp.com",
    databaseURL: "https://nbc-ionic2-push-notification.firebaseio.com",
    projectId: "nbc-ionic2-push-notification",
    storageBucket: "nbc-ionic2-push-notification.appspot.com",
    messagingSenderId: "620756868871"
}
