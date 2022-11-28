import React from 'react';

const Rules = () => {
  return (
    <div className="max-w-2xl">
      <h3 className="text-4xl font-bold my-4">Side Stack Game</h3>
      <p>To win you should complete four consecutive circles of the same color</p>
      <h3 className="text-xl font-bold my-2">Rules</h3>
      <ol>
        <li>You can only fill circles at one of the side edges of any row</li>
        <li>When the edge is already taken, the nearest horizontal circle will be filled</li>
        <li>The turns are alternated each time a player plays</li>
        <li>First player to stack 4 (this can be changed), circles of the same color wins</li>
        <li>It's possible to win by stacking consecutives circles vertically, horizontally, and diagonally</li>
      </ol>
      <h3 className="text-xl font-bold my-2">How to play</h3>
      <p>You must click either right or left side of a row to stack a circle, clicks on the middle circle are not evaluated until one of the sides are filled</p>
    </div>
  );
};

export default Rules;