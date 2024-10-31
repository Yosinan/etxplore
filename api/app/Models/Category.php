<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_name',
    ];

    // Relationship with CulturalArticle
    public function culturalArticles()
    {
        return $this->belongsToMany(CulturalArticle::class, 'cultural_article_category');
    }
}