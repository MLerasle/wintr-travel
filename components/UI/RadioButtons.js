import { useState } from 'react';

const RadioButtons = (props) => {
  const [selected, setSelected] = useState(props.selected);

  const updateSelectButton = (item) => {
    setSelected(item);
    props.onButtonSelect(item);
  };

  return (
    <div className="w-full h-12 text-gray-800 bg-white rounded-lg flex cursor-pointer appearance-none">
      {props.items.map((item, index) => (
        <button
          key={item}
          className={`w-1/4 flex justify-center items-center border border-gray-300 hover:bg-blue-100 focus:outline-none ${
            index < props.items.length - 1 ? 'border-r-0' : 'rounded-r-lg'
          } ${index === 0 && 'rounded-l-lg'} ${
            selected === item &&
            'bg-secondary-blue hover:bg-secondary-blue border-secondary-blue text-white'
          }`}
          onClick={() => updateSelectButton(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default RadioButtons;
