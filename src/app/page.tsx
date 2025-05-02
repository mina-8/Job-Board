import JobBoard from "@/components/JobBoard/JobBoard";
import JobsCards from "@/components/JobsComponent/JobsCards";
import { Jobs } from "@/types/Jobs";


export default async function Home() {


  try {
    const response = await fetch('http://127.0.0.1:8000/api/jobs', {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jobs: Jobs[] = await response.json();

    return (
      <div>
        <JobBoard />
        <div
        className="my-5"
        >

          <JobsCards jobs={jobs} />
        </div>
      </div>
    );
  } catch (error) {
    

    return (
      <div>
        <JobBoard />
        <div
        className="my-5"
        >

          
        </div>
      </div>
    );
  }


}
