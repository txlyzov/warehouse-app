import './Help.scss';
import React from 'react';
import HELP from './Help.dictionary';

function Help() {
  return (
    <div className="help wrapper">
      <div className='help_list'>
        {HELP.INSTRUCTIONS.map((instruction, index) =>
          <div key={HELP.INSTRUCTIONS} className={`help__block ${index % 2 ? 'right' : 'left'}-position`}>
            <h2 className="help__header">{instruction.title}</h2>
            <hr className="help__separator" />
            <div className='help__prompt-wrapper'>
              <h3 className="help__prompt">{instruction.text}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Help;
