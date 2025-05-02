<?php

use App\Http\Controllers\CareerJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('jobs' , [CareerJobController::class , 'index']);
Route::post('jobs' , [CareerJobController::class , 'store']);
Route::get('filters' , [CareerJobController::class , 'filter']);
Route::get('searchjobs' , [CareerJobController::class , 'search']);
