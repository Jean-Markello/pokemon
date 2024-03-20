import {gql} from '@apollo/client'

export const GET_POKEMON = gql `
    query {
        getAllPokemon {
            id
            name {
                english
                japanese
                chinese
                french
            }
            type
            base {
                HP
                Attack
                Defense
                SpAttack
                SpDefense
                Speed
            }
        }
    }
`;

export const GET_TYPE = gql `
    {
        types
    }
`;

export const FROM_NAME = gql`
    query GetPokemonByName($name: String!) {
        getPokemonByName(name: $name) {
        id
        name {
            english
            japanese
            chinese
            french
        }
        type
        base {
            HP
            Attack
            Defense
            SpAttack
            SpDefense
            Speed
        }
        }
    }
`;