const getCurrentUser = async (id) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`)
    const currentUser = await response.json()

    return currentUser.data
}

const displayUserDetails = (user = {}) => {
    const spinner = document.querySelector(".loading-spinner-wrapper")
    
    if (Object.keys(user).length === 0) {
        document.querySelector(".not-found").classList.remove("d-none")
        spinner.classList.add("d-none")

        return
    }

    document.querySelector(".picture").src = user.avatar
    document.querySelector(".name").textContent = user.first_name + " " + user.last_name
    document.querySelector(".email").textContent = user.email
    document.querySelector(".details-wrapper").classList.remove("d-none")
    spinner.classList.add("d-none")
}

const getUrlParameter = (parameter) => {
    const query = window.location.search
    const urlParams = new URLSearchParams(query)
    const desiredParameter = urlParams.get(parameter)

    return desiredParameter
}

const initApp = async () => {
    const userId = getUrlParameter("id")
    const currentUser = await getCurrentUser(userId)
    displayUserDetails(currentUser)
}
initApp()
