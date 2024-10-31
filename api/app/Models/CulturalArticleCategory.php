<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CulturalArticleCategory extends Model
{
    use HasFactory;

    protected $table = 'cultural_article_category';

    protected $fillable = [
        'cultural_article_id',
        'category_id',
    ];

    public function culturalArticle()
    {
        return $this->belongsTo(CulturalArticle::class, 'cultural_article_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    
}
