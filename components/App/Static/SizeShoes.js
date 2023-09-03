const SizeShoes = (props) => (
  <>
    {props.withDetails && <h2>Taille des chaussures</h2>}
    <p>
      La pointure des chaussures de skis se mesure en Mondopoint, ce qui
      correspond à la <strong>taille de votre pied en centimètres</strong>.
    </p>
    <p>
      Pour connaitre celle-ci,{' '}
      <strong>
        placez une feuille au sol contre un mur et posez votre pied dessus en
        collant votre talon au mur
      </strong>
      .
    </p>
    <p>
      Tracez un trait devant le plus long doigt de pied,{' '}
      <strong>mesurez et ajoutez un centimètre</strong>.
    </p>
  </>
);

export default SizeShoes;
