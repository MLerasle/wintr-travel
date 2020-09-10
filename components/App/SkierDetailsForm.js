import Input from '@/UI/Input';

const SkierDetailsForm = ({ skier, index, total, onUpdateSkier }) => (
  <article
    key={skier.label}
    className={`${index + 1 !== total && 'mb-4 md:mb-6'}`}
  >
    <h4 className="font-semibold pb-2">{skier.label}</h4>
    <div className="flex items-center">
      <Input
        type="number"
        id={`size-${skier.label}`}
        name={`size-${skier.label}`}
        placeholder="Taille en cm"
        className="w-full xs:w-1/2 max-w-xs"
        onChange={(event) => onUpdateSkier(skier, 'size', event)}
        value={skier.size}
      />
      <Input
        type="number"
        id={`shoe-size-${skier.label}`}
        name={`shoe-size-${skier.label}`}
        placeholder="Pointure"
        className="w-full xs:w-1/2 ml-1 xs:ml-4 max-w-xs"
        onChange={(event) => onUpdateSkier(skier, 'shoeSize', event)}
        value={skier.shoeSize}
      />
    </div>
  </article>
);

export default SkierDetailsForm;
