import admin from 'firebase-admin';
import {serviceAccount} from '../../Firebase/firebase-admins.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://full-tecnologia-default-rtdb.firebaseio.com"
});

const firebaseAuth = admin.auth();

export { firebaseAuth }; 
