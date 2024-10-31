<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'media',
        'location',
        'date',
    ];

    public function getFormattedDate()
    {
        return Carbon::parse($this->date)->format('m-d'); // Returns 'MM-DD'
    }
}
