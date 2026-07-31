let allProjects = [];
fetch("project_update.json")
.then(res => res.json())
.then(data=>{
    allProjects = data;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const category = params.get("category");
    if(id){
        const project = allProjects.find(p=>p.id===id);
        if(project){
            showDetails(project);
        }
    }else{
        showProjects(category || "all");
    }
});
function showProjects(category){
    const switchBtn = document.getElementById("switch-category");
    switchBtn.style.display="inline-block";
    if(category === "design"){
        switchBtn.textContent = "View Develops →";
        switchBtn.href = "projects.html?category=develop";
    }
    else if(category === "develop"){
        switchBtn.textContent = "View Designs →";
        switchBtn.href = "projects.html?category=design";
    }
else{
    switchBtn.style.display = "none";
}
    document.getElementById("project-list").style.display="grid";
    document.getElementById("project-details").style.display="none";
    const container=document.getElementById("project-list");
    container.innerHTML="";
    const filtered = allProjects.filter(p=>p.category===category);
    filtered.forEach(project=>{
        const card=document.createElement("div");
        card.className="project-card";
        card.innerHTML=`
            <img loading="lazy" src="${project.images[0]}" alt="${project.title}">
            <h3>${project.title}</h3>
        `;
        card.onclick=()=>{
            window.location.href=`projects.html?id=${project.id}`;
        };
        container.appendChild(card);
    });
}
function showDetails(project){
    document.getElementById("switch-category").style.display="none";
    document.getElementById("project-list").style.display="none";
    document.getElementById("project-details").style.display="block";
    document.getElementById("detail-title").innerHTML = project.title;
    document.getElementById("detail-description").innerHTML = project.description;
    let images = document.getElementById("detail-images");
    images.innerHTML="";
    project.images.forEach(img=>{
        images.innerHTML += `
        <img loading="lazy" src="${img}" alt="${project.title}" class="detail-image">
        `;
    });
    if(project.videos){
    project.videos.forEach(video=>{
        images.innerHTML += `
        <video controls class="detail-video">
            <source src="${video}" type="video/mp4">
            Your browser does not support video.
        </video>
        `;
    });
}
    let links = document.getElementById("detail-links");
    links.innerHTML="";
    if(project.links){
        for(let key in project.links){
            links.innerHTML += `
            <a href="${project.links[key]}" target="_blank">
                ${key}
            </a>
            `;
        }
    }
}