class Service {
    constructor() {
        this.urlApi = 'https://pokeapi.co/api/v2/';
    }

    getPokemon(identifier) {
        // try {
        //     return fetch(`${this.urlApi}pokemon/${identifier}`).then(getPokemonSuccess => {
        //         return getPokemonSuccess.json();
        //     });
        // } catch (e) {
        //     console.log(e);
        // }

         
        return fetch(`${this.urlApi}pokemon/${identifier}`)
            .then(getPokemonSuccess => {
                return getPokemonSuccess.json();
            }).catch( e => {
                console.log(e);
        });
         
    }

    getEvolutions(identifier) {

         
        return fetch(`${this.urlApi}evolution-chain/${identifier}`)
            .then(getPokemonSuccess => {
                return getPokemonSuccess.json();
            }).catch( e => {
                console.log(e);
        });
         
    }
}