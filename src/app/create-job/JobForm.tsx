'use client';

import Editor from '@/components/RichText/Editor';
import Spinner from '@/components/Spinner/Spinner';
import { CreateJob } from '@/utils/ValidationSchema';
import { useState } from 'react';

const JobForm = () => {
    const Domain = process.env.NEXT_BASE_URL;
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setValidationErrors({});

        const validation = CreateJob.safeParse({
            title,
            location,
            description,
            salary: salary ? parseInt(salary) : undefined,
            type,
        });

        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            setValidationErrors(
                Object.fromEntries(
                    Object.entries(errors).map(([key, value]) => [key, value?.[0] || 'Invalid input'])
                )
            );
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${Domain}/api/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                body: JSON.stringify({
                    title,
                    location,
                    description,
                    salary: parseInt(salary),
                    type,
                }),
            });

            if (!response.ok) {                
                alert('Validation failed');                
            }

            // Reset form on success
            setTitle('');
            setLocation('');
            setDescription('');
            setSalary('');
            setType('');
            alert('Job created successfully!'); // Replace with a toast or better UX

        }  catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(`Failed to fetch jobs: ${error.message}`);
            } else {
              throw new Error("Failed to fetch jobs: Unknown error");
            }
          } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-3 mt-5 bg-white p-2 dark:bg-gray-800"
            >
                {error && (
                    <div className="text-red-500 p-2 bg-red-100 rounded-md">{error}</div>
                )}

                <div className="flex flex-col">
                    <label className="p-1 font-bold" htmlFor="title">
                        Job Title
                    </label>
                    <input
                        disabled={loading}
                        id="title"
                        type="text"
                        placeholder="Title of job"
                        className="rounded-md border p-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {validationErrors.title && (
                        <span className="text-red-500 text-sm">{validationErrors.title}</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="p-1 font-bold" htmlFor="location">
                        Location
                    </label>
                    <input
                        disabled={loading}
                        id="location"
                        type="text"
                        placeholder="Location of job"
                        className="rounded-md border p-2"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    {validationErrors.location && (
                        <span className="text-red-500 text-sm">{validationErrors.location}</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="p-1 font-bold" htmlFor="description">
                        Job Description
                    </label>
                    <Editor value={description} onChange={setDescription}  />
                    {validationErrors.description && (
                        <span className="text-red-500 text-sm">{validationErrors.description}</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="p-1 font-bold" htmlFor="salary">
                        Salary
                    </label>
                    <div className="flex items-center">
                        <input
                            disabled={loading}
                            id="salary"
                            type="number"
                            placeholder="Salary of job"
                            className="rounded-l-md border p-2"
                            value={salary}
                            min="0"
                            onChange={(e) => setSalary(e.target.value)}
                        />
                        <div className="p-2 border border-gray-300 bg-gray-300 text-gray-600 rounded-r-md">
                            USD
                        </div>
                    </div>
                    {validationErrors.salary && (
                        <span className="text-red-500 text-sm">{validationErrors.salary}</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="p-1 font-bold" htmlFor="type">
                        Type
                    </label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        disabled={loading}
                        className="lg:w-1/6 border rounded p-1"
                    >
                        <option value="">Select type of job</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="temporary">Temporary</option>
                    </select>
                    {validationErrors.type && (
                        <span className="text-red-500 text-sm">{validationErrors.type}</span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex justify-center items-center bg-green-500 hover:bg-green-400 mt-4 text-white cursor-pointer rounded-md p-2 text-xl disabled:bg-gray-300 lg:w-1/12"
                >
                    {loading ? <Spinner /> : 'Add Job'}
                </button>
            </form>
        </div>
    );
};

export default JobForm;