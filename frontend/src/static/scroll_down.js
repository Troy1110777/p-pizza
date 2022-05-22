function scrollWin()
{
    window.scrollBy({down:90, behavior: "smooth"})
}

function Scroll()
{
    document.querySelector('.scroll').addEventListener("click", scrollWin)
}