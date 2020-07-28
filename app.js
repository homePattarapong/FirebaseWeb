// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDJIS4igRLlvb79BSlAuY898MKNAXM5B7E",
    authDomain: "lineoa-1e769.firebaseapp.com",
    databaseURL: "https://lineoa-1e769.firebaseio.com",
    projectId: "lineoa-1e769",
    storageBucket: "lineoa-1e769.appspot.com",
    messagingSenderId: "1065062036965",
    appId: "1:1065062036965:web:2e8864f96ef3a5953dab0c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const table = document.querySelector('#tbresult').querySelector('tbody');
const form = document.querySelector('#addForm');

// db.collection('user').get().then((snapshot) => {
//     console.log(snapshot.docs);
// console.log(doc.data());
// console.log(doc.id);
// });
rederTable();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(form.name.value);
    db.collection('user').add({
        name: form.name.value,
        age: form.age.value,
        city: form.city.value
    });
    form.reset();
    rederTable();

});

function rederTable() {

    db.collection("user").orderBy("name", "asc").get().then(snapshot => {
        table.innerHTML = '';
        snapshot.forEach(doc => {
            showData(doc);

        });
    });

}

function showData(doc) {


    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = doc.data().name;
    cell2.innerHTML = doc.data().age;
    cell2.className = 'text-center';
    cell3.innerHTML = doc.data().city;
    cell3.className = 'text-center';
    cell4.innerHTML = doc.id;
}