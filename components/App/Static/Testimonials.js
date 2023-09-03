import Testimonial from '@/App/Static/Testimonial';

const Testimonials = () => (
  <section className="bg-gray-50">
    <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl py-10 sm:py-16">
      Demandez l'avis de nos clients.
    </h2>
    <div className="max-w-7xl mx-auto md:grid md:grid-cols-3 md:px-6 lg:px-8">
      <div className="pt-2 pb-10 px-4 sm:px-6 md:flex md:flex-col md:pt-8 md:pb-16 md:pl-0 md:pr-10 lg:pr-16">
        <Testimonial person="David M.">
          Un service qui tombe à pic en pleine pandémie de COVID-19. On a hâte
          d'y être!
        </Testimonial>
      </div>
      <div className="py-10 px-4 border-t md:flex md:flex-col border-gray-200 sm:px-6 md:pt-8 md:pb-16 md:pr-10 md:border-t-0 md:border-l lg:pl-16">
        <Testimonial person="Sandrine P." classes="py-6 sm:py-0">
          J'ai pu annuler ma réservation sans problème et ai reçu le
          remboursement dans la foulée. Merci beaucoup!
        </Testimonial>
      </div>
      <div className="py-10 px-4 border-t md:flex md:flex-col border-gray-200 sm:px-6 md:pt-8 md:pb-16 md:pr-0 md:pl-10 md:border-t-0 md:border-l lg:pl-16">
        <Testimonial person="Patrick S.">
          La réservation est vraiment simple à faire et le service client très
          réactif.
        </Testimonial>
      </div>
    </div>
  </section>
);

export default Testimonials;
