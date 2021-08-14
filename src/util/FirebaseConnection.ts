import Firebase from "firebase"

if(!Firebase.apps.length){
	Firebase.initializeApp({
		apiKey: process.env.APIKEY,
		authDomain: process.env.AUTHDOMAIN,
		databaseURL: process.env.DATABASEURL,
		projectId: process.env.PROJECTID,
		storageBucket: process.env.STORAGEBUCKET,
		messagingSenderId: process.env.MESSAGINGSENDERID,
		appId: process.env.APPID
	})
}

export default Firebase;