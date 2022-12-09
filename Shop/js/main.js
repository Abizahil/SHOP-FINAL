var data = new Array();
let moneyUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function AddCart() {
  //para regresar al padre hay que poner parnert
  var obj = this.event.target.parentElement;

  var name = obj.querySelector(".card-title").textContent;
  var precio = obj.querySelector(".price").textContent.replace("$", "");
  var Idprod = obj.querySelector(".btn").getAttribute("id");
  var description = obj.querySelector(".desc").textContent;
  //console.log(obj, parseFloat(precio), Idprecio,name);
   //localStorage.setItem("cart",Idprod);
  var item = new Array({
    "id": Idprod,
    "nombre": name,
    "precio": precio,
    "descripcion": description,
  });
  AddItem(item);
}

function loadData() {
  if (localStorage.getItem("cart") != null) {
    data = localStorage.getItem("cart");
    data = JSON.parse(data);
  } else {
    localStorage.setItem("cart", "[]");
  }
}

function recoveryData() {
  if (localStorage.getItem("cart") != null) {
    data = localStorage.getItem("cart");
    data = JSON.parse(data);
  } else {
    localStorage.setItem("cart", "[]");
  }
  var list = document.getElementById("list-item");
  console.log(data.length);
  document.getElementById("count").innerHTML=data.length;
  for (var id in data) {
    console.log("indice" + id + "-->" + data[0].id);
    var li = renderItem(data[id]);
    list.appendChild(li);
  }
  getAmount();
}

function AddItem(item) {
  data = localStorage.getItem("cart");
  data = JSON.parse(data);
  data.push(item);
  localStorage.setItem("cart", JSON.stringify(data));
}

function renderItem(d) {
  var li = document.createElement("li");
  var div = document.createElement("div");
  var h6 = document.createElement("h6");
  var small = document.createElement("small");
  var span = document.createElement("span");
  var del = document.createElement("a");

  del.setAttribute("href", "#");
  li.className = "list-group-item d-flex justify-content-between 1h-sm";
  h6.className = "may-0";
  small.className = "text-muted";
  span.className = "text-muted";
  del.className = "btn btn-danger  btn-sm";


  var delText = document.createTextNode(" x ");
  var h6Text = document.createTextNode(d[0].nombre);
  var smallText = document.createTextNode(
    d[0].descripcion.slice(0, 20) + "..."
  );
  var spanText = document.createTextNode(moneyUS.format(d[0].precio) + " ");
  li.dataset.id = d[0].id;

  //event Del
  del.addEventListener("click", function (event) {
    event.preventDefault;
    var list = document.getElementById("list-item");
    var nodes = Array.from(list.children);
    var li = event.target.parentElement.closest("li");
    var index = nodes.indexOf(li);
    console.log(index);
    data.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(data));
    list.removeChild(li);
    document.getElementById("count").innerHTML=data.length;
  
    
  });

  del.appendChild(delText);
  h6.appendChild(h6Text);
  small.appendChild(smallText);
  span.appendChild(spanText);
  span.appendChild(del);
  div.appendChild(h6);
  div.appendChild(small);
  li.appendChild(div);
  li.appendChild(span);

  return li;
}

function getAmount(){
  var amount= parseFloat(0);
  for(var i in data){
    amount= amount + parseFloat(data[i][0].precio);
  }
  document.getElementById("amount").innerHTML= "<b>" + moneyUS.format(amount) + "</b>"
}