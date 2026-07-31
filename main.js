const showMore = document.querySelector(".show-more");
const moreText = document.querySelector(".more-text");
if(showMore && moreText){
    showMore.onclick=()=>{
    moreText.classList.toggle("show");
    showMore.innerHTML = 
    moreText.classList.contains("show") 
    ? "Show less ↑" 
    : "Show more ↓";
}
};
const icons = document.querySelectorAll(".icon");
const socialName = document.getElementById("social-name");
if(socialName){
    icons.forEach(icon => {
        icon.addEventListener("mouseenter", () => {
            socialName.textContent = icon.dataset.name;
        });
        icon.addEventListener("mouseleave", () => {
            socialName.textContent = "Socials";
        });
    });
}
fetch("project_update.json")
.then(res => res.json())
.then(projects => {
    const designContainer = document.getElementById("design-project");
    const developContainer = document.getElementById("develop-project");
    const designProjects = projects
        .filter(p => p.category === "design")
        .slice(-4);
    const developProjects = projects
        .filter(p => p.category === "develop")
        .slice(-4);
    function createCard(project, container){
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <img loading="lazy" src="${project.images[0]}" alt="${project.title}">
            <h3>${project.title}</h3>
        `;
        card.onclick = () => {
            window.location.href = `projects.html?id=${project.id}`;
        };
        container.appendChild(card);
    }
    designProjects.forEach(p => createCard(p, designContainer));
    developProjects.forEach(p => createCard(p, developContainer));
});