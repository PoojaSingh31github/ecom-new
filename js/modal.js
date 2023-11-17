var modal = document.getElementById("myModal");
var btns = document.getElementsByClassName("myBtn");

for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function() {
    modal.style.display = "block";
  }
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


var cancelBtn = document.getElementsByClassName("cancelBtn")[0];

cancelBtn.onclick = function() {
  modal.style.display = "none";
}
