<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    use HasFactory;
    protected $fillable = ['travel_information_id', 'hotel_name', 'link_to_booking_site'];

    public function travelInformation()
    {
        return $this->belongsTo(TravelInformation::class);
    }
}
