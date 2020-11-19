const SizeShoes = (props) => (
  <>
    {props.withDetails && (
      <h2 className="text-2xl font-bold text-gray-800 pb-4 pt-8">
        2. Chaussures
      </h2>
    )}
    <p className="text-gray-600 py-1 leading-loose">
      La pointure des chaussures de skis se mesure en Mondopoint, ce qui
      correspond à la{' '}
      <span className="font-bold text-primary-blue">
        taille de votre pied en centimètres
      </span>
      .
    </p>
    <p className="text-gray-600 py-1 leading-loose">
      Pour connaitre celle-ci,{' '}
      <span className="font-bold text-primary-blue">
        placez une feuille au sol contre un mur et posez votre pied dessus en
        collant votre talon au mur
      </span>
      .
    </p>
    <p className="text-gray-600 py-1 leading-loose">
      Tracez un trait devant le plus long doigt de pied,{' '}
      <span className="font-bold text-primary-blue">
        mesurez et ajoutez un centimètre
      </span>
      .
    </p>
  </>
);

export default SizeShoes;
