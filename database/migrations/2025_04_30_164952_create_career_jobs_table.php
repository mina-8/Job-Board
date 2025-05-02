<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('career_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('title of job');
            $table->text('description')->comment('description of job');
            $table->string('location')->comment('location lie egypt');
            $table->integer('salary')->comment('salary of this job');
            $table->enum('type' , ['full-time' , 'part-time' , 'temporary'])->comment('type of jobs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('career_jobs');
    }
};
