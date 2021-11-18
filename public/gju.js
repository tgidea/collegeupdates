const showData = (articles) => {
    const artitem = articles;
    
    var items_list = document.getElementById('items-list');
    for (var i = 0; i < artitem.length; i++) {
        var output = "";
        output += `
    <div class="card text-center " style="border-color:pink;">
     <div class="card-body ">
     <p class="card-text  card-header ">${artitem[i].title}</p>
     <a class="btn-pink " style="color:white; text-decoration:none;" href="${artitem[i].url}">PDF</a>
    
       </div>
     </div>`
     items_list.innerHTML += output;
    }
}
const fetching = () => {
    try {
        //remove . from here
        fetch("gju.json")
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
