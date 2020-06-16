import { db } from '../back-end/firebase'

export const saveFriend = (nome, telefone, endereco, localizacao) => {
    const newFriend = {
        nome,
        telefone,
        endereco,
        localizacao
    }
    return new Promise((resolve, reject) => {
        if(!localizacao) return reject()
        db.collection("friends")
            .add(newFriend)
            .then(result => {
                resolve(result.id)
            })
            .catch(erro => {
                console.log('erro', erro)
                reject(erro)
            })
    })
}

export const getFriends = () => {
    return new Promise((resolve, reject) => {
        db.collection("friends")
            .get()
            .then(snapchot => {
                let friendsLista = []
                snapchot.forEach((item) => {
                    friendsLista.push(item.data())
                })
                resolve(friendsLista) 
            })
            .catch(erro => reject(erro))
    })
}