<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CulturalArticleTag extends Model
{
    use HasFactory;

    protected $table = 'cultural_article_tag';

    protected $fillable = [
        'cultural_article_id',
        'tag_id',
    ];

    public function culturalArticle()
    {
        return $this->belongsTo(CulturalArticle::class, 'cultural_article_id');
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class, 'tag_id');
    }
}

