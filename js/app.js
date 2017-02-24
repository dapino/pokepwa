class Pokemon {
    constructor() {
        this.service = new Service();


        this.input_text = document.querySelector('#filter-text')
        this.search_btn = document.querySelector('#search-btn')
        
        this.poke_name = document.querySelector('.poke-name');
        this.poke_pic = document.querySelector('.poke-pic');
 
        this.poke_abilities = document.querySelector('.poke-abilities-container');
        

        //Evenet Handlers
        this.search_btn.addEventListener('click', event => {
            let poke_answer = this.getPokemon(this.input_text.value);
        });

    }//getEvolutions

    getPokemon(identifier) {
         this.service.getPokemon(identifier).then(response => {
             console.log(response);
            this.poke_name.innerHTML = response.name;
            this.poke_pic.src = response.sprites.front_shiny;
            this.renderAbilities(response.abilities);

            this.service.getEvolutions(identifier).then(response => {
                console.log(response);
                
            }).catch( e => {
             console.log(e);
            });

         }).catch( e => {
             console.log(e);
         });
    }

    renderAbilities(abilitiesArr) {
        this.poke_abilities.innerHTML = '';
        abilitiesArr.map((theAbility, index) => {
            let newAbility = document.createElement('div');
            newAbility.innerHTML = `<span>${index}:</span><b>${theAbility.ability.name}</b>`;
            this.poke_abilities.appendChild(newAbility);

            // let newAbility = document.createElement('div');
            // newAbility.innerHTML = `<span>${index}:</span><b>${theAbility.ability.name}</b>`;
            
            // let newAbility = `<div><span>${index}:</span><b>${theAbility.ability.name}</b><div>`;
            // this.poke_abilities.innerHTML += (newAbility);
            
            // let newAbilities = document.createElement('div');
            // newAbilities.innerHTML = `${abilitiesArr.map((theAbility, index) => `<span>${index}:</span><b>${theAbility.ability.name}</b>`).join(' ')}`;
            // this.poke_abilities.appendChild(newAbilities);

        })
    }
}

let objectPokemon = new Pokemon();