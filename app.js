fetch(`https://openapi.programming-hero.com/api/videos/categories`)
  .then((res) => res.json())
  .then((deta) => buttons(deta.data));

const sortByView = (id) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((deta) => {
      deta.data.sort(function (a, b) {
        return parseInt(a.others.views) - parseInt(b.others.views);
      });
      Items(deta.data);
    })
};

const blog = () => {
  const blg = document.getElementById("blgDiv");
  blg.innerHTML = " ";
  const blogs = document.createElement("div");
  blogs.innerHTML = `
    <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <strong>Discussion on the scope of <span class="fw-medium">var, let</span> and <span class="fw-medium">const</span></strong>
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong > The scope of variables declared with var :</strong><br>Variables declared with var can have a global or local scope. Global scope is for variables declared outside functions, while local scope is for variables declared inside functions.
        <br>
        <strong >The scope of variables declared with let :</strong><br>
        Variables declared with let can have a global, local, or block scope. Block scope is for variables declared in a block. A block in JavaScript involves opening and closing curly braces
        <br>
        <strong >The scope of variables declared with const :</strong><br>
        Variables declared with const are similar to let in regards to scope. Such variables can have a global, local, or block scope.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        <strong>The use cases of <span class="fw-medium">null</span> and <span class="fw-medium">undefined</span></strong>
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>Use cases of null :</strong><br>
        1. Explicitly assigning a variable or object property to null indicates that it has no value or that the value is intentionally missing.<br>
        2. It is often used to reset or clear a variable or object property.<br>
        3. It can be used as a placeholder when you expect a value to be assigned later.<br>
        4. null is a value of the null type in JavaScript.<br>
        5. It is a valid value that you can assign to variables or properties.
        <br>
        <strong>Use cases of undefined :</strong><br>
        1. undefined is a built-in JavaScript value that is automatically assigned to variables or object properties when they are declared but not initialized or assigned a value.<br>
        2. It is often used to check if a variable or property has been initialized or assigned.<br>
        3. It indicates that the variable or property has not been defined or assigned any value.<br>
        4. undefined is not a value you typically assign directly to a variable; it's more a state that a variable can be in.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        <strong>What do you mean by <span class="fw-medium">REST API</span>?</strong>
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        An API, or application programming interface, is a set of rules that define how applications or devices can connect to and communicate with each other. A REST API is an API that conforms to the design principles of the REST, or representational state transfer architectural style. For this reason, REST APIs are sometimes referred to RESTful APIs.
      </div>
    </div>
  </div>
</div>`
  blg.appendChild(blogs);
};

const buttons = (btns) => {
  const options = document.getElementById("option")
  options.innerHTML = " ";
  btns.forEach(butn => {
    const opt = document.createElement("div")
    opt.innerHTML = `
        <button type="button" class="btn btn-secondary" id="button" onclick="display(${butn.category_id})">${butn.category}</button>`
    options.appendChild(opt);
  });
};

const display = (id) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((deta) => Items(deta.data, id));
};

display(1000);

const Items = (it, id) => {
  const itemList = document.getElementById("itemContainer");
  itemList.innerHTML = "";
  const srt = document.getElementById("sortbtn");
  srt.innerHTML = "";
  srt.innerHTML = `
  <button type="button" class="btn btn-secondary" onclick="sortByView(${id})">Sort by view</button>`
  if (it.length == 0) {
    const er = document.createElement("div");
    er.innerHTML = `
      <div class="mt-5">
        <div class="d-flex justify-content-center"><img src="./Icon.png" class="img-fluid"></div>
        <div class="d-flex justify-content-center mt-3"><h5 class="fw-bolder fs-1 text-center">Oops!! Sorry, There is no content here</h5>
        </div>
      </div>`
    itemList.appendChild(er);
  }
  else {
    it.forEach(item => {
      const card = document.createElement("div");
      card.innerHTML = `
        <div class="thumbnail" style="width: 18rem;">
          <div class="position-relative">
            <img src="${item.thumbnail}" class="img-fluid rounded" alt="...">
            <div class="text-white bg-black position-absolute bottom-0 end-0">
            ${time(item.others.posted_date)}</div>
          </div>
          <div class="row mt-4">
            <div class="col-sm-3">
              <img src="${item.authors[0].profile_picture}" class="img-fluid rounded-circle">
            </div>
            <div class="col-sm-9" >
              <h4 class="title">${item.title}</h4>
              <p class="fw-light">${item.authors[0].profile_name}<span> ${item.authors[0].verified ? `<img src="./blue-verified-sign.svg" id="badge">` : ""}</span></p> 
              <p class="fw-light">${item.others.views} views</p>
            </div>
          </div>
        </div>`;
      itemList.appendChild(card);
    }
    );
  }
};

const time = (totalSeconds) => {
  if (totalSeconds != "") {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    return hours + "h " + minutes + "m " + seconds + "s";
  }
  else {
    return "";
  }
};
