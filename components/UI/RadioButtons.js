import { getDayNumber } from 'helpers/dates';

const RadioButtons = (props) => {
  return (
    <div
      className={`w-full text-gray-800 bg-white rounded-lg flex cursor-pointer appearance-none ${
        !props.withDateFormatting && 'h-12'
      }`}
    >
      {props.items.map((item, index) => (
        <label
          key={item}
          className={`flex-grow flex justify-center items-center border border-gray-300 hover:bg-blue-100 focus:outline-none ${
            index < props.items.length - 1 ? 'border-r-0' : 'rounded-r-lg'
          } ${index === 0 && 'rounded-l-lg'} ${
            item === props.selected &&
            'bg-blue-200 hover:bg-blue-200 border-blue-200'
          }`}
        >
          <input
            type="radio"
            name={props.name}
            value={item}
            onChange={props.onChange}
            className="absolute invisible"
          />
          {props.withDateFormatting ? (
            <div className="w-full text-center">
              <header className="text-gray-600">Samedi</header>
              <main>
                <section className="text-2xl font-bold">
                  {getDayNumber(item)}
                </section>
              </main>
            </div>
          ) : (
            item
          )}
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
