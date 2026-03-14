document.addEventListener("nav", () => {
  const filterBtns = document.querySelectorAll<HTMLButtonElement>(".filter-btn")
  if (filterBtns.length === 0) return

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      document.querySelectorAll<HTMLLIElement>(".section-li[data-category]").forEach((li) => {
        if (!filter || filter === "all") {
          li.style.display = ""
        } else {
          li.style.display = li.dataset.category === filter ? "" : "none"
        }
      })
    })
  })
})
