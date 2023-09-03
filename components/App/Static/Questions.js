import Question from '@/App/Static/Question';

import { faqs } from 'data/faqs';

const Questions = () => (
  <div className="max-w-7xl mx-auto px-4 pb-16 sm:pb-24 sm:px-6 lg:px-8">
    <div className="lg:bg-gray-50 lg:pt-14 lg:pb-20 lg:shadow">
      <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
        <div className="space-y-6 divide-y divide-gray-200">
          {faqs.map((faq) => (
            <Question key={faq.question} query={faq.question}>
              {faq.answer.map((paragraph) => (
                <p key={paragraph} className="text-base text-gray-500 py-1">
                  {paragraph}
                </p>
              ))}
            </Question>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Questions;
