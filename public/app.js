var allPlayers = [];

var app = function(){
  var url = 'http://nflarrest.com/api/v1/player'
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var players = JSON.parse(jsonString);
  allPlayers = players;
  var all = document.getElementById("select-all");
  all.addEventListener('click', function(){populateList(players);});

  var clear = document.getElementById("clear");
  clear.addEventListener('click', clearList);

  var categorySelect = document.getElementById("category-select");
  categorySelect.addEventListener('change', populateSelect);

  var itemSelect = document.getElementById("list-select");
  itemSelect.addEventListener('change', selectPlayer);
}

var populateList = function(players){
  var ul = document.getElementById('player-list');
  clearList();

  players.forEach(function(player){
    var li = document.createElement('li');
    li.innerText = "Name: " + player.Name + "\n" + "Team: " + player.Team_name + "\n" +  "Position: " + player.Position + "\n" +  "Arrests: " + player.arrest_count;
    ul.appendChild(li)
  })
}

var clearList = function(){
  var ul = document.getElementById('player-list');
  while(ul.firstChild){
    ul.removeChild(ul.firstChild);
  }
}

var populateSelect = function(){
  var category = this.value;
  var categoryItems = _.uniq(_.map(allPlayers, category)).sort();
  var select = document.getElementById("list-select");

  var length = select.options.length;
     for(var i = length - 1 ; i >= 1 ; i--)
     {
         select.remove(i);
     }

  categoryItems.forEach(function(item){
    var option = document.createElement('option');
    option.innerText = item;
    select.appendChild(option);
  })
}

var selectPlayer = function(){
  var selected = this.value;
  var selctedPlayers = allPlayers.filter(function(player){
    return _.includes(player, selected);
  })
  populateList(selctedPlayers);
}

window.addEventListener('load', app);