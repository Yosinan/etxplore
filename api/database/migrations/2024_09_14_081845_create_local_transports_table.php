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
        Schema::create('local_transports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('travel_information_id')->constrained('travel_informations')->cascadeOnDelete();
            $table->string('transport_type', 255);
            $table->text('details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('local_transports');
    }
};
