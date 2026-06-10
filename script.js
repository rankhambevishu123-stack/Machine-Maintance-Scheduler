function login(){
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  // simple demo credentials
  if(user === "admin" && pass === "1234"){
    window.location.href = "dashboard.html";  // 🔥 redirect
  }
  else{
    alert("Wrong credentials");
  }
}function login(){
  window.location.href = "dashboard.html";
}