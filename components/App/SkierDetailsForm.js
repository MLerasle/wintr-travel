import Label from '@/UI/Label';
import Input from '@/UI/Input';
import RadioButtons from '@/UI/RadioButtons';

const HEAD_SIZES = ['S', 'M', 'L', 'XL'];

const SkierDetailsForm = ({ skier, index, total, onUpdateSkier }) => (
  <article key={skier.label} className={`${index + 1 !== total && 'mb-6'}`}>
    <h4 className="font-semibold pb-2">{skier.label}</h4>
    <div className="flex flex-wrap items-center">
      <div className="flex flex-col w-1/2 pr-1 md:w-1/3 md:pr-2">
        <Label title="Taille" for={`size-${skier.label}`} />
        <Input
          type="number"
          id={`size-${skier.label}`}
          name={`size-${skier.label}`}
          placeholder="Taille en cm"
          onChange={(event) => onUpdateSkier(skier, 'size', event)}
          value={skier.size}
        />
      </div>
      <div className="flex flex-col w-1/2 pl-1 md:w-1/3 md:px-2">
        <Label title="Pointure" for={`shoe-size-${skier.label}`} />
        <Input
          type="number"
          id={`shoe-size-${skier.label}`}
          name={`shoe-size-${skier.label}`}
          placeholder="Pointure"
          onChange={(event) => onUpdateSkier(skier, 'shoeSize', event)}
          value={skier.shoeSize}
        />
      </div>
      <div className="flex flex-col w-full md:w-1/3 mt-2 md:mt-0 md:pl-2">
        <Label title="Taille du casque" for={`head-size-${skier.label}`} />
        <RadioButtons
          items={HEAD_SIZES}
          selected={skier.headSize}
          onButtonSelect={(event) => onUpdateSkier(skier, 'headSize', event)}
        />
      </div>
    </div>
  </article>
);

export default SkierDetailsForm;
