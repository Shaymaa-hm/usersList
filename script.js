const generateUsers = async (destination = 1) => {
    const users = await getUsers(destination)
    displayUsers(users)
}

const getUsers = async (page) => {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`)
    const users = await response.json()

    return users.data
}

const displayUsers = (users) => {
    const usersContainer = document.querySelector(".users-container")
    const usersHtmlContent = users.map(user => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
            <div class="card">
                <img class="image object-fit-cover" src="${user.avatar}">
                <div class="card-body">
                    <h4 class="card-title">${user.first_name + " " + user.last_name}</h5>
                    <p class="card-text">${user.email}</p>
                    <a href="./profile/?id=${user.id}" class="btn btn-primary">Read more</a>
                </div>
            </div>
        </div>
    `)
    
    usersContainer.innerHTML = usersHtmlContent.join("")
}

const initApp = async () => {
    const paginationLinks = document.querySelectorAll(".pagination .page-link")
    
    paginationLinks.forEach(link => {
        link.addEventListener("click", async function() {
            const destination = this.dataset.page
            generateUsers(destination)
        })
    })
    
    generateUsers()
}

initApp()
