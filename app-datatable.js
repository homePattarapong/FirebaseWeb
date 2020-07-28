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
// const table = document.querySelector('#tbresult').querySelector('tbody');
const form = document.querySelector('#addForm');

// db.collection('user').get().then((snapshot) => {
//     console.log(snapshot.docs);
// console.log(doc.data());
// console.log(doc.id);
// });

// setTimeout(function(){ $('#tbresult').DataTable(); }, 3000);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(form.name.value);
    if(form.editid.value){
        updateData();
    }else{
        addData();
    }
    
    form.reset();
    form.editid.value = '';
    rederTable();

});

rederTable();

function rederTable() {
    let btn = document.createElement('button');
    //btn.setAttribute('class','btn btn-danger');
    btn.className = 'btn btn-danger'
    var dataSet = [];
    var x = 0;
    db.collection("user")
        // .where('city','==','Konaha')
         .orderBy("name", "asc")
        .get().then(snapshot => {
        //table.innerHTML = '';
        snapshot.forEach(doc => {
            //showData(doc);
            dataSet.push([
                '',
                doc.data().name,
                doc.data().age,
                doc.data().city,
                "<button class='btn btn-sm btn-warning btn-action' data-id='" + doc.id + "' onclick='editData(this);' ><i class='fa fa-edit'></i> Edit</button>&nbsp;&nbsp;<button class='btn btn-sm btn-danger btn-action' data-id='" + doc.id + "' onclick='deleteData(this);' ><i class='fa fa-trash'></i> Delete</button>"

                // doc.id
            ]);
            x++
        });
        $('#tbresult').DataTable().destroy();
        var t = $('#tbresult').DataTable({
            // bSort: false,
            data: dataSet,
            "columnDefs": [ {
                "searchable": false,
                "orderable": false,
                "targets": 0
            } ],
            "order": [[ 1, 'asc' ]],            
            columns: [
                {className: 'text-center'},
                null,
                {className: 'text-center'},
                null,
                {
                    "searchable": false,
                    "sortable": false,
                }
            ]
        });
        t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();
    });
}

function addData(){
    db.collection('user').add({
        name: form.name.value,
        age: form.age.value,
        city: form.city.value
    });
}

function updateData(){
    let id = form.editid.value;
    // console.log(id);
    db.collection('user')
        .doc(id)
        .update({
                name:form.name.value,
                age:form.age.value,
                city:form.city.value,
    });
}

async function editData(e){
    let id = e.getAttribute('data-id');
    // console.log(id);
    const editId = db.collection('user').doc(id);
    const doc = await editId.get();
    console.log(doc.data());
    form.editid.value = id;
    form.name.value = doc.data().name;
    form.age.value = doc.data().age;
    form.city.value = doc.data().city;
}

function deleteData(e){
    let id = e.getAttribute('data-id');
    // console.log(id);
    db.collection('user').doc(id).delete();
    rederTable();
}