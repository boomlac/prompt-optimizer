declare const __API_KEY__: string;

export const environment = {
  production: true,  
  promptAnalysisApiUrl:'https://us-central1-examatics-api-384f7.cloudfunctions.net/promptOptimizer/api/v1/ai/prompt-analysis',
  apiKey: __API_KEY__,
  firebaseConfig: {
  apiKey: "AIzaSyA5v79e5IOv2otYR1nqa0yBcKyjF-MCD78",
  authDomain: "societyloops.firebaseapp.com",
  databaseURL: "https://societyloops.firebaseio.com",
  projectId: "societyloops",
  storageBucket: "societyloops.appspot.com",
  messagingSenderId: "81257901428",
  appId: "1:81257901428:web:69eb70934a697d7461d021",
  measurementId: "G-G3GCZVPZ66"
}
};
