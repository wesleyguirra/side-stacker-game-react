import React from 'react';

const Rules = () => {
  return (
    <div className="max-w-2xl">
      <h3 className="text-4xl font-bold my-4">Side Stack Game</h3>
      <div className="sm:flex sm:items-start">
        <div
          className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"/>
          </svg>
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Rules</h3>
          <div className="mt-2">
            <ol>
              <li>To win you should complete four consecutive circles of the same color</li>
              <li>You can only fill circles at one of the side edges of any row</li>
              <li>When the edge is already taken, the nearest horizontal circle will be filled</li>
              <li>The turns are alternated each time a player plays</li>
              <li>First player to stack 4 (this can be changed), circles of the same color wins</li>
              <li>It's possible to win by stacking consecutives circles vertically, horizontally, and diagonally</li>
            </ol>
          </div>
          <h3 className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">How to play</h3>
          <div className="mt-2">
            <p>You must click either right or left side of a row to stack a circle, clicks on the middle circle are not evaluated until one of the sides are filled</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;