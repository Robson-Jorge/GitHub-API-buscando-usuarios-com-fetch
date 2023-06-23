const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                            <span><i class="fas fa-user-friends"></i> ${user.followers} followers · ${user.following} following</span>
                                        </div>
                                     </div>`

        let repositoriesItens = ""
        
        user.repositories.forEach(repo => {
            repositoriesItens += `<li>
                                    <a href="${repo.html_url}" target="_blank">${repo.name}
                                        <ul>
                                            <li> <i class="fas fa-code-branch"></i> ${repo.forks} | </li> 
                                            <li> <i class="far fa-star"></i> ${repo.stargazers_count} | </li>
                                            <li> <i class="far fa-eye"></i> ${repo. watchers} | </li>
                                            <li> <i class="fas fa-laptop-code"></i> ${repo.language ?? "Não informado"}</li>
                                        </ul>
                                    </a>
                                 </li>`
        });

        if(user.repositories.length > 0){
            this.userProfile.innerHTML +=   `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItens = ""

        user.events.forEach(event => {
            let type = event.type
            let commits = event.payload.commits
        
            if(type === 'PushEvent'){ 
                eventsItens += `<li>
                                    <p>${event.repo.name}</p>
                                    <span>- ${commits[0].message}</span>
                                </li>`

            } else {
                eventsItens += `<li>
                                    <p>${event.repo.name}</p> 
                                    <span>- Evento de criação sem mensagem</span>
                                </li>`
            }

        });
            
        if(user.events.length > 0){
            this.userProfile.innerHTML +=   `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`
        }
    },

    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }