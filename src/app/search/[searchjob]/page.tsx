import JobsCards from '@/components/JobsComponent/JobsCards';
import SearchForm from '@/components/SearchJob/SearchForm';
import { Jobs, SearchJobs } from '@/types/Jobs'

const SearchJob = async ({ searchParams }: SearchJobs) => {
  const Domain = process.env.NEXT_BASE_URL
  try {
    const query = new URLSearchParams(await searchParams).toString();
    const response = await fetch(`${Domain}/api/searchjobs?${query}`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data: Jobs[] = await response.json();

    return (
      <div
      className='px-8 py-12'
      >
        <div
        className="bg-white  dark:bg-black w-full h-full"
        >
        <SearchForm />
        </div>
        <JobsCards jobs={data} />
        
      </div>
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch jobs: ${error.message}`);
    } else {
      throw new Error("Failed to fetch jobs: Unknown error");
    }
  }
  


}

export default SearchJob