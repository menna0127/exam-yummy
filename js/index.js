let data = document.getElementById("data");
let categeory = document.getElementById("#Categories");
let search = document.getElementById("#search");
let area = document.getElementById("#area");
let igredient = document.getElementById("#ingredients");
let contact = document.getElementById("#contact");
let contBtn = document.getElementById("#c-btn");

categeory.addEventListener("click" , function(){
    getCategeory()
});

area.addEventListener("click" , function(){
    getArea()
});

igredient.addEventListener("click" , function(){
    getIgredient()
});

search.addEventListener("click" , function(){
    displaySearch()
});

contact.addEventListener("click" , function(){
    displayForm()
});


$("#open").click(function(){
    $(".side-bar").animate({left:0},500);
    $("#end").removeClass("d-none");
    $("#open").addClass('d-none');
    
});

function close() {
    $(".side-bar").animate({left:-256.562},500);
    $("#open").removeClass("d-none");
    $("#end").addClass('d-none');
}

$("#end").click(function(){
    $(".side-bar").animate({left:-256.562},500);
    $("#open").removeClass("d-none");
    $("#end").addClass('d-none');
    
});
 

async function getMeals() {
    
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Side`);
    var finalResult = await apiResponse.json();
    console.log(finalResult.meals);
    displayMeals(finalResult.meals);
};

getMeals();

function displayMeals(arr) {
    let cartona = '' ;

    for (let i = 0; i < arr.length; i++) {
        
        cartona += 
        `
        <div class="col-md-3">

            <div class="meal position-relative rounded-3" onclick="getrecepie('${arr[i].idMeal}')">

              <img class="w-100" src="${arr[i].strMealThumb}" alt="">

                <div class="meal-name d-flex align-items-center justify-content-center text-black position-absolute">
                  <h3>${arr[i].strMeal}</h3>
                </div>

            </div>

        </div> 

        ` ;
    }

    data.innerHTML = cartona;

}

async function getCategeory() {
    
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    var finalResult = await apiResponse.json();
    console.log(finalResult.categories);
    displayCategoeries(finalResult.categories);
    close();
};


function displayCategoeries(arr) {
    let cartona = '' ;

    for (let i = 0; i < arr.length; i++) {
        
        cartona += 
        `

        <div class="col-md-3">

            <div onclick="getCategeoriesMeals('${arr[i].strCategory}')" class="meal position-relative id="meals" >

              <img class=" w-100 " src="${arr[i].strCategoryThumb}" alt="">

              <div  class="meal-name text-center text-black position-absolute rounded-3 py-2">
                <h3>${arr[i].strCategory}</h3>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
               </div>

            </div>

        </div>

        `
    };

    data.innerHTML = cartona;

};

async function getCategeoriesMeals(categeory) {
    
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categeory}`);
    var finalResult = await apiResponse.json();
    console.log(finalResult.meals);
    displayMeals(finalResult.meals);
    close();
};

async function getArea() {
    
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    var finalResult = await apiResponse.json();
    console.log(finalResult.meals);
    displayArea(finalResult.meals);
    close();
};

async function getAreaMeals(area) {
    
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    var finalResult = await apiResponse.json();
    console.log(finalResult.meals);
    displayMeals(finalResult.meals);
    close();
};

function displayArea(arr) {
    let cartona = '' ;

    for (let i = 0 ; i < arr.length ; i++) {
        
        cartona += 
        `
        <div class="col-md-3">

           <div class="area text-center " onclick="getAreaMeals('${arr[i].strArea}')">
            <i class="fa-solid fa-house-laptop"></i>
            <h3>${arr[i].strArea}</h3>
           </div>

        </div>

        `
         
    }

    data.innerHTML = cartona;

};

async function getIgredient() {
    
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    var finalResult = await apiResponse.json();
    console.log(finalResult.meals);
    displayIngredient(finalResult.meals);
    close();
};

function displayIngredient(arr) {
    let cartona = '' ;

    for (let i = 0; i < arr.length; i++) {
        
        cartona += 
        `
        <div class="col-md-3">

            <div class="ingredients text-center" onclick="getIngredientMeals('${arr[i].strIngredient}')">

                <i class="fa-solid fa-bowl-food pb-2"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription}</p>

            </div>

        </div>

        `
         
    }

    data.innerHTML = cartona;

};

async function getIngredientMeals(ingred) {
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`);
    var finalResult = await apiResponse.json();
    console.log(finalResult.meals);
    displayMeals(finalResult.meals);
    close();
}

async function getrecepie(id) {
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    var finalResult = await apiResponse.json();
    console.log(finalResult.meals);
    displayRecepie(finalResult.meals);
    close();
}

function displayRecepie(meal) {
    let ingredients = ' ';
   for (let i = 0; i <= 20; i++) {
    if (meal[`strIngredient${i}`]){
        ingredients += 
        `
        <li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>
    
        `
    }

     
   }

   let cartona = 

   `
        <div class="col-md-4">

            <div class="meal-img rounded-3 ">

                <img class="w-100 rounded-3 pb-3" src="${meal.strMealThumb}" alt="" />
                <h2>${meal.strMeal}</h2>

            </div>

        </div>

        <div class="col-md-8">

                    <div class="meal-info">

                        <h2>Instructions</h2>
                        <p>${meal.strInstructions}</p>
                        <h3><span class="fw-semibold">Area:</span>${meal.strArea}</h3>
                        <h3><span class="fw-semibold">Category: </span>${meal.strCategory}</h3>
                        <h3>Recipes:</h3>

                        <ul class="d-flex flex-wrap g-3">
                            ${ingredients}
                        </ul>

                        <h3>Tags:</h3>
                        
                        <ul class="d-flex flex-wrap g-3">
                            <li class="alert alert-danger m-2 p-1">${meal.strTags}</li>
                        </ul>

                        <ul class="d-flex">

                            <li><a target="_blank" class="btn btn-success mx-2" href="${meal.strSource}">Source</a></li>
                            <li><a target="_blank" class="btn btn-danger" href="${meal.strYoutube}">Youtube</a></li>

                        </ul>

                    </div>

                </div>

   `
   ;

   data.innerHTML = cartona ;

}

async function searchName(term) {
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    var finalResult = await apiResponse.json();
        displayMeals(finalResult.meals);
    close();
}

async function searchLetter(term) {
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    var finalResult = await apiResponse.json();
    displayMeals(finalResult.meals);
    close();
}

function displaySearch() {
    let cartona = 
    `
        <div class="col-md-6">

            <div class="search">

                <input onkeyup="searchName(this.value)" type="text" id="serachName" placeholder="Search By Name" class="form-control">

            </div>

        </div>

        <div class="col-md-6">

            <div class="search">

                <input onkeyup="searchLetter(this.value)" type="text" id="serachLetter" placeholder="Search By First Letter" class="form-control">

            </div>

        </div>

    `
    ;

    data.innerHTML = cartona ;

    close();

}

function displayForm() {
    let cartona = 
    `
    <div class="col-md-6">

    <div class="form">

        <input type="text" id="name" class="form-control" placeholder="Enter Your Name" onkeyup="validation()">
        <div id="nameAlert" class="w-100 mt-2 alert alert-danger d-none text-center">
            Special characters and numbers not allowed
        </div>

    </div>

   </div>
   <div class="col-md-6">

   <div class="form">

       <input type="email" id="email" class="form-control" placeholder="Enter Your Email" onkeyup="validation()">
       <div id="emailAlert" class="w-100 mt-2 alert alert-danger d-none text-center">
           Email not valid *exemple@yyy.zzz
       </div>

   </div>

  </div>

  <div class="col-md-6">

                <div class="form">

                    <input type="text" id="phone" class="form-control" placeholder="Enter Your Phone Number" onkeyup="validation()">
                    <div id="phoneAlert" class="w-100 mt-2 alert alert-danger d-none text-center">
                        Enter valid Phone Number
                    </div>

                </div>

               </div> 

               <div class="col-md-6">

                <div class="form">

                    <input type="number" id="age" class="form-control" placeholder="Enter Your Age" onkeyup="validation()">
                    <div id="ageAlert" class="w-100 mt-2 alert alert-danger d-none text-center">
                    Enter valid age
                    </div>

                </div>

               </div>

               <div class="col-md-6">

                <div class="form">

                    <input type="password" id="password" class="form-control" placeholder="Enter Your Password" onkeyup="validation()">
                    <div id="passAlert" class="w-100 mt-2 alert alert-danger d-none text-center">              
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>

                </div>

               </div>

               <div class="col-md-6">

                <div class="form">

                    <input type="password" id="repassword" class="form-control" placeholder="Repassword" onkeyup="validation()">
                    <div id="repassAlert" class="w-100 mt-2 alert alert-danger d-none text-center">
                        Enter valid password
                    </div>

                </div>

               </div>

               <div class="button">
            <button type="submit" id="submit" class="btn btn-danger px-3  d-block m-auto" disabled = "true" >Submit</button>
        </div>

    `;

    
    data.innerHTML = cartona;

    close();
}

function validationName() {
    let regexName = /^[a-zA-Z ]+$/;
    return(regexName.test(document.getElementById("name").value)) ;
}

function validationEmail() {
    let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return(regexEmail.test(document.getElementById("email").value)) ;
}

function validationPhone() {
    let regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return(regexPhone.test(document.getElementById("phone").value)) ;
}

function validationAge() {
    let regexAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    return(regexAge.test(document.getElementById("age").value)) ;
}

function validationPassword() {
    let regexPassword = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    return(regexPassword.test(document.getElementById("password").value)) ;
}

function validationRepassword() {
    return(document.getElementById("repassword").value == (document.getElementById("password").value) ) ;
}

function validation() {

    if (validationName() == false) {
        document.getElementById("nameAlert").classList.remove("d-none")
    }else{
        document.getElementById("nameAlert").classList.add("d-none")
    };

    if (validationEmail() == false) {
        document.getElementById("emailAlert").classList.remove("d-none")
    }else{
        document.getElementById("emailAlert").classList.add("d-none")
    };

    if (validationPhone() == false) {
        $("#phoneAlert").removeClass("d-none")
    }else{
        $("#phoneAlert").addClass("d-none")
    };

    if (validationAge() == false) {
        $("#ageAlert").removeClass("d-none")
    }else{
        $("#ageAlert").addClass("d-none")
    };

    if (validationPassword() == false) {
        $("#passAlert").removeClass("d-none")
    }else{
        $("#passAlert").addClass("d-none")
    };

    if (validationRepassword() == false) {
        $("#repassAlert").removeClass("d-none")
    }else{
        $("#repassAlert").addClass("d-none")
    };

    if (validationName() && validationEmail() && validationPhone() && validationAge() &&validationPassword() &&validationRepassword()) {
        document.getElementById("submit").removeAttribute("disabled")
    }

}