<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TravelInformation extends Model
{
    use HasFactory;

    // Specify the table name
    protected $table = 'travel_informations'; // Replace 'your_table_name' with the actual name of your table

    protected $fillable = ['cultural_article_id', 'travel_tips'];

    public function culturalArticle()
    {
        return $this->belongsTo(CulturalArticle::class);
    }

    public function localTransport()
    {
        return $this->hasMany(LocalTransport::class);
    }

    public function accommodations()
    {
        return $this->hasMany(Accommodation::class);
    }
}