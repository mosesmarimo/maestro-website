// Scroll-reveal (respects prefers-reduced-motion via CSS)
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Mark the active nav link
const here = location.pathname.replace(/index\.html$/, "");
document.querySelectorAll(".nav-links a").forEach((a) => {
  const href = a.getAttribute("href");
  if (!href || href.startsWith("http")) return;
  const target = new URL(href, location.href).pathname.replace(/index\.html$/, "");
  if (target !== "/" && here.startsWith(target)) a.classList.add("active");
});
