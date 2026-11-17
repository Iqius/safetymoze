/* =========================================
   SAFETYMOZE — main.js
   - Menu mobile
   - Animasi masuk saat di-scroll
   - Tombol "Tanya produk" membuka WhatsApp dengan pesan terisi
   ========================================= */

(function () {
  "use strict";

  var WA_NUMBER = "628113099889";

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Buka menu" : "Tutup menu");
      nav.classList.toggle("is-open", !open);
    });

    // Tutup menu saat salah satu link dipilih
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Buka menu");
        nav.classList.remove("is-open");
      });
    });
  }

  /* ---------- Animasi masuk saat di-scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // cukup sekali
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Browser lama: tampilkan semua langsung
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Tombol "Tanya produk" -> WhatsApp dengan pesan terisi ---------- */
  document.querySelectorAll("a[data-product]").forEach(function (btn) {
    var product = btn.getAttribute("data-product");
    var message =
      "Halo Safetymoze, saya mau tanya produk " + product +
      ". Mohon info harga dan stok, terima kasih.";

    btn.setAttribute("href", "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message));
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener");
  });

  /* ---------- Tombol WhatsApp mengambang: isi pesan umum ---------- */
  var waFloat = document.getElementById("wa-float");
  if (waFloat) {
    waFloat.setAttribute(
      "href",
      "https://wa.me/" + WA_NUMBER + "?text=" +
      encodeURIComponent("Halo Safetymoze, saya mau tanya tentang sepatu safety.")
    );
  }
})();
