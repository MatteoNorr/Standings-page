import { qS, cE } from "./utils/fn.js";
import { GET, videogamesGen } from "./utils/https.js";

//variables
const hero = qS(".hero");
const userContainer = qS(".content-section");
const screenModeBtn = qS(".content-section__title__switch-toggle");
const screenModeImg = qS(".switch-toggle__img");
const users = cE("div", "users");
const dataTitle = qS(".users__data-title");
const contentTitle = qS(".content-section__title");
const header = qS(".header");
const sidebar = qS(".sidebar");
const gamersContainer = cE("div", "sidebar__container-gamers");
const gamersTitle = qS(".sidebar__other-players h2");
const navbar = qS(".navbar");
const searchBtn = qS(".search-btn");
const searchBtnImg = qS(".search-btn img");
const searchInput = qS(".search-input");

sidebar.append(gamersContainer);
userContainer.append(users);

//User generator with points and sort
GET("https://jsonplaceholder.typicode.com/users").then((data) => {
  data
    .map((user) => {
      user.points = parseInt(Math.random() * 10 + 1);
      return user;
    })
    .sort((a, b) => a.points - b.points)
    .forEach((user) => {
      const userInfo = cE("div", "user-info");
      const userMail = cE("p", "user-mail", user.email);
      const nameContainer = cE("div", "name-container");
      const username = cE("p", "username", user.username);
      const name = cE("span", "name", user.name);
      const userPoints = cE("p", "user-points", user.points);

      screenModeBtn.addEventListener("click", () => {
        userInfo.classList.toggle("user-info-light");
      });

      nameContainer.append(username, name);
      userInfo.append(nameContainer, userMail, userPoints);
      users.append(userInfo);
      userContainer.append(users);
    });
});

//hero generator
videogamesGen().then((game) => {
  const heroTextContainer = cE("div", "hero__text-container");
  const gameTitle = cE("h2", "hero__game-title", game.title);
  const gameDescription = cE(
    "p",
    "hero__game-description",
    game.short_description
  );
  const heroImgContainer = cE("div", "hero__image");
  const heroImg = cE("img", "hero__img-thumbnail");

  hero.style.backgroundImage = `url(${game.screenshots[0].image})`;
  heroImg.src = game.thumbnail;

  screenModeBtn.addEventListener("click", (e) => {
    heroTextContainer.classList.toggle("users__data-title-light");
  });

  //modal generator
  heroImg.addEventListener("click", () => {
    document.body.style.overflow = "hidden";
    navbar.remove();
    searchBtn.remove();
    const modalContainer = cE("div", "modal-container");
    const modalContainerCard = cE("div", "modal-container-card");
    const modalImg = cE("img", "modal-img");
    const modalTitle = cE("h2", "modal-title", game.title);
    const modalDescription = cE("p", "modal-description", game.description);
    const modalPlatform = cE(
      "p",
      "modal-description",
      `Platform: ${game.platform}`
    );

    modalImg.src = game.thumbnail;
    modalContainerCard.style.backgroundImage = `url(${game.screenshots[0].image})`;
    const modalCloseBtn = cE("button", "modal-close-btn", "x");

    modalCloseBtn.addEventListener("click", () => {
      document.body.style.overflowY = "scroll";
      document.body.append(navbar);
      document.body.append(searchBtn);
      modalContainer.remove();
    });

    document.body.append(modalContainer);
    modalContainer.appendChild(modalContainerCard);
    modalContainerCard.append(
      modalImg,
      modalTitle,
      modalDescription,
      modalPlatform,
      modalCloseBtn
    );
  });
  //modal end

  heroTextContainer.append(gameTitle, gameDescription);
  heroImgContainer.append(heroImg);
  hero.append(heroTextContainer, heroImgContainer);
});

//User generator of the year
GET("https://rickandmortyapi.com/api/character/?page=19").then((data) => {
  const res = data.results;
  res.forEach((el) => {
    if (el.id > 360 && el.id < 371) {
      const globalUserInfo = cE("div", "global-user-info");
      const imgUser = cE("img", "global-user-img");
      const globalUserName = cE("p", "global-username", el.name);
      for (let i = 1; i < 11; i++) {
        res[i - 1].position = i;
      }
      const numbPosition = cE("p", "global-position", el.position);

      imgUser.src = el.image;

      globalUserInfo.append(numbPosition, imgUser, globalUserName);
      gamersContainer.append(globalUserInfo);
    }
  });
});

//events
screenModeBtn.addEventListener("click", (e) => {
  screenModeImg.classList.toggle("light-mode-toggle");
  header.classList.toggle("header-light");
  document.body.classList.toggle("body-light");
  contentTitle.classList.toggle("content-title-light");
  dataTitle.classList.toggle("users__data-title-light");
  gamersTitle.classList.toggle("global-rank-title-light");
  gamersContainer.classList.toggle("container-gamers-light");
  navbar.classList.toggle("header-light");
  searchBtn.classList.toggle("header-light");
});

document.body.addEventListener("wheel", (e) => {
  if (e.deltaY > 0) {
    navbar.style.display = "flex";
    searchBtn.style.display = "flex";
  } else if (e.deltaY < 0) {
    navbar.style.display = "none";
    // searchBtn.style.display = "none";
  }
});

searchBtnImg.addEventListener("click", (e) => {
  searchBtn.classList.toggle("search-btn-open");
  searchInput.classList.toggle("visible");
});
