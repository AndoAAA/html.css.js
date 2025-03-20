let learnMoreBtn = document.querySelector(".learn-more");
let burgerBtn = document.querySelector(".burger");
let readMoreBtn = document.querySelectorAll(".read-more-button");

burgerBtn.addEventListener("click", function () {
  if (document.querySelector(".burger-menu")) return;

  let burgerMenu = document.createElement("div");
  burgerMenu.classList.add("burger-menu");
  burgerMenu.innerHTML = `
    <button class="close">X</button>
    <a href="#" target="_blank">Home</a>
  `;

  document.body.appendChild(burgerMenu);

  document.body.classList.add("blurred");
  document.body.style.overflow = "hidden";

  document.querySelector(".close").addEventListener("click", closeMenu);
});

readMoreBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

learnMoreBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

function closeMenu() {
  let burgerMenu = document.querySelector(".burger-menu");
  if (burgerMenu) {
    burgerMenu.remove();
  }

  document.body.classList.remove("blurred");
  document.body.style.overflow = "auto";
}

let sections = document.querySelectorAll("section");

let observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("start-animate");
      } else {
        entry.target.classList.remove("start-animate");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

sections.forEach((sec) => observer.observe(sec));

let form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;
  let id = "id" + Math.random().toString(16).slice(2);

  let name = document.querySelector(".nameInput").value;
  let email = document.querySelector(".emailInput").value;
  let message = document.querySelector(".messageInput").value;
  let accept = document.querySelector(".acceptInput");

  let regexForTexts = /^([a-zA-Z]{2,}\)?)/;
  let regexForEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!regexForTexts.test(name)) {
    document.querySelector(".nameInput").style.border = "2px solid red";
    valid = false;
  } else {
    document.querySelector(".nameInput").style.border = "2px solid green";
  }
  if (!regexForEmail.test(email)) {
    document.querySelector(".emailInput").style.border = "2px solid red";
    valid = false;
  } else {
    document.querySelector(".emailInput").style.border = "2px solid green";
  }
  if (!regexForTexts.test(message)) {
    document.querySelector(".messageInput").style.border = "2px solid red";
    valid = false;
  } else {
    document.querySelector(".messageInput").style.border = "2px solid green";
  }

  if (!accept.checked) {
    valid = false;
  } else {
    valid = true;
  }

  if (valid) {
    let userMessage = { id };
    Array.from(form.elements).forEach((element) => {
      if (element.name) {
        userMessage[element.name] = element.value;
      }
    });
    localStorage.setItem("userMessage", JSON.stringify(userMessage));

    let submitBTn = document.querySelector(".submitButton");
    submitBTn.innerHTML = `
    <button class="successButton">Thank you! Your message has been sent.</button>
    `;
    submitBTn.querySelector(".successButton").addEventListener("click", () => {
      location.reload();
    });

    form.reset();
  }
});
