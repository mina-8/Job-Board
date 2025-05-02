<?php

namespace App\Http\Controllers;

use App\Models\CareerJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CareerJobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Jobs = CareerJob::orderByDesc('created_at')->get();
        return response()->json($Jobs, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'salary' => 'required|integer|min:0',
            'type' => 'required|in:full-time,part-time,temporary',
        ];
        $validation = Validator::make($request->all(), $rules);
        if ($validation->fails()) {
            return response()->json(
                [
                    'success' => false,
                    'message' => $validation->errors()
                ],
                400
            );
        }

        try {
            CareerJob::create($validation->validated());
            return response()->json(
                [
                    'success' => true,
                    'message' => 'create success'
                ],
                201
            );
        } catch (\Exception $error) {
            return response()->json([
                'success' => false,
                'message' => $error->getMessage()
            ], 500);
        }
    }

    /**
     * search jobs by loaction , types , salary_range
     */

    public function search(Request $request)
    {
        $rules = [
            'job' => 'required|string',
            'location' => 'nullable|string',
        ];

        $validation = Validator::make($request->all(), $rules);

        if ($validation->fails()) {
            return response()->json(
                [
                    'success' => false,
                    'message' => $validation->errors()
                ],
                400
            );
        }
        try {

            $query = CareerJob::query();

            if($request->has('job') && !empty($request->query('job'))){
                $query->where('title' , 'LIKE' , '%' . $request->query('job') . '%');
            }

            if($request->has('location') && !empty($request->query('location'))){
                $query->where('location' , 'LIKE' , '%' . $request->query('location') . '%');
            }

            $SearchJob = $query->get();
                return response()->json( $SearchJob ,200);

        } catch (\Exception $error) {
            return response()->json([
                'success' => false,
                'message' => $error->getMessage()
            ], 500);
        }
    }
    /**
     * filter jobs by loaction , types , salary_range
     */

    public function filter(Request $request)
    {
        $rules = [
            'locations' => 'nullable|array',
            'types' => 'nullable|array',
            'salary_ranges' => 'nullable|array'
        ];

        $validation = Validator::make($request->all(), $rules);

        if ($validation->fails()) {
            return response()->json(
                [
                    'success' => false,
                    'message' => $validation->errors()
                ],
                400
            );
        }

        $query = CareerJob::query();

        if ($request->has('locations') && !empty($request->input('locations'))) {
            $query->whereIn('location', $request->input('locations'));
        }

        if ($request->has('types') && !empty($request->input('types'))) {
            $query->whereIn('type', $request->input('types'));
        }

        if ($request->has('salary_ranges') && !empty($request->input('salary_ranges'))) {
            $query->where(function ($subquery) use ($request) {
                foreach ($request->input('salary_ranges') as $range) {
                    switch ($range) {
                        case '0-30k':
                            $subquery->orWhereBetween('salary', [0, 3000]);
                            break;
                        case '30-60k':
                            $subquery->orWhereBetween('salary', [3000, 6000]);
                            break;
                        case '60k+':
                            $subquery->orWhere('salary', '>=', 6000);
                            break;
                    }
                }
            });
        }

        $jobs = $query->get();

        if ($jobs->isEmpty()) {
            return response()->json([
                'success' => true,
                'message' => 'No jobs found matching the criteria',
                'data' => [],
            ], 200);
        }

        return response()->json([
            'success' => true,
            'message' => 'Jobs retrieved successfully',
            'data' => $jobs,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(CareerJob $careerJob)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CareerJob $careerJob)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CareerJob $careerJob)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CareerJob $careerJob)
    {
        //
    }
}
