<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CulturalArticle extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'history', 'traditions', 'language', 'practices', 'media','region_id'];

    protected $casts = [
        'media' => 'array',
    ];

    public function region()
    {
        return $this->belongsTo(Region::class);
    }

    public function travelInformation()
    {
        return $this->hasMany(TravelInformation::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'cultural_article_category');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'cultural_article_tag');
    }
    
    // Polymorphic Relationship
    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    
}
