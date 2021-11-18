const showData = (articles) => {
    const artitem = articles;
    
    var items_list = document.getElementById('items-list');
    for (var i = 0; i < artitem.length; i++) {
        var output = "";
        output += `
    <div class="card text-center border-secondary">
     <div class="card-body ">
     <p class="card-text text-primary card-header "><a href="${artitem[i].url}">${artitem[i].title}</a></p>
    <p class="card-text ">${artitem[i].date}</p>
    
       </div>
     </div>`
     items_list.innerHTML += output;
    }
}
const fetching = () => {
    try {
        //remove . from here
        fetch("mdu.json")
            .then(function (resp) {
                return resp.json();
            })
            .then(function(data){
                showData(data)
            });
    }
    catch (err) {
        console.log(err);
    }
}
document.addEventListener('DOMCONTENTLOADED', fetching());
// fetch();
