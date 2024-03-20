import { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { FROM_NAME } from "./GraphQL/Queries";
import { useParams } from 'react-router-dom';

function Pokemon() {
  const { pokemonName } = useParams();
  const { loading, error, data } = useQuery(FROM_NAME, {
    variables: { name: pokemonName }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const pokemon = data.getPokemonByName;

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={`https://img.pokemondb.net/artwork/${pokemon.name.english.toLowerCase()}.jpg`}
          alt={`${pokemon.name.english} artwork`}
          style={{ width: '400px', height: 'auto' }}
        />
        <div style={{ marginLeft: '20px', textAlign: 'left' }}>
          <h1 style={{ marginBottom: '40px'}} >{pokemon.name.english}</h1>
          <p>Japanese Name: {pokemon.name.japanese}</p>
          <p>Chinese Name: {pokemon.name.chinese}</p>
          <p>French Name: {pokemon.name.french}</p>
        </div>
      </div>
      <div style={{ textAlign: 'left' }}>
        <h1>Type</h1>
        <ul style={{ paddingLeft: '20px', margin: '20px' }}>
          {pokemon.type.map((type, index) => (
            <li key={index} style={{ marginLeft: '20px' }}>{type}</li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: 'left'}}>
        <h1>Base Stats</h1>
        <ul style={{ paddingLeft: '20px', margin: '20px' }}>
          <li style={{ marginLeft: '20px' }}>HP: {pokemon.base.HP}</li>
          <li style={{ marginLeft: '20px' }}>Attack: {pokemon.base.Attack}</li>
          <li style={{ marginLeft: '20px' }}>Defense: {pokemon.base.Defense}</li>
          <li style={{ marginLeft: '20px' }}>Special Attack: {pokemon.base.SpAttack}</li>
          <li style={{ marginLeft: '20px' }}>Special Defense: {pokemon.base.SpDefense}</li>
          <li style={{ marginLeft: '20px' }}>Speed: {pokemon.base.Speed}</li>
        </ul>
      </div>
    </div>
  );
}

export default Pokemon;
