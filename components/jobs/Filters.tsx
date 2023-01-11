import { DEFAULT_JOB_TITLE } from '@/pages';
import Select, { SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export type JobOptionType = { value: string; label: string };

const jobTitleOptions: JobOptionType[] = [
  { value: 'Business Analyst', label: 'Business Analyst' },
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Data Scientist', label: 'Data Scientist' }
];

export function Filters({ lastSevenDays, allCompanies, onChangeJobTitle, onChangeSearchTerm, onToggleLastSevenDays, onChangeCompany }: 
    { allCompanies: string[], lastSevenDays: boolean; onChangeJobTitle: (value: string) => void; onChangeSearchTerm: (value: string) => void, onToggleLastSevenDays: () => void; onChangeCompany: (value: string) => void }
) {
  const companyOptions = allCompanies.map(company => ({ value: company, label: company })) as JobOptionType[];

  return (
    <div className="w-full flex items-center justify-center gap-3 flex-wrap">
      {/* Potential optimization: Avoid re-render everytime the value changes using debouce */}
      <input onChange={e => onChangeSearchTerm(e.target.value) } type="text" className="w-1/3 h-[38px] min-w-[270px] px-4 border border-gray-light rounded-md focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent" placeholder="Search" />
      <div className="flex-shrink-0">
        <Select
          id="selectJobTitle"
          instanceId="selectJobTitle"
          components={animatedComponents}
          defaultValue={jobTitleOptions.find(option => option.value === DEFAULT_JOB_TITLE)}
          options={jobTitleOptions}
          isMulti={false}
          onChange={(option: SingleValue<JobOptionType>) => option && onChangeJobTitle(option.value)}
        />
      </div>
      <div className="min-w-[300px] flex-shrink-0">
        <Select
          id="selectCompany"
          instanceId="selectCompany"
          components={animatedComponents}
          options={companyOptions}
          isMulti={false}
          isClearable={true}
          isSearchable={true}
          onChange={(option) => onChangeCompany((option as JobOptionType)?.value ?? '')}
        />
      </div>
      <button onClick={() => onToggleLastSevenDays()} className={`h-[38px] px-4 py-2 rounded-md flex-shrink-0 ${lastSevenDays ? 'bg-blue text-white' : 'bg-gray-light'}`}>Last 7 days</button>
    </div>
  );
}