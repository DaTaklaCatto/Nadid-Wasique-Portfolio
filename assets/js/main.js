gsap.registerPlugin(CustomEase);

gsap.set(".nav", { display: "none" });

CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

gsap.defaults({
  ease: "main",
  duration: 0.7,
});

function initMenu() {
  let navWrap = document.querySelector(".nav");
  let state = navWrap.getAttribute("data-nav");
  let overlay = navWrap.querySelector(".overlay");
  let menu = navWrap.querySelector(".menu");
  let bgPanels = navWrap.querySelectorAll(".bg-panel");
  let menuToggles = document.querySelectorAll("[data-menu-toggle]");
  let menuLinks = navWrap.querySelectorAll(".menu-link");
  let fadeTargets = navWrap.querySelectorAll("[data-menu-fade]");
  let menuButton = document.querySelector(".menu-button");
  let menuButtonTexts = menuButton.querySelectorAll("p");
  let menuButtonIcon = menuButton.querySelector(".menu-button-icon");

  let tl = gsap.timeline();

  const openNav = () => {
    navWrap.setAttribute("data-nav", "open");

    tl.clear()
      .set(navWrap, { display: "block" })
      .set(menu, { xPercent: 0 }, "<")
      .fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
      .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, "<")
      .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
      .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
      .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35")
      .fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, "<+=0.2");
  };

  const closeNav = () => {
    navWrap.setAttribute("data-nav", "closed");

    tl.clear()
      .to(overlay, { autoAlpha: 0 })
      .to(menu, { xPercent: 120 }, "<")
      .to(menuButtonTexts, { yPercent: 0 }, "<")
      .to(menuButtonIcon, { rotate: 0 }, "<")
      .set(navWrap, { display: "none" });
  };

  // Toggle menu open / close depending on its current state
  menuToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      state = navWrap.getAttribute("data-nav");
      if (state === "open") {
        closeNav();
      } else {
        openNav();
      }
    });
  });

  // If menu is open, you can close it using the "escape" key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navWrap.getAttribute("data-nav") === "open") {
      closeNav();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();

  var cursor = document.querySelector(".cursor"),
    cursorScale = document.querySelectorAll(".cursor-scale"),
    mouseX = 0,
    mouseY = 0;

  gsap.to({}, 0.016, {
    repeat: -1,

    onRepeat: function () {
      gsap.set(cursor, {
        css: {
          left: mouseX,
          top: mouseY,
        },
      });
    },
  });

  window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  cursorScale.forEach((link) => {
    link.addEventListener("mouseleave", () => {
      cursor.classList.remove("grow");
      cursor.classList.remove("grow-small");
    });
    link.addEventListener("mousemove", () => {
      cursor.classList.add("grow");
      if (link.classList.contains("small")) {
        cursor.classList.remove("grow");
        cursor.classList.add("grow-small");
      }
    });
  });

  const linkOut = document.querySelectorAll(".link-out");

  linkOut.forEach((linker) => {
    linker.addEventListener("mouseenter", () => {
      cursor.innerHTML = "<i class='fa-thin fa-arrow-up-right'></i>";
    });
    linker.addEventListener("mouseleave", () => {
      cursor.innerHTML = "";
    });
  });

  let counter = 50;
  const preloaderCounter = document.getElementById("preloader-counter");
  const interval = setInterval(() => {
    if (counter < 100) {
      counter++;
      preloaderCounter.textContent = counter + "%";
    } else {
      clearInterval(interval);
      gsap.to("#preloader", {
        x: "-100%",
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          document.getElementById("preloader").style.display = "none";
        },
      });
    }
  }, 30);
});

// const containers = document.querySelectorAll(".input-container");
// const form = document.querySelector("form");

// const tl = gsap.timeline({
//   defaults: {
//     duration: 1,
//   },
// });

// //Line
// const start = "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
// const end = "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

// //Elastic Effect
// containers.forEach((container) => {
//   const input = container.querySelector(".input");
//   const line = container.querySelector(".elastic-line");
//   const placeholder = container.querySelector(".placeholder");

//   input.addEventListener("focus", () => {
//     //Check to see if there is any text in the input
//     if (!input.value) {
//       tl.fromTo(
//         line,
//         {
//           attr: {
//             d: start,
//           },
//         },
//         {
//           attr: {
//             d: end,
//           },
//           ease: "Power2.easeOut",
//           duration: 0.75,
//         }
//       );
//       tl.to(
//         line,
//         {
//           attr: {
//             d: start,
//           },
//           ease: "elastic.out(3,0.5)",
//         },
//         "<50%"
//       );
//       //Placeholder Shift
//       tl.to(
//         placeholder,
//         {
//           top: -15,
//           left: 0,
//           scale: 0.7,
//           duration: 0.5,
//           ease: "Power2.easeOut",
//         },
//         "<15%"
//       );
//     }
//   });
// });

// //Revert back if it's not focused
// form.addEventListener("click", () => {
//   containers.forEach((container) => {
//     const input = container.querySelector(".input");
//     const line = container.querySelector(".elastic-line");
//     const placeholder = container.querySelector(".placeholder");

//     if (document.activeElement !== input) {
//       if (!input.value) {
//         gsap.to(placeholder, {
//           top: 0,
//           left: 0,
//           scale: 1,
//           duration: 0.5,
//           ease: "Power2.easeOut",
//         });
//       }
//     }
//     //We will do our validation
//     //Name Validation
//     input.addEventListener("input", (e) => {
//       if (e.target.type === "text") {
//         let inputText = e.target.value;
//         if (inputText.length > 2) {
//           colorize("#6391E8", line, placeholder);
//         } else {
//           colorize("#FE8C99", line, placeholder);
//         }
//       }
//       //Validate Email
//       if (e.target.type === "email") {
//         let valid = validateEmail(e.target.value);
//         if (valid) {
//           colorize("#6391E8", line, placeholder);
//         } else {
//           colorize("#FE8C99", line, placeholder);
//         }
//       }
//       //Validate Phone
//       if (e.target.type === "tel") {
//         let valid = validatePhone(e.target.value);
//         if (valid) {
//           colorize("#6391E8", line, placeholder);
//         } else {
//           colorize("#FE8C99", line, placeholder);
//         }
//       }
//     });
//   });
// });

// // checking email validation

// function validateEmail(email) {
//   let re = /\S+@\S+\.\S+/;
//   return re.test(email);
// }

// function validatePhone(phone) {
//   let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
//   return re.test(phone);
// }

// //COLORIZE FUNCTION
// function colorize(color, line, placeholder) {
//   gsap.to(line, {
//     stroke: color,
//     duration: 0.75,
//   });
//   gsap.to(placeholder, {
//     color: color,
//     duration: 0.75,
//   });
// }

// //Checkbox animation fill
// const checkbox = document.querySelector(".checkbox");
// const tl2 = gsap.timeline({
//   defaults: {
//     duration: 0.5,
//     ease: "Power2.easeOut",
//   },
// });
// const tickMarkPath = document.querySelector(".tick-mark path");
// const pathLength = tickMarkPath.getTotalLength();

// gsap.set(tickMarkPath, {
//   strokeDashoffset: pathLength,
//   strokeDasharray: pathLength,
// });

// checkbox.addEventListener("click", () => {
//   if (checkbox.checked) {
//     tl2.to(".checkbox-fill", {
//       top: "0%",
//     });
//     tl2.fromTo(
//       tickMarkPath,
//       {
//         strokeDashoffset: pathLength,
//       },
//       {
//         strokeDashoffset: 0,
//       },
//       "<50%"
//     );
//     tl2.to(
//       ".checkbox-label",
//       {
//         color: "#6391e8",
//       },
//       "<"
//     );
//   } else {
//     tl2.to(".checkbox-fill", {
//       top: "100%",
//     });
//     tl2.fromTo(
//       tickMarkPath,
//       {
//         strokeDashoffset: 0,
//       },
//       {
//         strokeDashoffset: pathLength,
//       },
//       "<50%"
//     );
//     tl2.to(
//       ".checkbox-label",
//       {
//         color: "#c5c5c5",
//       },
//       "<"
//     );
//   }
// });

// //Animating Character
// gsap.set("#eye", {
//   transformOrigin: "center",
// });
// gsap.fromTo(
//   "#eye",
//   {
//     scaleY: 1,
//   },
//   {
//     scaleY: 0.3,
//     repeat: -1,
//     yoyo: true,
//     repeatDelay: 0.5,
//     ease: "Power2.easeOut",
//   }
// );
// gsap.fromTo(
//   "#eyebrow",
//   {
//     y: 0,
//   },
//   {
//     y: -1,
//     repeat: -1,
//     yoyo: true,
//     repeatDelay: 0.5,
//     ease: "Power2.easeOut",
//   }
// );

// //Submit button
// const button = document.querySelector("button");
// const tl3 = gsap.timeline({
//   defaults: {
//     duration: 0.75,
//     ease: "Power2.easeOut",
//   },
// });

// button.addEventListener("click", (e) => {
//   e.preventDefault();
//   tl3.to(".contact-right, .contact-left", {
//     y: 30,
//     opacity: 0,
//     pointerEvents: "none",
//   });
//   tl3.to(
//     "form",
//     {
//       scale: 0.8,
//     },
//     "<"
//   );
//   tl3.fromTo(
//     ".submitted",
//     {
//       opacity: 0,
//       y: 30,
//     },
//     {
//       opacity: 1,
//       y: 0,
//     }
//   );
//   //Hand wave
//   gsap.set("#hand", {
//     transformOrigin: "left",
//   });
//   gsap.fromTo(
//     "#hand",
//     {
//       rotation: 0,
//       y: 0,
//     },
//     {
//       rotation: -10,
//       y: 2,
//       ease: "elastic(3,0.3)",
//       duration: 2,
//       delay: 1,
//     }
//   );
// });
