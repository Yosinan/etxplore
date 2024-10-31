<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocalTransport extends Model
{
    use HasFactory;
    protected $fillable = ['travel_information_id', 'transport_type', 'details'];

    public function travelInformation()
    {
        return $this->belongsTo(TravelInformation::class);
    }
}
