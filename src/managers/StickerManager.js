export const createSticker = (sticker) => {
    return fetch("http://localhost:8000/stickers", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("st_token")}`
        },
        body: JSON.stringify(sticker)
    })
        .then(response => response.json())
}

export const getStickers = () => {
    return fetch(`http://localhost:8000/stickers`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("st_token")}`
        }
    })
    .then(response => response.json())
}

export const getSingleSticker = (id) => {
    return fetch(`http://localhost:8000/stickers/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("st_token")}`
        }
    })
        .then(response => response.json())
}

export const getFinishTypes = () => {
    return fetch("http://localhost:8000/finishes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("st_token")}`
        }
    })
        .then(response => response.json())
}

export const getStickerSizes = () => {
    return fetch("http://localhost:8000/sizes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("st_token")}`
        }
    })
        .then(response => response.json())
}


export const updateSticker = (sticker,id) => {
    return fetch(`http://localhost:8000/stickers/${id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("st_token")}`
        },
        body: JSON.stringify(sticker)
    })
}

export const deleteSticker = (id) => {
    return fetch(`http://localhost:8000/stickers/${id}`, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("st_token")}`
        }
    })
}