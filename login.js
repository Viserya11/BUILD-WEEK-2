


  function logIn(){
    let username = document.getElementById('uname').value;
    let password = document.getElementById('psw').value;
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    if (username === ""){
       
        alert('Invalid Login Credentials')
      
       }else{

        alert('Succesful Login')
       
      
       }
      
      
    
  }

 
