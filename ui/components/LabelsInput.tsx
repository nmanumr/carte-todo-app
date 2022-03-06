import useSWR from 'swr';
import c from 'classnames';
import { Combobox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import React, { KeyboardEventHandler, useEffect, useState } from 'react';
import useListState from '../hooks/use_list_state';

interface Props {
  onChange: (labels: string[]) => any;
  labels: string[];
}

const CustomInput = React.forwardRef<HTMLInputElement, any>(({ onKeyDown, onEnter, ...props }, ref) => {
  const keyDownHandler = (e: any) => {
    if (onEnter && e.key === 'Enter') {
      onEnter(e);
    }
    onKeyDown(e);
  };
  return <input {...props} ref={ref} onKeyDown={keyDownHandler} autoComplete="off" />;
});

export default function LabelsInput({ labels = [], onChange }: Props) {
  const [query, setQuery] = useState('');
  const [selectedLabels, handler] = useListState<string>([], true);
  const { data: userLabels = [] } = useSWR('/api/todo/labels');

  useEffect(() => {
    onChange(selectedLabels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLabels]);

  useEffect(() => {
    if (JSON.stringify(labels) === JSON.stringify(selectedLabels)) {
      return;
    }

    handler.append(...labels.map((l) => l.trim()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels]);

  const onComboOptionSelect = (value: string) => {
    if (!value) return;

    handler.append(value);
    setQuery('');
  };

  const onEnter: KeyboardEventHandler<HTMLInputElement> = () => {
    setTimeout(() => {
      setQuery((val) => {
        if (!val) return val;
        handler.append(val.trim());
        return '';
      });
    }, 100);
  };

  let filteredLabels = query === ''
    ? userLabels
    : userLabels.filter((l: string) => l.toLowerCase().includes(query.toLowerCase()));

  filteredLabels = filteredLabels.filter((e: string) => !selectedLabels.includes(e));

  return (
    <Combobox as="div" value={query} onChange={onComboOptionSelect}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">Labels</Combobox.Label>
      <div className="relative mt-1">
        <div
          className="flex flex-wrap items-center border border-gray-300 rounded-md focus-within:border-green-700 focus-within:ring-1 focus-within:ring-green-700"
        >
          {selectedLabels.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => handler.remove(i)}
              className="px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-200 text-gray-800 m-1 hover:bg-red-400"
            >
              {label}
            </button>
          ))}

          <div className="flex items-center min-w-[100px] grow">
            <Combobox.Input
              as={CustomInput}
              onEnter={onEnter}
              placeholder="Enter a label and press enter"
              className="appearance-none shadow-sm border-none rounded-md block w-full px-3 py-2 placeholder-gray-400 sm:text-sm focus:z-10 focus:outline-none focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button
              className="flex items-center rounded-r-md px-2 focus:outline-none"
            >
              <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
        </div>

        {filteredLabels.length > 0 && (
          <Combobox.Options
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {filteredLabels.map((label: string) => (
              <Combobox.Option
                key={label}
                value={label}
                className={({ active }) => c(
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                  active ? 'bg-green-100 text-green-800' : 'text-gray-900',
                )}
              >
                <span className="block truncate">{label}</span>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
