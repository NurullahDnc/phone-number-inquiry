import React, { useState } from 'react';
import Button from './Button';

const Faq = ({title, description}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div id="accordion-open" data-accordion="open">
        <h2 className='md:px-2' id="accordion-open-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full py-2 md:py-5 px-1 font-medium rtl:text-right text-gray-600 border border-b-0 border-gray-200 rounded-t-xl dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            data-accordion-target="#accordion-open-body-1"
            aria-expanded="true"
            aria-controls="accordion-open-body-1"
            onClick={toggleDropdown}
          >
            <span className="flex md:text-[17px] ">
              <svg
                className="w-5 h-5 me-2 text-2xl shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>{' '}
              {title}?
            </span>
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                 d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>  
        <div
          id="accordion-open-body-1"
          className={`${
            isOpen ? 'block' : 'hidden'
          } p-2 md:p-4  border-gray-200 dark:border-gray-700 dark:bg-gray-900`}
          aria-labelledby="accordion-open-heading-1"
        >
          <div className="mb-2 text-[16px] md:text-md indent-3 text-gray-500 dark:text-gray-400">
           {description}
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default Faq;
