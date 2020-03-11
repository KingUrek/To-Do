let root =document.documentElement;

let selectedFilter;
let isAnyFilterSelected;

let themeLink = document.getElementById("theme-link");
function filterDisplay(filter,target) {

    if (target.classList.contains("t-selected")){
        selectedFilter =  undefined;
        target.classList.remove("t-selected");

    }

    else{
        if(selectedFilter !== undefined){
            selectedFilter.classList.remove("t-selected");
        }
        selectedFilter = target;
        selectedFilter.classList.add("t-selected");

    }




    let invisibles = document.querySelectorAll(".invisible");

    console.log(invisibles)
    for (let inviTask of invisibles) {
        inviTask.classList.remove("invisible");
    }

    if(selectedFilter !== undefined){
        for (let task of taskContainer.children){

            if (!task.classList.contains(filter))
            {
                task.classList.add("invisible");
            }
        }
    }

}


let profilePicture=document.getElementById("profile-picture-id");
function changeTheme(theme) {
    localStorage.setItem("theme",theme);
    let gender = localStorage.getItem("gender");

    if(theme == "trybe"){
        themeLink.setAttribute("href","trybe-theme.css")

        if (gender == "M"){
            profilePicture.src = "Imagens/male-trybe-theme.svg"
        }

        if(gender == "F"){
            profilePicture.src = "Imagens/female-trybe-theme.svg";
        }
    }



    else if(theme == "cyberpunk"){
        themeLink.setAttribute("href","cyperpunk-css.css")

        if (gender == "M"){
            profilePicture.src = "Imagens/man.svg"
        }

        if(gender == "F"){
            profilePicture.src = "Imagens/woman.svg";
        }
    }


}
function inicializePage(){

    let name = localStorage.getItem("name");
    let gender = localStorage.getItem("gender");
    let theme = localStorage.getItem("theme");

    if (!theme){
        theme = "cyberpunk"
        localStorage.setItem("theme","cyberpunk")
    }



    if(name && gender){
        let profilePicture=document.getElementById("profile-picture-id");
        let textContainer = document.querySelector("#text-container");
        let date = DateSet();
        let period;
        if (date[3] >= 5 && date[3] <= 11){
            period = "Morning"
        }
        if (date[3] >= 12 && date[3] <= 19){
            period = "Afternoon"
        }
        if (date[3] >= 20 || date[3] <= 4){
            period = "Night"
        }

        textContainer.innerHTML= `<p class="profile-text">Good ${period}, ${name}</p>
        <p class="profile-date"><span class="date-day">${date[0]}</span>,${date[1]} ${date[2]}</p>`


        if (theme == "trybe")
        {
            themeLink.setAttribute("href","trybe-theme.css")

            if (gender == "M"){
                profilePicture.src = "Imagens/male-trybe-theme.svg"
            }

            if(gender == "F"){
                profilePicture.src = "Imagens/female-trybe-theme.svg";
            }
        }

        else if(theme == "cyberpunk")
        {
            themeLink.setAttribute("href","cyperpunk-css.css")
            if (gender == "M"){
                profilePicture.src = "Imagens/man.svg"
            }

            if(gender == "F"){
                profilePicture.src = "Imagens/woman.svg";
            }
        }





    }

    else{
        signInFormsOpener();

    }
}

inicializePage()

function DateSet(){
    let d = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return [days[d.getDay()],d.getDate(),months[d.getMonth()],d.getHours()]
}

function signInFormsOpener(){
    document.querySelector('.sign-in-forms').style.transform = 'translate(-50%,-50%) scale(1)';
    document.querySelector('.sign-in-bg').style.transform='translate(-50%,-50%) scale(1)';

}
function signInFormsSubmit(){
    localStorage.setItem("name",document.getElementById("name-input").value);
    localStorage.setItem("gender",document.getElementById("sex-input").value);

    document.querySelector('.sign-in-forms').style.transform = 'translate(-50%,-50%) scale(0)';
    document.querySelector('.sign-in-bg').style.transform='translate(-50%,-50%) scale(0)';
    inicializePage()


}



let taskContainer = document.querySelector(".task-container");
taskContainer.innerHTML = localStorage.getItem('tasks');


let selectedIcon = document.querySelector(".selected");
function selectIcon(target) {
    selectedIcon.classList.remove("selected");

    target.classList.add("selected");
    selectedIcon = target;
}

// for(let icon of document.getElementsByClassName("sidebar-item")){
//     icon.setAttribute("onclick","selectIcon(this)");
// }

for(let icon of document.getElementsByClassName("sidebar-item")){
    icon.addEventListener("click",function ()
    {
        selectIcon(this);

    });
}


function changeCheckValue(target) {

    if(target.parentElement.classList.contains("done")){
        target.parentElement.classList.remove("done");
        target.setAttribute('checked',false)
    }

    else{
        target.parentElement.classList.add("done");
        target.setAttribute('checked',true)
    }

    saveTasks()


}

function setFavorite(target) {
    if(target.parentElement.parentElement.classList.contains("favorite")){
        target.parentElement.parentElement.classList.remove("favorite")
    }

    else{
        target.parentElement.parentElement.classList.add("favorite")
    }

    saveTasks()
}

function setImportant(target) {
    if(target.parentElement.parentElement.classList.contains("important")){
        target.parentElement.parentElement.classList.remove("important")
    }

    else{
        target.parentElement.parentElement.classList.add("important")
    }

    saveTasks()
}

function openAddTask() {
    let model = document.getElementById("model");
    let modelBg = document.getElementById("model-background");
    modelBg.classList.add("active");
    model.classList.add("active")
}

function resetForm(form) {
    let formFields = form.children;

    for(let input of formFields){
        if(input.hasChildNodes()){
            resetForm(input);
        }
        else{
            if(input.type === "checkbox"){
                input.checked= false;
            }
            else{
                input.value = "";
            }
        }
    }
}

function closeAddTask() {
    let model = document.getElementById("model");
    let modelBg = document.getElementById("model-background");
    resetForm(model);
    model.classList.remove("active");
    modelBg.classList.remove("active");
}

function saveTasks() {
    localStorage.setItem('tasks',taskContainer.innerHTML);

}


//TODO:ADD COMMENTS AND TAGS TO THE NEW TASK AS SOON AS COMMENTS ARE IMPLEMENTED

function makeTask() {
    let model = document.getElementById("model");
    // let taskContainer = document.querySelector(".task-container");

    let taskTitle = document.getElementById("model-task-input").value;
    let priority = document.getElementById("model-priority").checked;
    let favorited = document.getElementById("model-favorited").checked;


    let task = document.createElement("li");
    task.classList.add("task");
    if(priority){task.classList.add("important")}
    if(favorited){task.classList.add("favorite")}

    task.innerHTML = ` <input type="checkbox" class="checkbox" oninput="changeCheckValue(this)">
                <p class="task-text">${taskTitle}</p>
                <div class="task-icon-container">
                    <i class="fas fa-star task-icon " onclick="setFavorite(this)"></i>
                    <i class="fas fa-exclamation-triangle task-icon  " onclick="setImportant(this)"></i>
                    <i class="fas fa-trash task-icon" onclick="deleteTask(this)"></i>
                </div>`

    taskContainer.appendChild(task);

    closeAddTask();
    saveTasks()



}

function deleteTask(target) {
    target.parentElement.parentElement.remove()
    saveTasks()

}







